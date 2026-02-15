import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Primitive } from '@/_internal/components/primitive';
import { Alert } from '.';

const ALERT_ROOT_TESTID = 'ALERT_ROOT_TESTID';

describe('Alert', () => {
  describe('Alert.Root', () => {
    it('should render a div element by default', async () => {
      const screen = await render(<Alert.Root data-testid={ALERT_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ALERT_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(<Alert.Root as="span" data-testid={ALERT_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ALERT_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(<Alert.Root as={Primitive.span} data-testid={ALERT_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ALERT_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ALERT_ROOT_TEXT = 'ALERT_ROOT_TEXT';

      const screen = await render(
        <Alert.Root>
          <div>{ALERT_ROOT_TEXT}</div>
        </Alert.Root>
      );
      await expect.element(screen.getByText(ALERT_ROOT_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have role="alert" by default', async () => {
      const screen = await render(<Alert.Root data-testid={ALERT_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ALERT_ROOT_TESTID)).toHaveAttribute('role', 'alert');
    });

    it('should have the "data-entry-ui-qwik-alert-root" attribute with an empty value', async () => {
      const screen = await render(<Alert.Root data-testid={ALERT_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ALERT_ROOT_TESTID)).toHaveAttribute('data-entry-ui-qwik-alert-root', '');
    });
  });
});
