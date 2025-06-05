import { CustomerName } from "../CustomerName";

describe("CustomerName Value Object", () => {
  it("有効な顧客名で作成できること", () => {
    // Arrange & Act
    const name = new CustomerName("山田", "太郎");

    // Assert
    expect(name.lastName).toBe("山田");
    expect(name.firstName).toBe("太郎");
    expect(name.fullName).toBe("山田 太郎");
  });

  it("空の姓でエラーが発生すること", () => {
    // Arrange & Act & Assert
    expect(() => new CustomerName("", "太郎")).toThrow("姓は必須です");
  });

  it("空の名でエラーが発生すること", () => {
    // Arrange & Act & Assert
    expect(() => new CustomerName("山田", "")).toThrow("名は必須です");
  });

  it("50文字を超える姓でエラーが発生すること", () => {
    // Arrange
    const longLastName = "あ".repeat(51);

    // Act & Assert
    expect(() => new CustomerName(longLastName, "太郎")).toThrow(
      "姓は50文字以内である必要があります"
    );
  });

  it("50文字を超える名でエラーが発生すること", () => {
    // Arrange
    const longFirstName = "あ".repeat(51);

    // Act & Assert
    expect(() => new CustomerName("山田", longFirstName)).toThrow(
      "名は50文字以内である必要があります"
    );
  });

  it("前後の空白が削除されること", () => {
    // Arrange & Act
    const name = new CustomerName(" 山田 ", " 太郎 ");

    // Assert
    expect(name.lastName).toBe("山田");
    expect(name.firstName).toBe("太郎");
  });

  it("等価性が正しく判定されること", () => {
    // Arrange
    const name1 = new CustomerName("山田", "太郎");
    const name2 = new CustomerName("山田", "太郎");
    const name3 = new CustomerName("佐藤", "花子");

    // Act & Assert
    expect(name1.equals(name2)).toBe(true);
    expect(name1.equals(name3)).toBe(false);
  });

  it("文字列表現が正しく返されること", () => {
    // Arrange
    const name = new CustomerName("山田", "太郎");

    // Act & Assert
    expect(name.toString()).toBe("山田 太郎");
  });
});
