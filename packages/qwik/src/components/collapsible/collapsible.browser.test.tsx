import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { Primitive } from '@/_internal/components/primitive';
import { Collapsible } from '.';

const COLLAPSIBLE_ROOT_TESTID = 'COLLAPSIBLE_ROOT_TESTID';
const COLLAPSIBLE_TRIGGER_TESTID = 'COLLAPSIBLE_TRIGGER_TESTID';
const COLLAPSIBLE_PANEL_TESTID = 'COLLAPSIBLE_PANEL_TESTID';
const COLLAPSIBLE_INDICATOR_TESTID = 'COLLAPSIBLE_INDICATOR_TESTID';

describe('Collapsible', () => {
  describe('Collapsible.Root', () => {
    it('should render a div element by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(<Collapsible.Root as="span" data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(<Collapsible.Root as={Primitive.span} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const COLLAPSIBLE_ROOT_TEXT = 'COLLAPSIBLE_ROOT_TEXT';

      const screen = await render(
        <Collapsible.Root>
          <span>{COLLAPSIBLE_ROOT_TEXT}</span>
        </Collapsible.Root>
      );

      await expect.element(screen.getByText(COLLAPSIBLE_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have data-state="closed" by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when the collapsible is closed', async () => {
      const screen = await render(<Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when the collapsible is open', async () => {
      const screen = await render(<Collapsible.Root defaultOpen={true} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(<Collapsible.Root disabled={false} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(<Collapsible.Root disabled={true} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have style="contain: layout style"', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveStyle({ contain: 'layout style' });
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const COLLAPSIBLE_ROOT_STYLE = { backgroundColor: 'rgb(1, 2, 3)', color: 'rgba(3, 2, 1)' };

      const screen = await render(
        <Collapsible.Root style={COLLAPSIBLE_ROOT_STYLE} data-testid={COLLAPSIBLE_ROOT_TESTID} />
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveStyle(COLLAPSIBLE_ROOT_STYLE);
    });

    it('should have the "data-entry-ui-qwik-collapsible-root" attribute with an empty value', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-collapsible-root', '');
    });
  });

  describe('Collapsible.Trigger', () => {
    it('should render a button element by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger as="div" data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger as={Primitive.div} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );
      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const COLLAPSIBLE_TRIGGER_TEXT = 'COLLAPSIBLE_TRIGGER_TEXT';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger>
            <span>{COLLAPSIBLE_TRIGGER_TEXT}</span>
          </Collapsible.Trigger>
        </Collapsible.Root>
      );

      await expect.element(screen.getByText(COLLAPSIBLE_TRIGGER_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have type="button" by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id even when the "id" prop is undefined', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger id={undefined} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id when an empty string is provided as "id" prop', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger id=" " data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const COLLAPSIBLE_TRIGGER_ID = 'COLLAPSIBLE_TRIGGER_ID';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger id={COLLAPSIBLE_TRIGGER_ID} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID))
        .toHaveAttribute('id', COLLAPSIBLE_TRIGGER_ID);
    });

    it('should not be disabled by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be not disabled when the "disabled" prop is false on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeDisabled();
    });

    it('should be not disabled when "disabled" prop is false on Collapsible.Trigger even if Collapsible.Root is disabled', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger disabled={false} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true on Collapsible.Trigger even if Collapsible.Root is enabled', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger disabled={true} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('disabled');
    });

    it('should not have "aria-controls" attribute when the collapsible is closed and Collapsible.Root not contains Collapsible.Panel', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have "aria-controls" attribute when the collapsible is closed and Collapsible.Root contains Collapsible.Panel', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have "aria-controls" attribute when the collapsible is open and Collapsible.Root not contains Collapsible.Panel', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should have "aria-controls" attribute associated with Collapsible.Panel "id" attribute when the collapsible is open and Collapsible.Root contains Collapsible.Panel', async () => {
      const COLLAPSIBLE_PANEL_ID = 'COLLAPSIBLE_PANEL_ID';

      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel id={COLLAPSIBLE_PANEL_ID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID))
        .toHaveAttribute('aria-controls', COLLAPSIBLE_PANEL_ID);
    });

    it('should not have "aria-expanded" attribute when Collapsible.Root not contains Collapsible.Panel', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-expanded');
    });

    it('should have aria-expanded="false" when the collapsible is closed and Collapsible.Root contains Collapsible.Panel', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when the collapsible is open and Collapsible.Root contains Collapsible.Panel', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have data-state="closed" by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "data-entry-ui-qwik-collapsible-trigger" attribute with an empty value', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-collapsible-trigger', '');
    });
  });

  describe('Collapsible.Panel', () => {
    it('should render a div element by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel as="span" data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel as={Primitive.span} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel>
            <span>{COLLAPSIBLE_PANEL_TEXT}</span>
          </Collapsible.Panel>
        </Collapsible.Root>
      );

      await expect.element(screen.getByText(COLLAPSIBLE_PANEL_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id even when the "id" prop is undefined', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel id={undefined} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id when an empty string is provided as "id" prop', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel id=" " data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const COLLAPSIBLE_PANEL_ID = 'COLLAPSIBLE_PANEL_ID';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel id={COLLAPSIBLE_PANEL_ID} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('id', COLLAPSIBLE_PANEL_ID);
    });

    it('should not have "role" attribute when Collapsible.Root not contains Collapsible.Trigger', async () => {
      const screen = render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('role');
    });

    it('should have role="group" when Collapsible.Root contains Collapsible.Trigger', async () => {
      const screen = render(
        <Collapsible.Root>
          <Collapsible.Trigger />
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('role', 'group');
    });

    it('should not have "hidden" attribute when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('hidden');
    });

    it('should have hidden="hidden" when the collapsible is closed by default', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden');
    });

    it('should have hidden="hidden" when the collapsible is closed and "hiddenUntilFound" is false', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have hidden="until-found" when the collapsible is closed and "hiddenUntilFound" is true', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should have hidden="hidden" when the collapsible is closed and "hiddenUntilFound" is true but the collapsible is disabled', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false} disabled={true}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have hidden="hidden" when the collapsible is closed, "hiddenUntilFound" is false and collapsible is disabled', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false} disabled={true}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have hidden="until-found" when the collapsible is closed, NOT disabled and "hiddenUntilFound" is true', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false} disabled={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should not have "aria-labelledby" attribute when Collapsible.Root not contains Collapsible.Trigger', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('aria-labelledby');
    });

    it('should have "aria-labelledby" attribute associated with Collapsible.Trigger "id" attribute when Collapsible.Root contains Collapsible.Trigger', async () => {
      const COLLAPSIBLE_TRIGGER_ID = 'COLLAPSIBLE_TRIGGER_ID';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger id={COLLAPSIBLE_TRIGGER_ID} />
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveAttribute('aria-labelledby', COLLAPSIBLE_TRIGGER_ID);
    });

    it('should have data-state="closed" by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should not have any inline "display" style when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should not have any inline "display" style when the collapsible is closed and "hiddenUntilFound" is true', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should have style="display: none" when the collapsible is closed and "hiddenUntilFound" is false', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle({ display: 'none' });
    });

    it('should temporarily disable animations on initial mount and re-enable them after the first interaction when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
      const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

      await expect.element(panelElement).toHaveStyle({ transitionDuration: '0s' });
      await expect.element(panelElement).toHaveStyle({ animationDuration: '0s' });

      await userEvent.click(triggerElement);

      await expect.element(panelElement).not.toHaveStyle('transition-duration');
      await expect.element(panelElement).not.toHaveStyle('animation-duration');

      await userEvent.click(triggerElement);

      await expect.element(panelElement).not.toHaveStyle('transition-duration');
      await expect.element(panelElement).not.toHaveStyle('animation-duration');
    });

    it('should temporarily disable animations on initial mount and re-enable them after the first interaction when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
      const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

      await expect.element(panelElement).toHaveStyle({ transitionDuration: '0s' });
      await expect.element(panelElement).toHaveStyle({ animationDuration: '0s' });

      await userEvent.click(triggerElement);

      await expect.element(panelElement).not.toHaveStyle('transition-duration');
      await expect.element(panelElement).not.toHaveStyle('animation-duration');

      await userEvent.click(triggerElement);

      await expect.element(panelElement).not.toHaveStyle('transition-duration');
      await expect.element(panelElement).not.toHaveStyle('animation-duration');
    });

    it('should have style="--entry-ui-qwik-collapsible-panel-height: 0px" by default when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: 0px');
    });

    it('should have style="--entry-ui-qwik-collapsible-panel-height: auto" by default when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');
    });

    it('should have style="--entry-ui-qwik-collapsible-panel-height: 0px" when "hiddenUntilFound" is false and collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: 0px');
    });

    it('should have style="--entry-ui-qwik-collapsible-panel-height: auto" when "hiddenUntilFound" is false and collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');
    });

    it('should have style="--entry-ui-qwik-collapsible-panel-height: none" when "hiddenUntilFound" is true and collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');
    });

    it('should have style="--entry-ui-qwik-collapsible-panel-height: auto" when "hiddenUntilFound" is true and collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');
    });

    it('should call "onOpenChangeComplete$" with the correct state when the panel is opened and closed', async () => {
      const handleOpenChangeComplete$ = vi.fn();

      const screen = render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          {/* eslint-disable-next-line qwik/valid-lexical-scope */}
          <Collapsible.Panel onOpenChangeComplete$={handleOpenChangeComplete$} />
        </Collapsible.Root>
      );

      const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);

      await userEvent.click(triggerElement);
      expect(handleOpenChangeComplete$).toHaveBeenCalledWith(true);

      await userEvent.click(triggerElement);
      expect(handleOpenChangeComplete$).toHaveBeenCalledWith(false);
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const COLLAPSIBLE_PANEL_STYLE = { backgroundColor: 'rgb(1, 2, 3)', color: 'rgba(3, 2, 1)' };

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel style={COLLAPSIBLE_PANEL_STYLE} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle(COLLAPSIBLE_PANEL_STYLE);
    });

    it('should have the "data-entry-ui-qwik-collapsible-panel" attribute with an empty value', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-collapsible-panel', '');
    });
  });

  describe('Collapsible.Indicator', () => {
    it('should render a span element by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator as="div" data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator as={Primitive.div} data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const COLLAPSIBLE_INDICATOR_TEXT = 'COLLAPSIBLE_INDICATOR_TEXT';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator>
            <div>{COLLAPSIBLE_INDICATOR_TEXT}</div>
          </Collapsible.Indicator>
        </Collapsible.Root>
      );

      await expect.element(screen.getByText(COLLAPSIBLE_INDICATOR_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have aria-hidden="true" by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have data-state="closed" by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true on Collapsible.Root', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have style="pointer-events: none"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveStyle({ pointerEvents: 'none' });
    });

    it('should have style="user-select: none"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveStyle({ userSelect: 'none' });
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const COLLAPSIBLE_INDICATOR_STYLE = { backgroundColor: 'rgb(1, 2, 3)', color: 'rgba(3, 2, 1)' };

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator style={COLLAPSIBLE_INDICATOR_STYLE} data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveStyle(COLLAPSIBLE_INDICATOR_STYLE);
    });

    it('should have the "data-entry-ui-qwik-collapsible-indicator" attribute with an empty value', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-collapsible-indicator', '');
    });
  });
});
