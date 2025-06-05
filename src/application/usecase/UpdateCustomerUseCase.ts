import { CustomerAddress } from "../../domain/model/CustomerAddress";
import { CustomerContact } from "../../domain/model/CustomerContact";
import { CustomerId } from "../../domain/model/CustomerId";
import { CustomerName } from "../../domain/model/CustomerName";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";

/**
 * 顧客更新ユースケースの入力データ
 */
export interface UpdateCustomerInput {
  id: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  prefecture?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  status?: "ACTIVE" | "INACTIVE";
}

/**
 * 顧客更新ユースケースの出力データ
 */
export interface UpdateCustomerOutput {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  updatedAt: string;
}

/**
 * 顧客更新ユースケース
 */
export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * 顧客を更新する
   * @param input 顧客更新の入力データ
   * @returns 更新された顧客の出力データ
   */
  async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput> {
    // 顧客IDの作成
    const customerId = new CustomerId(input.id);

    // 顧客の取得
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error(`ID ${input.id} の顧客が見つかりません`);
    }

    // 名前の更新
    if (input.lastName !== undefined || input.firstName !== undefined) {
      const lastName = input.lastName ?? customer.name.lastName;
      const firstName = input.firstName ?? customer.name.firstName;
      const newName = new CustomerName(lastName, firstName);
      customer.updateName(newName);
    }

    // 連絡先の更新
    if (input.email !== undefined || input.phone !== undefined) {
      const email = input.email ?? customer.contact.email;
      const phone = input.phone ?? customer.contact.phone;
      const newContact = new CustomerContact(email, phone);
      customer.updateContact(newContact);
    }

    // 住所の更新
    if (
      input.prefecture !== undefined ||
      input.city !== undefined ||
      input.street !== undefined ||
      input.postalCode !== undefined
    ) {
      const prefecture = input.prefecture ?? customer.address.prefecture;
      const city = input.city ?? customer.address.city;
      const street = input.street ?? customer.address.street;
      const postalCode = input.postalCode ?? customer.address.postalCode;
      const newAddress = new CustomerAddress(
        prefecture,
        city,
        street,
        postalCode
      );
      customer.updateAddress(newAddress);
    }

    // ステータスの更新
    if (input.status !== undefined) {
      if (input.status === "ACTIVE") {
        customer.activate();
      } else if (input.status === "INACTIVE") {
        customer.deactivate();
      }
    }

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
      updatedAt: customer.updatedAt.toISOString(),
    };
  }
}
