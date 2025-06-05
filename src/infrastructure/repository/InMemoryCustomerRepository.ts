import { Customer } from "../../domain/model/Customer";
import { CustomerId } from "../../domain/model/CustomerId";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";
import { InMemoryDatabase } from "../database/InMemoryDatabase";

/**
 * インメモリ顧客リポジトリの実装
 * CustomerRepositoryインターフェースを実装する
 */
export class InMemoryCustomerRepository implements CustomerRepository {
  private readonly db: InMemoryDatabase;
  private readonly collectionName = "customers";

  constructor() {
    this.db = InMemoryDatabase.getInstance();
  }

  /**
   * 顧客を保存する
   * @param customer 保存する顧客エンティティ
   * @returns 保存された顧客エンティティ
   */
  async save(customer: Customer): Promise<Customer> {
    this.db.save(this.collectionName, customer.id.value, customer);
    return customer;
  }

  /**
   * 顧客IDで顧客を検索する
   * @param id 検索する顧客ID
   * @returns 見つかった顧客エンティティ、見つからない場合はnull
   */
  async findById(id: CustomerId): Promise<Customer | null> {
    return this.db.findById<Customer>(this.collectionName, id.value);
  }

  /**
   * すべての顧客を取得する
   * @returns 顧客エンティティの配列
   */
  async findAll(): Promise<Customer[]> {
    return this.db.findAll<Customer>(this.collectionName);
  }

  /**
   * 顧客名で顧客を検索する
   * @param name 検索する顧客名（部分一致）
   * @returns 見つかった顧客エンティティの配列
   */
  async findByName(name: string): Promise<Customer[]> {
    return this.db.find<Customer>(this.collectionName, (customer) => {
      const fullName = customer.name.fullName;
      return fullName.includes(name);
    });
  }

  /**
   * 顧客を削除する
   * @param id 削除する顧客ID
   * @returns 削除に成功した場合はtrue、そうでない場合はfalse
   */
  async delete(id: CustomerId): Promise<boolean> {
    return this.db.delete(this.collectionName, id.value);
  }

  /**
   * アクティブな顧客のみを取得する
   * @returns アクティブな顧客エンティティの配列
   */
  async findActiveCustomers(): Promise<Customer[]> {
    return this.db.find<Customer>(
      this.collectionName,
      (customer) => customer.status === "ACTIVE"
    );
  }

  /**
   * 非アクティブな顧客のみを取得する
   * @returns 非アクティブな顧客エンティティの配列
   */
  async findInactiveCustomers(): Promise<Customer[]> {
    return this.db.find<Customer>(
      this.collectionName,
      (customer) => customer.status === "INACTIVE"
    );
  }

  /**
   * テスト用にコレクションをクリアする
   */
  async clear(): Promise<void> {
    this.db.clear(this.collectionName);
  }
}
