import { CustomerRepository } from "../../domain/repository/CustomerRepository";

/**
 * 顧客一覧の出力データ項目
 */
export interface CustomerListItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
}

/**
 * 顧客一覧ユースケースの出力データ
 */
export interface ListCustomersOutput {
  customers: CustomerListItem[];
  total: number;
}

/**
 * 顧客一覧ユースケース
 */
export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * すべての顧客を取得する
   * @param activeOnly アクティブな顧客のみを取得する場合はtrue
   * @returns 顧客一覧の出力データ
   */
  async execute(activeOnly: boolean = false): Promise<ListCustomersOutput> {
    // 顧客の取得
    const customers = activeOnly
      ? await this.customerRepository.findActiveCustomers()
      : await this.customerRepository.findAll();

    // 出力データの作成
    const customerItems = customers.map((customer) => ({
      id: customer.id.value,
      fullName: customer.name.fullName,
      email: customer.contact.email,
      phone: customer.contact.phone,
      status: customer.status,
    }));

    return {
      customers: customerItems,
      total: customerItems.length,
    };
  }

  /**
   * 顧客名で顧客を検索する
   * @param name 検索する顧客名
   * @returns 顧客一覧の出力データ
   */
  async searchByName(name: string): Promise<ListCustomersOutput> {
    // 顧客名で検索
    const customers = await this.customerRepository.findByName(name);

    // 出力データの作成
    const customerItems = customers.map((customer) => ({
      id: customer.id.value,
      fullName: customer.name.fullName,
      email: customer.contact.email,
      phone: customer.contact.phone,
      status: customer.status,
    }));

    return {
      customers: customerItems,
      total: customerItems.length,
    };
  }
}
