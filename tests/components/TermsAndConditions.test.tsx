import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  it("should redder with correct text with initial state", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/terms/i);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should enable the button when checkbox is checked", async () => {
    render(<TermsAndConditions />);
    const checkbox = screen.getByRole("checkbox");

    const user = userEvent.setup();
    await user.click(checkbox);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeEnabled();
  });
});
