import { Customer } from "../../../domain/model/Customer";
import { CustomerAddress } from "../../../domain/model/CustomerAddress";
import { CustomerContact } from "../../../domain/model/CustomerContact";
import { CustomerId } from "../../../domain/model/CustomerId";
import { CustomerName } from "../../../domain/model/CustomerName";
import { InMemoryCustomerRepository } from "../InMemoryCustomerRepository";

describe("InMemoryCustomerRepository", () => {
  let repository: InMemoryCustomerRepository;
  let customer: Customer;

  beforeEach(async () => {
    // リポジトリの初期化
    repository = new InMemoryCustomerRepository();
    await repository.clear();

    // テスト用の顧客データ
    const id = new CustomerId("CUS-001");
    const name = new CustomerName("山田", "太郎");
    const contact = new CustomerContact("yamada@example.com", "090-1234-5678");
    const address = new CustomerAddress(
      "東京都",
      "新宿区",
      "新宿1-1-1",
      "160-0022"
    );
    customer = new Customer(id, name, contact, address);
  });

  it("顧客を保存して取得できること", async () => {
    // Arrange & Act
    await repository.save(customer);
    const result = await repository.findById(customer.id);

    // Assert
    expect(result).not.toBeNull();
    expect(result?.id.value).toBe(customer.id.value);
    expect(result?.name.fullName).toBe(customer.name.fullName);
  });

  it("存在しない顧客IDの場合はnullが返されること", async () => {
    // Arrange
    const nonExistentId = new CustomerId("CUS-999");

    // Act
    const result = await repository.findById(nonExistentId);

    // Assert
    expect(result).toBeNull();
  });

  it("すべての顧客を取得できること", async () => {
    // Arrange
    await repository.save(customer);

    const customer2 = new Customer(
      new CustomerId("CUS-002"),
      new CustomerName("佐藤", "花子"),
      new CustomerContact("sato@example.com", "080-8765-4321"),
      new CustomerAddress("大阪府", "大阪市", "梅田2-2-2", "530-0001")
    );
    await repository.save(customer2);

    // Act
    const results = await repository.findAll();

    // Assert
    expect(results.length).toBe(2);
    expect(results[0].id.value).toBe("CUS-001");
    expect(results[1].id.value).toBe("CUS-002");
  });

  it("顧客名で検索できること", async () => {
    // Arrange
    await repository.save(customer);

    const customer2 = new Customer(
      new CustomerId("CUS-002"),
      new CustomerName("佐藤", "花子"),
      new CustomerContact("sato@example.com", "080-8765-4321"),
      new CustomerAddress("大阪府", "大阪市", "梅田2-2-2", "530-0001")
    );
    await repository.save(customer2);

    // Act
    const results1 = await repository.findByName("山田");
    const results2 = await repository.findByName("佐藤");
    const results3 = await repository.findByName("鈴木");

    // Assert
    expect(results1.length).toBe(1);
    expect(results1[0].id.value).toBe("CUS-001");

    expect(results2.length).toBe(1);
    expect(results2[0].id.value).toBe("CUS-002");

    expect(results3.length).toBe(0);
  });

  it("顧客を削除できること", async () => {
    // Arrange
    await repository.save(customer);

    // Act
    const deleteResult = await repository.delete(customer.id);
    const findResult = await repository.findById(customer.id);

    // Assert
    expect(deleteResult).toBe(true);
    expect(findResult).toBeNull();
  });

  it("存在しない顧客を削除しようとするとfalseが返されること", async () => {
    // Arrange
    const nonExistentId = new CustomerId("CUS-999");

    // Act
    const result = await repository.delete(nonExistentId);

    // Assert
    expect(result).toBe(false);
  });

  it("アクティブな顧客のみを取得できること", async () => {
    // Arrange
    await repository.save(customer);

    const customer2 = new Customer(
      new CustomerId("CUS-002"),
      new CustomerName("佐藤", "花子"),
      new CustomerContact("sato@example.com", "080-8765-4321"),
      new CustomerAddress("大阪府", "大阪市", "梅田2-2-2", "530-0001")
    );
    customer2.deactivate();
    await repository.save(customer2);

    // Act
    const activeResults = await repository.findActiveCustomers();
    const inactiveResults = await repository.findInactiveCustomers();

    // Assert
    expect(activeResults.length).toBe(1);
    expect(activeResults[0].id.value).toBe("CUS-001");

    expect(inactiveResults.length).toBe(1);
    expect(inactiveResults[0].id.value).toBe("CUS-002");
  });
});
