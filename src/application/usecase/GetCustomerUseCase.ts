import { CustomerId } from "../../domain/model/CustomerId";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";

/**
 * 顧客取得ユースケースの出力データ
 */
export interface GetCustomerOutput {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 顧客取得ユースケース
 */
export class GetCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * 顧客IDで顧客を取得する
   * @param id 取得する顧客ID
   * @returns 顧客の出力データ
   */
  async execute(id: string): Promise<GetCustomerOutput> {
    const customerId = new CustomerId(id);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error(`ID ${id} の顧客が見つかりません`);
    }

    return {
      id: customer.id.value,
      fullName: customer.name.fullName,
      email: customer.contact.email,
      phone: customer.contact.phone,
      address: customer.address.fullAddress,
      status: customer.status,
      createdAt: customer.createdAt.toISOString(),
      updatedAt: customer.updatedAt.toISOString(),
    };
  }
}
