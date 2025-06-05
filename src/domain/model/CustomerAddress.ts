/**
 * 顧客の住所情報を表す値オブジェクト
 */
export class CustomerAddress {
  private readonly _prefecture: string;
  private readonly _city: string;
  private readonly _street: string;
  private readonly _postalCode: string;

  /**
   * 顧客の住所情報を作成する
   * @param prefecture 都道府県
   * @param city 市区町村
   * @param street 番地・建物名
   * @param postalCode 郵便番号
   */
  constructor(
    prefecture: string,
    city: string,
    street: string,
    postalCode: string
  ) {
    if (!prefecture || !prefecture.trim()) {
      throw new Error("都道府県は必須です");
    }

    if (!city || !city.trim()) {
      throw new Error("市区町村は必須です");
    }

    if (!street || !street.trim()) {
      throw new Error("番地・建物名は必須です");
    }

    if (!postalCode || !postalCode.trim()) {
      throw new Error("郵便番号は必須です");
    }

    if (!this.isValidPostalCode(postalCode)) {
      throw new Error("郵便番号の形式が不正です");
    }

    this._prefecture = prefecture.trim();
    this._city = city.trim();
    this._street = street.trim();
    this._postalCode = postalCode.trim();
  }

  /**
   * 都道府県を取得する
   */
  get prefecture(): string {
    return this._prefecture;
  }

  /**
   * 市区町村を取得する
   */
  get city(): string {
    return this._city;
  }

  /**
   * 番地・建物名を取得する
   */
  get street(): string {
    return this._street;
  }

  /**
   * 郵便番号を取得する
   */
  get postalCode(): string {
    return this._postalCode;
  }

  /**
   * 完全な住所を取得する
   */
  get fullAddress(): string {
    return `〒${this._postalCode} ${this._prefecture}${this._city}${this._street}`;
  }

  /**
   * 郵便番号の形式が正しいかチェックする
   * @param postalCode チェック対象の郵便番号
   * @returns 形式が正しい場合はtrue、そうでない場合はfalse
   */
  private isValidPostalCode(postalCode: string): boolean {
    // 郵便番号の検証（ハイフンあり/なし両方対応）
    const postalCodeRegex = /^(\d{3}-\d{4}|\d{7})$/;
    return postalCodeRegex.test(postalCode);
  }

  /**
   * 等価性を比較する
   * @param other 比較対象
   * @returns 等価の場合はtrue、そうでない場合はfalse
   */
  equals(other: CustomerAddress): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return (
      this._prefecture === other._prefecture &&
      this._city === other._city &&
      this._street === other._street &&
      this._postalCode === other._postalCode
    );
  }

  /**
   * 文字列表現を返す
   * @returns 住所情報の文字列表現
   */
  toString(): string {
    return this.fullAddress;
  }
}
