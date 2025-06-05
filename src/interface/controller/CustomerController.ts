import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../application/usecase/CreateCustomerUseCase";
import { DeleteCustomerUseCase } from "../../application/usecase/DeleteCustomerUseCase";
import { GetCustomerUseCase } from "../../application/usecase/GetCustomerUseCase";
import { ListCustomersUseCase } from "../../application/usecase/ListCustomersUseCase";
import { UpdateCustomerUseCase } from "../../application/usecase/UpdateCustomerUseCase";

/**
 * 顧客コントローラー
 * RESTful APIのエンドポイントを提供する
 */
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerUseCase: GetCustomerUseCase,
    private readonly listCustomersUseCase: ListCustomersUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase
  ) {}

  /**
   * 顧客を作成する
   * POST /customers
   */
  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createCustomerUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      });
    }
  }

  /**
   * 顧客を取得する
   * GET /customers/:id
   */
  async getCustomer(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.getCustomerUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      });
    }
  }

  /**
   * 顧客一覧を取得する
   * GET /customers
   * クエリパラメータ:
   * - activeOnly: アクティブな顧客のみを取得する場合は "true"
   * - name: 顧客名で検索する場合は検索文字列
   */
  async listCustomers(req: Request, res: Response): Promise<void> {
    try {
      const activeOnly = req.query.activeOnly === "true";
      const name = req.query.name as string | undefined;

      let result;
      if (name) {
        result = await this.listCustomersUseCase.searchByName(name);
      } else {
        result = await this.listCustomersUseCase.execute(activeOnly);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      });
    }
  }

  /**
   * 顧客を更新する
   * PUT /customers/:id
   */
  async updateCustomer(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const input = { id, ...req.body };
      const result = await this.updateCustomerUseCase.execute(input);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      });
    }
  }

  /**
   * 顧客を削除する
   * DELETE /customers/:id
   */
  async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.deleteCustomerUseCase.execute(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      });
    }
  }
}
