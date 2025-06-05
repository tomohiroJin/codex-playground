import { CustomerId } from "../CustomerId";

describe("CustomerId Value Object", () => {
  it("有効な顧客IDで作成できること", () => {
    // Arrange & Act
    const id = new CustomerId("CUS-001");

    // Assert
    expect(id.value).toBe("CUS-001");
  });

  it("空の顧客IDでエラーが発生すること", () => {
    // Arrange & Act & Assert
    expect(() => new CustomerId("")).toThrow("顧客IDは必須です");
  });

  it("不正な形式の顧客IDでエラーが発生すること", () => {
    // Arrange & Act & Assert
    expect(() => new CustomerId("INVALID-001")).toThrow(
      "顧客IDの形式が不正です"
    );
  });

  it("等価性が正しく判定されること", () => {
    // Arrange
    const id1 = new CustomerId("CUS-001");
    const id2 = new CustomerId("CUS-001");
    const id3 = new CustomerId("CUS-002");

    // Act & Assert
    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });

  it("文字列表現が正しく返されること", () => {
    // Arrange
    const id = new CustomerId("CUS-001");

    // Act & Assert
    expect(id.toString()).toBe("CUS-001");
  });
});
