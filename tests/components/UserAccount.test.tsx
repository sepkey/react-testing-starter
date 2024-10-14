import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
  it("should render user name ", () => {
    const user = { id: 1, name: "sepide" };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
  it("should render edit button when is admin", () => {
    const user = { id: 1, name: "sepide", isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });
  it("should not render edit button when is not admin", () => {
    const user = { id: 1, name: "sepide" };
    render(<UserAccount user={user} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
