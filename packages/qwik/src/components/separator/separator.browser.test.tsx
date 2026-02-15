import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Primitive } from '@/_internal/components/primitive';
import { Separator } from '.';

const SEPARATOR_ROOT_TESTID = 'SEPARATOR_ROOT_TESTID';

describe('Separator', () => {
  describe('Separator.Root', () => {
    it('should render a div element by default', async () => {
      const screen = await render(<Separator.Root data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(<Separator.Root as="span" data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(<Separator.Root as={Primitive.span} data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const SEPARATOR_ROOT_TEXT = 'SEPARATOR_ROOT_TEXT';

      const screen = await render(
        <Separator.Root data-testid={SEPARATOR_ROOT_TESTID}>
          <div>{SEPARATOR_ROOT_TEXT}</div>
        </Separator.Root>
      );

      await expect.element(screen.getByText(SEPARATOR_ROOT_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have role="separator" by default', async () => {
      const screen = await render(<Separator.Root data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('role', 'separator');
    });

    it('should have role="separator" when "decorative" prop is false', async () => {
      const screen = await render(<Separator.Root decorative={false} data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('role', 'separator');
    });

    it('should not have "role" attribute when decorative prop is true', async () => {
      const screen = await render(<Separator.Root decorative={true} data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).not.toHaveAttribute('role');
    });

    it('should not have "aria-hidden" attribute by default', async () => {
      const screen = await render(<Separator.Root data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).not.toHaveAttribute('aria-hidden');
    });

    it('should not have "aria-hidden" attribute when "decorative" prop is false', async () => {
      const screen = await render(<Separator.Root decorative={false} data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).not.toHaveAttribute('aria-hidden');
    });

    it('should have aria-hidden="true" when "decorative" prop is true', async () => {
      const screen = await render(<Separator.Root decorative={true} data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-orientation="horizontal" by default', async () => {
      const screen = await render(<Separator.Root data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have aria-orientation="horizontal" when "orientation" prop is "horizontal" and "decorative" is false', async () => {
      const screen = await render(
        <Separator.Root orientation="horizontal" decorative={false} data-testid={SEPARATOR_ROOT_TESTID} />
      );
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have aria-orientation="vertical" when "orientation" prop is "vertical" and "decorative" is false', async () => {
      const screen = await render(
        <Separator.Root orientation="vertical" decorative={false} data-testid={SEPARATOR_ROOT_TESTID} />
      );
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should not have "aria-orientation" attribute when "orientation" prop is "horizontal" and "decorative" is true', async () => {
      const screen = await render(
        <Separator.Root orientation="horizontal" decorative={true} data-testid={SEPARATOR_ROOT_TESTID} />
      );
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).not.toHaveAttribute('aria-orientation');
    });

    it('should not have "aria-orientation" attribute when "vertical" prop is "horizontal" and "decorative" is true', async () => {
      const screen = await render(
        <Separator.Root orientation="vertical" decorative={true} data-testid={SEPARATOR_ROOT_TESTID} />
      );
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).not.toHaveAttribute('aria-orientation');
    });

    it('should have data-orientation="horizontal" by default', async () => {
      const screen = await render(<Separator.Root data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have data-orientation="horizontal" when "orientation" prop is "horizontal"', async () => {
      const screen = await render(<Separator.Root orientation="horizontal" data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have data-orientation="vertical" when "orientation" prop is "vertical"', async () => {
      const screen = await render(<Separator.Root orientation="vertical" data-testid={SEPARATOR_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(SEPARATOR_ROOT_TESTID)).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should have the "data-entry-ui-qwik-separator-root" attribute with an empty value', async () => {
      const screen = await render(<Separator.Root data-testid={SEPARATOR_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(SEPARATOR_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-separator-root', '');
    });
  });
});
