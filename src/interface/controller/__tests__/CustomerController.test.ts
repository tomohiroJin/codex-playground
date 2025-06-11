import { Request, Response } from "express";
import { CustomerController } from "../CustomerController";

// updateCustomer の ID の扱いをテストする

describe("CustomerController.updateCustomer", () => {
  it("URL の ID を優先して使用すること", async () => {
    const executeMock = jest.fn().mockResolvedValue({});
    const controller = new CustomerController(
      {} as any,
      {} as any,
      {} as any,
      { execute: executeMock } as any,
      {} as any,
      {} as any
    );

    const req = {
      params: { id: "CUS-001" },
      body: { id: "CUS-999" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.updateCustomer(req, res);

    expect(executeMock).toHaveBeenCalledWith({ id: "CUS-001" });
  });
});

describe("CustomerController.exportCustomersCsv", () => {
  it("CSV を返すこと", async () => {
    const executeMock = jest.fn().mockResolvedValue("csvdata");
    const controller = new CustomerController(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      { execute: executeMock } as any
    );

    const req = { query: {} } as unknown as Request;
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await controller.exportCustomersCsv(req, res);

    expect(executeMock).toHaveBeenCalledWith(false);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "text/csv; charset=utf-8"
    );
    expect(res.send).toHaveBeenCalledWith("csvdata");
  });
});
