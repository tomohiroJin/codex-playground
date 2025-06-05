import { CustomerId } from "./CustomerId";
import { CustomerName } from "./CustomerName";
import { CustomerContact } from "./CustomerContact";
import { CustomerAddress } from "./CustomerAddress";

/**
 * 顧客ステータスを表す型
 */
export type CustomerStatus = "ACTIVE" | "INACTIVE";

/**
 * 顧客エンティティ
 */
export class Customer {
  private readonly _id: CustomerId;
  private _name: CustomerName;
  private _contact: CustomerContact;
  private _address: CustomerAddress;
  private _status: CustomerStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  /**
   * 顧客エンティティを作成する
   * @param id 顧客ID
   * @param name 顧客名
   * @param contact 連絡先情報
   * @param address 住所情報
   * @param status 顧客ステータス（デフォルトは "ACTIVE"）
   */
  constructor(
    id: CustomerId,
    name: CustomerName,
    contact: CustomerContact,
    address: CustomerAddress,
    status: CustomerStatus = "ACTIVE"
  ) {
    if (!id) {
      throw new Error("顧客IDは必須です");
    }
    if (!name) {
      throw new Error("顧客名は必須です");
    }
    if (!contact) {
      throw new Error("連絡先情報は必須です");
    }
    if (!address) {
      throw new Error("住所情報は必須です");
    }

    this._id = id;
    this._name = name;
    this._contact = contact;
    this._address = address;
    this._status = status;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  /**
   * 顧客IDを取得する
   */
  get id(): CustomerId {
    return this._id;
  }

  /**
   * 顧客名を取得する
   */
  get name(): CustomerName {
    return this._name;
  }

  /**
   * 連絡先情報を取得する
   */
  get contact(): CustomerContact {
    return this._contact;
  }

  /**
   * 住所情報を取得する
   */
  get address(): CustomerAddress {
    return this._address;
  }

  /**
   * 顧客ステータスを取得する
   */
  get status(): CustomerStatus {
    return this._status;
  }

  /**
   * 作成日時を取得する
   */
  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * 更新日時を取得する
   */
  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  /**
   * 顧客名を更新する
   * @param name 新しい顧客名
   */
  updateName(name: CustomerName): void {
    if (!name) {
      throw new Error("顧客名は必須です");
    }
    this._name = name;
    this._updatedAt = new Date();
  }

  /**
   * 連絡先情報を更新する
   * @param contact 新しい連絡先情報
   */
  updateContact(contact: CustomerContact): void {
    if (!contact) {
      throw new Error("連絡先情報は必須です");
    }
    this._contact = contact;
    this._updatedAt = new Date();
  }

  /**
   * 住所情報を更新する
   * @param address 新しい住所情報
   */
  updateAddress(address: CustomerAddress): void {
    if (!address) {
      throw new Error("住所情報は必須です");
    }
    this._address = address;
    this._updatedAt = new Date();
  }

  /**
   * 顧客を有効化する
   */
  activate(): void {
    if (this._status === "ACTIVE") {
      return;
    }
    this._status = "ACTIVE";
    this._updatedAt = new Date();
  }

  /**
   * 顧客を無効化する
   */
  deactivate(): void {
    if (this._status === "INACTIVE") {
      return;
    }
    this._status = "INACTIVE";
    this._updatedAt = new Date();
  }

  /**
   * 等価性を比較する
   * @param other 比較対象
   * @returns 等価の場合はtrue、そうでない場合はfalse
   */
  equals(other: Customer): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this._id.equals(other._id);
  }

  /**
   * 文字列表現を返す
   * @returns 顧客の文字列表現
   */
  toString(): string {
    return `Customer(id=${this._id.value}, name=${this._name.fullName}, status=${this._status})`;
  }
}
