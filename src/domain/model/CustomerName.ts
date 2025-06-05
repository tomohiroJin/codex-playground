/**
 * 顧客名を表す値オブジェクト
 */
export class CustomerName {
  private readonly _lastName: string;
  private readonly _firstName: string;

  /**
   * 顧客名を作成する
   * @param lastName 姓
   * @param firstName 名
   */
  constructor(lastName: string, firstName: string) {
    if (!lastName || !lastName.trim()) {
      throw new Error("姓は必須です");
    }

    if (!firstName || !firstName.trim()) {
      throw new Error("名は必須です");
    }

    if (lastName.length > 50) {
      throw new Error("姓は50文字以内である必要があります");
    }

    if (firstName.length > 50) {
      throw new Error("名は50文字以内である必要があります");
    }

    this._lastName = lastName.trim();
    this._firstName = firstName.trim();
  }

  /**
   * 姓を取得する
   */
  get lastName(): string {
    return this._lastName;
  }

  /**
   * 名を取得する
   */
  get firstName(): string {
    return this._firstName;
  }

  /**
   * フルネームを取得する
   */
  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  /**
   * 等価性を比較する
   * @param other 比較対象
   * @returns 等価の場合はtrue、そうでない場合はfalse
   */
  equals(other: CustomerName): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return (
      this._lastName === other._lastName && this._firstName === other._firstName
    );
  }

  /**
   * 文字列表現を返す
   * @returns 顧客名の文字列表現
   */
  toString(): string {
    return this.fullName;
  }
}
