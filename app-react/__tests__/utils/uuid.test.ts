import { isUUIDValid } from '../../src/utils/uuid';

describe("UUID Utility", () => {
  it("Should handle valid UUID", () => {
    expect(isUUIDValid("3a546013-acf7-4ef8-b318-96c36ed281ff")).toBeTruthy();
    expect(isUUIDValid("d4622241-9c8b-4e96-844f-fd5cfd71f295")).toBeTruthy();
  });

  it("Should handle invalid UUID", () => {
    expect(isUUIDValid("MyNameIsUUID")).toBeFalsy();
    expect(isUUIDValid("5")).toBeFalsy();
  });
})