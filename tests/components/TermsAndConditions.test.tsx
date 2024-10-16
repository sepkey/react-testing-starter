import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  render(<TermsAndConditions />);

  return {
    heading: screen.getByRole("heading"),
    checkbox: screen.getByRole("checkbox"),
    button: screen.getByRole("button", { name: /submit/i }),
  };
};

describe("TermsAndConditions", () => {
  it("should render with correct text with initial state", () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent(/terms/i);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it("should enable the button when checkbox is checked", async () => {
    const { checkbox, button } = renderComponent();

    const user = userEvent.setup();
    await user.click(checkbox);
    expect(button).toBeEnabled();
  });
});
