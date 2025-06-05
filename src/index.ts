import express from "express";
import { CustomerController } from "./interface/controller/CustomerController";
import { CreateCustomerUseCase } from "./application/usecase/CreateCustomerUseCase";
import { GetCustomerUseCase } from "./application/usecase/GetCustomerUseCase";
import { ListCustomersUseCase } from "./application/usecase/ListCustomersUseCase";
import { UpdateCustomerUseCase } from "./application/usecase/UpdateCustomerUseCase";
import { DeleteCustomerUseCase } from "./application/usecase/DeleteCustomerUseCase";
import { InMemoryCustomerRepository } from "./infrastructure/repository/InMemoryCustomerRepository";

// リポジトリの作成
const customerRepository = new InMemoryCustomerRepository();

// ユースケースの作成
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const getCustomerUseCase = new GetCustomerUseCase(customerRepository);
const listCustomersUseCase = new ListCustomersUseCase(customerRepository);
const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);

// コントローラーの作成
const customerController = new CustomerController(
  createCustomerUseCase,
  getCustomerUseCase,
  listCustomersUseCase,
  updateCustomerUseCase,
  deleteCustomerUseCase
);

// Expressアプリケーションの作成
const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORSの設定
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.options("*", (_req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.status(200).end();
});

// ルーティングの設定
app.post("/customers", (req, res) =>
  customerController.createCustomer(req, res)
);
app.get("/customers/:id", (req, res) =>
  customerController.getCustomer(req, res)
);
app.get("/customers", (req, res) => customerController.listCustomers(req, res));
app.put("/customers/:id", (req, res) =>
  customerController.updateCustomer(req, res)
);
app.delete("/customers/:id", (req, res) =>
  customerController.deleteCustomer(req, res)
);

// サーバーの起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});

// テスト用のサンプルデータを追加
async function seedSampleData() {
  try {
    await createCustomerUseCase.execute({
      id: "CUS-001",
      lastName: "山田",
      firstName: "太郎",
      email: "yamada@example.com",
      phone: "090-1234-5678",
      prefecture: "東京都",
      city: "新宿区",
      street: "新宿1-1-1",
      postalCode: "160-0022",
    });

    await createCustomerUseCase.execute({
      id: "CUS-002",
      lastName: "佐藤",
      firstName: "花子",
      email: "sato@example.com",
      phone: "080-8765-4321",
      prefecture: "大阪府",
      city: "大阪市",
      street: "梅田2-2-2",
      postalCode: "530-0001",
    });

    console.log("サンプルデータを追加しました");
  } catch (error) {
    console.error("サンプルデータの追加に失敗しました:", error);
  }
}

// サンプルデータの追加
seedSampleData();

export default app;
