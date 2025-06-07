import { CustomerRepository } from "../../domain/repository/CustomerRepository";

/**
 * 顧客情報をCSV形式でエクスポートするユースケース
 */
export class ExportCustomersCsvUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * 顧客一覧をCSV形式の文字列で取得する
   * @param activeOnly アクティブな顧客のみを対象とする場合はtrue
   * @returns CSV形式の文字列
   */
  async execute(activeOnly: boolean = false): Promise<string> {
    const customers = activeOnly
      ? await this.customerRepository.findActiveCustomers()
      : await this.customerRepository.findAll();

    const header = "id,fullName,email,phone,status";
    const rows = customers.map((c) =>
      [
        c.id.value,
        c.name.fullName,
        c.contact.email,
        c.contact.phone,
        c.status,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    return [header, ...rows].join("\n");
  }
}
