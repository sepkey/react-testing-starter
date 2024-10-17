import { render, screen, waitFor } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagsList", () => {
  it("should list tags", async () => {
    render(<TagList />);

    await waitFor(() => {
      const items = screen.queryAllByRole("listitem");
      expect(items.length).toBeGreaterThan(0);
    });
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
