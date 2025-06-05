import { Customer } from "../../domain/model/Customer";
import { CustomerAddress } from "../../domain/model/CustomerAddress";
import { CustomerContact } from "../../domain/model/CustomerContact";
import { CustomerId } from "../../domain/model/CustomerId";
import { CustomerName } from "../../domain/model/CustomerName";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";

/**
 * 顧客作成ユースケースの入力データ
 */
export interface CreateCustomerInput {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  prefecture: string;
  city: string;
  street: string;
  postalCode: string;
}

/**
 * 顧客作成ユースケースの出力データ
 */
export interface CreateCustomerOutput {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
}

/**
 * 顧客作成ユースケース
 */
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * 顧客を作成する
   * @param input 顧客作成の入力データ
   * @returns 作成された顧客の出力データ
   */
  async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
    // 値オブジェクトの作成
    const id = new CustomerId(input.id);
    const name = new CustomerName(input.lastName, input.firstName);
    const contact = new CustomerContact(input.email, input.phone);
    const address = new CustomerAddress(
      input.prefecture,
      input.city,
      input.street,
      input.postalCode
    );

    // 既存の顧客IDをチェック
    const existingCustomer = await this.customerRepository.findById(id);
    if (existingCustomer) {
      throw new Error(`ID ${input.id} の顧客は既に存在します`);
    }

    // 顧客エンティティの作成
    const customer = new Customer(id, name, contact, address);

    // リポジトリに保存
    await this.customerRepository.save(customer);

    // 出力データの作成
    return {
      id: customer.id.value,
      fullName: customer.name.fullName,
      email: customer.contact.email,
      phone: customer.contact.phone,
      address: customer.address.fullAddress,
      status: customer.status,
      createdAt: customer.createdAt.toISOString(),
    };
  }
}
