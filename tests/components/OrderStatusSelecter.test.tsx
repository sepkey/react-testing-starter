import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      trigger: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) =>
        screen.findByRole("option", { name: label }),
      user: userEvent.setup(),
      onChange,
    };
  };
  it("should render New as a default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { trigger, user, getOptions } = renderComponent();

    await user.click(trigger);
    expect(trigger).toHaveTextContent(/new/i);

    const options = await getOptions();
    expect(options).toHaveLength(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onchange with $value when the $label is selected",
    async ({ label, value }) => {
      const { trigger, user, onChange, getOption } = renderComponent();
      await user.click(trigger);

      const option = await getOption(label);
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("should call onChange with 'new' when the /new/i is selected", async () => {
    const { trigger, user, onChange, getOption } = renderComponent();
    await user.click(trigger);

    // const processedOption = await getOption(/processed/i);
    // await user.click(processedOption); //or:

    const fullFilledOption = await getOption(/fulfilled/i);
    await user.click(fullFilledOption);

    await user.click(trigger);

    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
