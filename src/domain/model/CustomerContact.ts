/**
 * 顧客の連絡先情報を表す値オブジェクト
 */
export class CustomerContact {
  private readonly _email: string;
  private readonly _phone: string;

  /**
   * 顧客の連絡先情報を作成する
   * @param email メールアドレス
   * @param phone 電話番号
   */
  constructor(email: string, phone: string) {
    if (!email || !email.trim()) {
      throw new Error("メールアドレスは必須です");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("メールアドレスの形式が不正です");
    }

    if (!phone || !phone.trim()) {
      throw new Error("電話番号は必須です");
    }

    if (!this.isValidPhone(phone)) {
      throw new Error("電話番号の形式が不正です");
    }

    this._email = email.trim();
    this._phone = phone.trim();
  }

  /**
   * メールアドレスを取得する
   */
  get email(): string {
    return this._email;
  }

  /**
   * 電話番号を取得する
   */
  get phone(): string {
    return this._phone;
  }

  /**
   * メールアドレスの形式が正しいかチェックする
   * @param email チェック対象のメールアドレス
   * @returns 形式が正しい場合はtrue、そうでない場合はfalse
   */
  private isValidEmail(email: string): boolean {
    // 簡易的なメールアドレスの検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 電話番号の形式が正しいかチェックする
   * @param phone チェック対象の電話番号
   * @returns 形式が正しい場合はtrue、そうでない場合はfalse
   */
  private isValidPhone(phone: string): boolean {
    // 簡易的な電話番号の検証（ハイフンあり/なし両方対応）
    const phoneRegex = /^(0\d{1,4}-\d{1,4}-\d{4}|\d{10,11})$/;
    return phoneRegex.test(phone);
  }

  /**
   * 等価性を比較する
   * @param other 比較対象
   * @returns 等価の場合はtrue、そうでない場合はfalse
   */
  equals(other: CustomerContact): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this._email === other._email && this._phone === other._phone;
  }

  /**
   * 文字列表現を返す
   * @returns 連絡先情報の文字列表現
   */
  toString(): string {
    return `Email: ${this._email}, Phone: ${this._phone}`;
  }
}
