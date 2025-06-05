/**
 * 顧客IDを表す値オブジェクト
 */
export class CustomerId {
  private readonly _value: string;

  /**
   * 顧客IDを作成する
   * @param value 顧客ID文字列（例: "CUS-001"）
   */
  constructor(value: string) {
    if (!value) {
      throw new Error("顧客IDは必須です");
    }

    if (!this.isValidFormat(value)) {
      throw new Error(
        "顧客IDの形式が不正です。'CUS-'で始まる文字列である必要があります"
      );
    }

    this._value = value;
  }

  /**
   * 顧客IDの値を取得する
   */
  get value(): string {
    return this._value;
  }

  /**
   * 顧客IDの形式が正しいかチェックする
   * @param value チェック対象の文字列
   * @returns 形式が正しい場合はtrue、そうでない場合はfalse
   */
  private isValidFormat(value: string): boolean {
    return value.startsWith("CUS-") && value.length > 4;
  }

  /**
   * 等価性を比較する
   * @param other 比較対象
   * @returns 等価の場合はtrue、そうでない場合はfalse
   */
  equals(other: CustomerId): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this._value === other._value;
  }

  /**
   * 文字列表現を返す
   * @returns 顧客IDの文字列表現
   */
  toString(): string {
    return this._value;
  }
}
