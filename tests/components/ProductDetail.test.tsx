import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { db } from "../mocks/db";

describe("ProductDetail", () => {
  let productId: number;
  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: productId } } });
  });
  it("should render product details", async () => {
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });
    render(<ProductDetail productId={productId} />);
    expect(
      await screen.findByText(new RegExp(product!.name))
    ).toBeInTheDocument();

    expect(
      await screen.findByText(new RegExp(product!.price.toString()))
    ).toBeInTheDocument();
  });

  it("should render no product if not found ", async () => {
    server.use(http.get("/products/1", () => HttpResponse.json(null)));
    render(<ProductDetail productId={1} />);
    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should render error for invalid productId ", () => {
    render(<ProductDetail productId={0} />);
    const message = screen.getByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error message when data fetching is faied", async () => {
    server.use(http.get("/products/1", () => HttpResponse.error()));
    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
  });
});
