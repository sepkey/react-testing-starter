import { render, screen } from "@testing-library/react"; //itr
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("Should render Hello with the name when name is provided", () => {
    render(<Greet name="Sepide" />);
    // screen.debug();
    const heading = screen.getByRole("heading");
    // //Renders the component in the virtual dom of js DOM
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/sepide/i);
  });

  it("Should render login button  when name is not provided", () => {
    render(<Greet />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
