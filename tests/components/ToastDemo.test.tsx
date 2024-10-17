import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";

describe("ToastDemo", () => {
  it("should show toast notification by clicking button", async () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    // my solution
    // await waitFor(async () => {
    //   const toastFn = vi.spyOn(toast, "success");
    //   await user.click(button);
    //   expect(toastFn).toHaveBeenCalled();
    // });

    //course solution
    await user.click(button);
    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
  });
});
