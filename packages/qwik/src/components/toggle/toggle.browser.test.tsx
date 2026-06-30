import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Primitive } from '@/_internal/components/primitive';
import { Toggle } from '.';

const TOGGLE_ROOT_TESTID = 'TOGGLE_ROOT_TESTID';
const TOGGLE_INDICATOR_TESTID = 'TOGGLE_INDICATOR_TESTID';

describe('Toggle', () => {
  describe('Toggle.Root', () => {
    it('should render a <button> element by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(<Toggle.Root as="div" data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(<Toggle.Root as={Primitive.div} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const TOGGLE_ROOT_TEXT = 'TOGGLE_ROOT_TEXT';

      const screen = await render(
        <Toggle.Root>
          <span>{TOGGLE_ROOT_TEXT}</span>
        </Toggle.Root>
      );

      await expect.element(screen.getByText(TOGGLE_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the type="button" attribute by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should have the aria-pressed="false" attribute by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have the aria-pressed="false" attribute when the "defaultPressed" prop is false', async () => {
      const screen = await render(<Toggle.Root defaultPressed={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have the aria-pressed="true" attribute when the "defaultPressed" prop is true', async () => {
      const screen = await render(<Toggle.Root defaultPressed={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('aria-pressed', 'true');
    });

    it('should not be disabled by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).not.toBeDisabled();
    });

    it('should not be disabled when the "disabled" prop is false', async () => {
      const screen = await render(<Toggle.Root disabled={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true', async () => {
      const screen = await render(<Toggle.Root disabled={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeDisabled();
    });

    it('should have the data-state="off" attribute by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-state', 'off');
    });

    it('should have the data-state="off" attribute when the "defaultPressed" prop is false', async () => {
      const screen = await render(<Toggle.Root defaultPressed={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-state', 'off');
    });

    it('should have the data-state="on" attribute when the "defaultPressed" prop is true', async () => {
      const screen = await render(<Toggle.Root defaultPressed={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-state', 'on');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(<Toggle.Root disabled={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(<Toggle.Root disabled={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should toggle the "aria-pressed" attribute value between "false" and "true" upon user clicks', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      const element = screen.getByTestId(TOGGLE_ROOT_TESTID);

      await expect.element(element).toHaveAttribute('aria-pressed', 'false');

      await element.click();
      await expect.element(element).toHaveAttribute('aria-pressed', 'true');

      await element.click();
      await expect.element(element).toHaveAttribute('aria-pressed', 'false');
    });

    it('should alternate the "data-state" attribute value between "off" and "on" upon user clicks', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      const element = screen.getByTestId(TOGGLE_ROOT_TESTID);

      await expect.element(element).toHaveAttribute('data-state', 'off');

      await element.click();
      await expect.element(element).toHaveAttribute('data-state', 'on');

      await element.click();
      await expect.element(element).toHaveAttribute('data-state', 'off');
    });

    it('should have the "data-entry-ui-qwik-toggle-root" attribute with an empty value', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(TOGGLE_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-toggle-root', '');
    });
  });

  describe('Toggle.Indicator', () => {
    it('should render a <span> element by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator as="div" data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator as={Primitive.div} data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const TOGGLE_INDICATOR_TEXT = 'TOGGLE_INDICATOR_TEXT';

      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID}>
            <div>{TOGGLE_INDICATOR_TEXT}</div>
          </Toggle.Indicator>
        </Toggle.Root>
      );

      await expect.element(screen.getByText(TOGGLE_INDICATOR_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have the aria-hidden="true" attribute by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have the data-state="off" attribute by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveAttribute('data-state', 'off');
    });

    it('should have the data-state="off" attribute when the "defaultPressed" prop is false on <Toggle.Root>', async () => {
      const screen = await render(
        <Toggle.Root defaultPressed={false}>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveAttribute('data-state', 'off');
    });

    it('should have the data-state="on" attribute when the "defaultPressed" prop is true on <Toggle.Root>', async () => {
      const screen = await render(
        <Toggle.Root defaultPressed={true}>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveAttribute('data-state', 'on');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false on <Toggle.Root>', async () => {
      const screen = await render(
        <Toggle.Root disabled={false}>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true on <Toggle.Root>', async () => {
      const screen = await render(
        <Toggle.Root disabled={true}>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "pointer-events: none" inline style by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveStyle('pointer-events: none');
    });

    it('should have the "user-select: none" inline style by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveStyle('user-select: none');
    });

    it('should have the "-webkit-user-select: none" inline style by default', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveStyle('-webkit-user-select: none');
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const TOGGLE_INDICATOR_STYLE =
        'pointer-events: all; user-select: all; -webkit-user-select: all; background-color: rgb(1, 2, 3); color: rgba(3, 2, 1)';

      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator style={TOGGLE_INDICATOR_STYLE} data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect.element(screen.getByTestId(TOGGLE_INDICATOR_TESTID)).toHaveStyle(TOGGLE_INDICATOR_STYLE);
    });

    it('should have the "data-entry-ui-qwik-toggle-indicator" attribute with an empty value', async () => {
      const screen = await render(
        <Toggle.Root>
          <Toggle.Indicator data-testid={TOGGLE_INDICATOR_TESTID} />
        </Toggle.Root>
      );

      await expect
        .element(screen.getByTestId(TOGGLE_INDICATOR_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-toggle-indicator', '');
    });
  });
});
