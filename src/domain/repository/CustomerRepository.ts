import { Customer } from "../model/Customer";
import { CustomerId } from "../model/CustomerId";

/**
 * 顧客リポジトリのインターフェース（ポート）
 * ドメイン層とインフラストラクチャ層の境界を定義する
 */
export interface CustomerRepository {
  /**
   * 顧客を保存する
   * @param customer 保存する顧客エンティティ
   * @returns 保存された顧客エンティティ
   */
  save(customer: Customer): Promise<Customer>;

  /**
   * 顧客IDで顧客を検索する
   * @param id 検索する顧客ID
   * @returns 見つかった顧客エンティティ、見つからない場合はnull
   */
  findById(id: CustomerId): Promise<Customer | null>;

  /**
   * すべての顧客を取得する
   * @returns 顧客エンティティの配列
   */
  findAll(): Promise<Customer[]>;

  /**
   * 顧客名で顧客を検索する
   * @param name 検索する顧客名（部分一致）
   * @returns 見つかった顧客エンティティの配列
   */
  findByName(name: string): Promise<Customer[]>;

  /**
   * 顧客を削除する
   * @param id 削除する顧客ID
   * @returns 削除に成功した場合はtrue、そうでない場合はfalse
   */
  delete(id: CustomerId): Promise<boolean>;

  /**
   * アクティブな顧客のみを取得する
   * @returns アクティブな顧客エンティティの配列
   */
  findActiveCustomers(): Promise<Customer[]>;

  /**
   * 非アクティブな顧客のみを取得する
   * @returns 非アクティブな顧客エンティティの配列
   */
  findInactiveCustomers(): Promise<Customer[]>;
}
