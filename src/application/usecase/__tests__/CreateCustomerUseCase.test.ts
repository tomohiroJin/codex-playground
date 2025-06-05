import { CreateCustomerUseCase } from "../CreateCustomerUseCase";
import { InMemoryCustomerRepository } from "../../../infrastructure/repository/InMemoryCustomerRepository";
import { CustomerId } from "../../../domain/model/CustomerId";

describe("CreateCustomerUseCase", () => {
  let useCase: CreateCustomerUseCase;
  let repository: InMemoryCustomerRepository;

  beforeEach(async () => {
    repository = new InMemoryCustomerRepository();
    await repository.clear();
    useCase = new CreateCustomerUseCase(repository);
  });

  it("有効な入力で顧客を作成できること", async () => {
    // Arrange
    const input = {
      id: "CUS-001",
      lastName: "山田",
      firstName: "太郎",
      email: "yamada@example.com",
      phone: "090-1234-5678",
      prefecture: "東京都",
      city: "新宿区",
      street: "新宿1-1-1",
      postalCode: "160-0022",
    };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(result.id).toBe(input.id);
    expect(result.fullName).toBe("山田 太郎");
    expect(result.email).toBe(input.email);
    expect(result.phone).toBe(input.phone);
    expect(result.status).toBe("ACTIVE");

    // リポジトリに保存されていることを確認
    const savedCustomer = await repository.findById(new CustomerId(input.id));
    expect(savedCustomer).not.toBeNull();
    expect(savedCustomer?.id.value).toBe(input.id);
  });

  it("既存のIDで顧客を作成しようとするとエラーが発生すること", async () => {
    // Arrange
    const input = {
      id: "CUS-001",
      lastName: "山田",
      firstName: "太郎",
      email: "yamada@example.com",
      phone: "090-1234-5678",
      prefecture: "東京都",
      city: "新宿区",
      street: "新宿1-1-1",
      postalCode: "160-0022",
    };

    // 最初の顧客を作成
    await useCase.execute(input);

    // 同じIDで別の顧客を作成しようとする
    const input2 = {
      ...input,
      lastName: "佐藤",
      firstName: "花子",
    };

    // Act & Assert
    await expect(useCase.execute(input2)).rejects.toThrow(
      "ID CUS-001 の顧客は既に存在します"
    );
  });

  it("不正な入力でエラーが発生すること", async () => {
    // Arrange
    const invalidInput = {
      id: "INVALID-001", // 不正なID形式
      lastName: "山田",
      firstName: "太郎",
      email: "yamada@example.com",
      phone: "090-1234-5678",
      prefecture: "東京都",
      city: "新宿区",
      street: "新宿1-1-1",
      postalCode: "160-0022",
    };

    // Act & Assert
    await expect(useCase.execute(invalidInput)).rejects.toThrow(
      "顧客IDの形式が不正です"
    );
  });
});
