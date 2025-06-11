import { ExportCustomersCsvUseCase } from "../ExportCustomersCsvUseCase";
import { InMemoryCustomerRepository } from "../../../infrastructure/repository/InMemoryCustomerRepository";
import { Customer } from "../../../domain/model/Customer";
import { CustomerId } from "../../../domain/model/CustomerId";
import { CustomerName } from "../../../domain/model/CustomerName";
import { CustomerContact } from "../../../domain/model/CustomerContact";
import { CustomerAddress } from "../../../domain/model/CustomerAddress";

describe("ExportCustomersCsvUseCase", () => {
  let repository: InMemoryCustomerRepository;
  let useCase: ExportCustomersCsvUseCase;

  beforeEach(async () => {
    repository = new InMemoryCustomerRepository();
    await repository.clear();
    useCase = new ExportCustomersCsvUseCase(repository);

    const customer1 = new Customer(
      new CustomerId("CUS-001"),
      new CustomerName("山田", "太郎"),
      new CustomerContact("yamada@example.com", "090-1234-5678"),
      new CustomerAddress("東京都", "新宿区", "新宿1-1-1", "160-0022")
    );
    const customer2 = new Customer(
      new CustomerId("CUS-002"),
      new CustomerName("佐藤", "花子"),
      new CustomerContact("sato@example.com", "080-8765-4321"),
      new CustomerAddress("大阪府", "大阪市", "梅田2-2-2", "530-0001")
    );
    customer2.deactivate();

    await repository.save(customer1);
    await repository.save(customer2);
  });

  it("全ての顧客をCSV形式で出力できること", async () => {
    const csv = await useCase.execute();
    const lines = csv.trim().split("\n");
    expect(lines.length).toBe(3); // header + 2 customers
    expect(lines[0]).toBe("id,fullName,email,phone,status");
  });

  it("activeOnlyをtrueにするとアクティブな顧客のみをCSV出力する", async () => {
    const csv = await useCase.execute(true);
    const lines = csv.trim().split("\n");
    expect(lines.length).toBe(2); // header + 1 active customer
    expect(lines[1]).toContain("CUS-001");
    expect(lines[1]).not.toContain("CUS-002");
  });
});
