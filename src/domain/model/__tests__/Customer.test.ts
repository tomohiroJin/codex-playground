import { Customer } from "../Customer";
import { CustomerAddress } from "../CustomerAddress";
import { CustomerContact } from "../CustomerContact";
import { CustomerId } from "../CustomerId";
import { CustomerName } from "../CustomerName";

describe("Customer Entity", () => {
  it("顧客を正しく作成できること", () => {
    // Arrange
    const id = new CustomerId("CUS-001");
    const name = new CustomerName("山田", "太郎");
    const contact = new CustomerContact("yamada@example.com", "090-1234-5678");
    const address = new CustomerAddress(
      "東京都",
      "新宿区",
      "新宿1-1-1",
      "101-0001"
    );

    // Act
    const customer = new Customer(id, name, contact, address);

    // Assert
    expect(customer.id).toEqual(id);
    expect(customer.name).toEqual(name);
    expect(customer.contact).toEqual(contact);
    expect(customer.address).toEqual(address);
    expect(customer.status).toBe("ACTIVE");
  });

  it("顧客情報を更新できること", () => {
    // Arrange
    const id = new CustomerId("CUS-001");
    const name = new CustomerName("山田", "太郎");
    const contact = new CustomerContact("yamada@example.com", "090-1234-5678");
    const address = new CustomerAddress(
      "東京都",
      "新宿区",
      "新宿1-1-1",
      "101-0001"
    );
    const customer = new Customer(id, name, contact, address);

    const newName = new CustomerName("山田", "次郎");
    const newContact = new CustomerContact("jiro@example.com", "090-8765-4321");
    const newAddress = new CustomerAddress(
      "大阪府",
      "大阪市",
      "梅田1-1-1",
      "530-0001"
    );

    // Act
    customer.updateName(newName);
    customer.updateContact(newContact);
    customer.updateAddress(newAddress);

    // Assert
    expect(customer.name).toEqual(newName);
    expect(customer.contact).toEqual(newContact);
    expect(customer.address).toEqual(newAddress);
  });

  it("顧客ステータスを変更できること", () => {
    // Arrange
    const id = new CustomerId("CUS-001");
    const name = new CustomerName("山田", "太郎");
    const contact = new CustomerContact("yamada@example.com", "090-1234-5678");
    const address = new CustomerAddress(
      "東京都",
      "新宿区",
      "新宿1-1-1",
      "101-0001"
    );
    const customer = new Customer(id, name, contact, address);

    // Act
    customer.deactivate();

    // Assert
    expect(customer.status).toBe("INACTIVE");

    // Act
    customer.activate();

    // Assert
    expect(customer.status).toBe("ACTIVE");
  });
});
