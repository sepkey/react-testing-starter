import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    return {
      input: screen.getByPlaceholderText(/search/i),
      onChange,
      user: userEvent.setup(),
    };
  };
  it("should render an input field for serching", () => {
    const { input } = renderComponent();
    expect(input).toBeInTheDocument();
  });

  it("should call onchange when enter is pressed", async () => {
    const { input, onChange, user } = renderComponent();
    const searchTerm = "SearchTerm";
    await user.type(input, searchTerm + "{enter}");

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it("should not call onchange when input is empty", async () => {
    const { input, onChange, user } = renderComponent();

    await user.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
