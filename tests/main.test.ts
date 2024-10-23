import { db } from "./mocks/db";

describe("group", () => {
  it("should", () => {
    const product = db.product.create({ name: "beh" });
    console.log(db.product.delete({ where: { id: { equals: product.id } } }));
  });
});
