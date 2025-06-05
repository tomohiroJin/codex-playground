import { CustomerId } from "../../domain/model/CustomerId";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";

/**
 * 顧客削除ユースケースの出力データ
 */
export interface DeleteCustomerOutput {
  success: boolean;
  message: string;
}

/**
 * 顧客削除ユースケース
 */
export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * 顧客を削除する
   * @param id 削除する顧客ID
   * @returns 削除結果の出力データ
   */
  async execute(id: string): Promise<DeleteCustomerOutput> {
    // 顧客IDの作成
    const customerId = new CustomerId(id);

    // 顧客の存在確認
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      return {
        success: false,
        message: `ID ${id} の顧客が見つかりません`,
      };
    }

    // 顧客の削除
    const result = await this.customerRepository.delete(customerId);

    // 出力データの作成
    return {
      success: result,
      message: result
        ? `ID ${id} の顧客を削除しました`
        : `ID ${id} の顧客の削除に失敗しました`,
    };
  }
}
