import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Primitive } from '@/_internal/components/primitive';
import { Toggle } from '.';

const TOGGLE_ROOT_TESTID = 'TOGGLE_ROOT_TESTID';

describe('Toggle', () => {
  describe('Toggle.Root', () => {
    it('should render a button element by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = await render(<Toggle.Root as="div" data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = await render(<Toggle.Root as={Primitive.div} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const TOGGLE_ROOT_TEXT = 'TOGGLE_ROOT_TEXT';

      const screen = await render(
        <Toggle.Root>
          <span>{TOGGLE_ROOT_TEXT}</span>
        </Toggle.Root>
      );

      await expect.element(screen.getByText(TOGGLE_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have type="button" by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('type', 'button');
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

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(<Toggle.Root disabled={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(<Toggle.Root disabled={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have aria-pressed="false" by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have aria-pressed="false" when the "defaultPressed" prop is false', async () => {
      const screen = await render(<Toggle.Root defaultPressed={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have aria-pressed="true" when the "defaultPressed" prop is true', async () => {
      const screen = await render(<Toggle.Root defaultPressed={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have data-state="off" by default', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-state', 'off');
    });

    it('should have data-state="off" when the "defaultPressed" prop is false', async () => {
      const screen = await render(<Toggle.Root defaultPressed={false} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-state', 'off');
    });

    it('should have data-state="on" when the "defaultPressed" prop is true', async () => {
      const screen = await render(<Toggle.Root defaultPressed={true} data-testid={TOGGLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TOGGLE_ROOT_TESTID)).toHaveAttribute('data-state', 'on');
    });

    it('should toggle "aria-pressed" attribute when clicked', async () => {
      const screen = await render(<Toggle.Root data-testid={TOGGLE_ROOT_TESTID} />);
      const element = screen.getByTestId(TOGGLE_ROOT_TESTID);

      await expect.element(element).toHaveAttribute('aria-pressed', 'false');

      await element.click();
      await expect.element(element).toHaveAttribute('aria-pressed', 'true');

      await element.click();
      await expect.element(element).toHaveAttribute('aria-pressed', 'false');
    });

    it('should toggle "data-state" attribute when clicked', async () => {
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
});
