import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse, delay } from "msw";
import { db } from "../mocks/db";

describe("ProductList", () => {
  const productIds: number[] = [];
  beforeAll(() =>
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productIds.push(product.id);
    })
  );

  afterAll(() => db.product.deleteMany({ where: { id: { in: productIds } } }));

  it("should render list of products", async () => {
    render(<ProductList />);

    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should render no products if no product is found", async () => {
    server.use(http.get("./products", () => HttpResponse.json([])));
    render(<ProductList />);

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error message when there is error", async () => {
    server.use(http.get("./products", () => HttpResponse.error()));
    render(<ProductList />);

    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
  });

  it("should render loading indicator when fetching data", async () => {
    server.use(
      http.get("./products", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<ProductList />);

    const text = await screen.findByText(/loading/i);
    expect(text).toBeInTheDocument();
  });
  it("should remove loading indicator when fetching finished", async () => {
    render(<ProductList />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });
  it("should remove loading indicator when fetching failed", async () => {
    server.use(http.get("./products", () => HttpResponse.error()));
    render(<ProductList />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });
});
