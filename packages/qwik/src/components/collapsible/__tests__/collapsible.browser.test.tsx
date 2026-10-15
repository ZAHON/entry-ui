import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { wait } from '@entry-ui/utilities/wait';
import { Primitive } from '@/_internal/components/primitive';
import { Collapsible } from '..';
import { CollapsiblePanelCssTransition } from './fixtures/collapsible-panel-css-transition';
import { CollapsiblePanelCssAnimation } from './fixtures/collapsible-panel-css-animation';

const COLLAPSIBLE_ROOT_TESTID = 'COLLAPSIBLE_ROOT_TESTID';
const COLLAPSIBLE_TRIGGER_TESTID = 'COLLAPSIBLE_TRIGGER_TESTID';
const COLLAPSIBLE_PANEL_TESTID = 'COLLAPSIBLE_PANEL_TESTID';
const COLLAPSIBLE_INDICATOR_TESTID = 'COLLAPSIBLE_INDICATOR_TESTID';

describe('Collapsible', () => {
  describe('Collapsible.Root', () => {
    it('should render a <div> element by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <span> element when the "as" prop is set to "span"', async () => {
      const screen = await render(<Collapsible.Root as="span" data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <span> element when the "as" prop is set to the <Primitive.span> component', async () => {
      const screen = await render(<Collapsible.Root as={Primitive.span} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const COLLAPSIBLE_ROOT_TEXT = 'COLLAPSIBLE_ROOT_TEXT';

      const screen = await render(
        <Collapsible.Root>
          <span>{COLLAPSIBLE_ROOT_TEXT}</span>
        </Collapsible.Root>
      );

      await expect.element(screen.getByText(COLLAPSIBLE_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the "data-closed" attribute with an empty value by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should have the "data-closed" attribute with an empty value when the collapsible is closed', async () => {
      const screen = await render(<Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should not have the "data-closed" attribute when the collapsible is open', async () => {
      const screen = await render(<Collapsible.Root defaultOpen={true} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-closed');
    });

    it('should not have the "data-open" attribute by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should have the "data-open" attribute with an empty value when the collapsible is open', async () => {
      const screen = await render(<Collapsible.Root defaultOpen={true} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-open', '');
    });

    it('should not have the "data-open" attribute when the collapsible is closed', async () => {
      const screen = await render(<Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(<Collapsible.Root disabled={false} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(<Collapsible.Root disabled={true} data-testid={COLLAPSIBLE_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "data-entry-ui-qwik-collapsible-root" attribute with an empty value', async () => {
      const screen = await render(<Collapsible.Root data-testid={COLLAPSIBLE_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-collapsible-root', '');
    });
  });

  describe('Collapsible.Trigger', () => {
    it('should render a <button> element by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger as="div" data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger as={Primitive.div} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );
      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
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

    it('should have the type="button" attribute by default', async () => {
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

    it('should not have the "aria-controls" attribute when the collapsible is closed and <Collapsible.Root> does not contain <Collapsible.Panel>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have the "aria-controls" attribute when the collapsible is closed and <Collapsible.Root> contains <Collapsible.Panel>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have the "aria-controls" attribute when the collapsible is open and <Collapsible.Root> does not contain <Collapsible.Panel>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should have the "aria-controls" attribute associated with Collapsible.Panel "id" attribute when the collapsible is open and <Collapsible.Root> contains <Collapsible.Panel>', async () => {
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

    it('should not have the "aria-expanded" attribute when <Collapsible.Root> does not contain <Collapsible.Panel>', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('aria-expanded');
    });

    it('should have the aria-expanded="false" when the collapsible is closed and <Collapsible.Root> contains <Collapsible.Panel>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have the aria-expanded="true" when the collapsible is open and <Collapsible.Root> contains <Collapsible.Panel>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
          <Collapsible.Panel />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not be disabled by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be not disabled when the "disabled" prop is false on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toBeDisabled();
    });

    it('should be not disabled when "disabled" prop is false on <Collapsible.Trigger> even if <Collapsible.Root> is disabled', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger disabled={false} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true on <Collapsible.Trigger> even if <Collapsible.Root> is enabled', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger disabled={true} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('disabled');
    });

    it('should have the "data-closed" attribute with an empty value by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should have the "data-closed" attribute with an empty value when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should not have the "data-closed" attribute when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-closed');
    });

    it('should not have the "data-open" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should have the "data-open" attribute with an empty value when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-open', '');
    });

    it('should not have the "data-open" attribute when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false on <Collapsible.Trigger> even if <Collapsible.Root> is disabled', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Trigger disabled={false} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true on <Collapsible.Trigger> even if <Collapsible.Root> is enabled', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Trigger disabled={true} data-testid={COLLAPSIBLE_TRIGGER_TESTID} />
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
    it('should render a <div> element by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <span> element when the "as" prop is set to "span"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel as="span" data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <span> element when the "as" prop is set to the <Primitive.span> component', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel as={Primitive.span} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
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

    it('should use the provided "id" prop as the element id', async () => {
      const COLLAPSIBLE_PANEL_ID = 'COLLAPSIBLE_PANEL_ID';

      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel id={COLLAPSIBLE_PANEL_ID} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('id', COLLAPSIBLE_PANEL_ID);
    });

    it('should have the hidden="hidden" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have the hidden="hidden" attribute when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should not have the "hidden" attribute when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('hidden');
    });

    it('should have the hidden="hidden" attribute when the collapsible is closed and "hiddenUntilFound" prop is false', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have the hidden="until-found" attribute when the collapsible is closed and "hiddenUntilFound" prop is true', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should have the hidden="hidden" attribute when the collapsible is closed, "hiddenUntilFound" prop is true and "disabled" prop is true on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false} disabled={true}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have the hidden="hidden" attribute when the collapsible is closed, "hiddenUntilFound" prop is false and "disabled" prop is true on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false} disabled={true}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have the hidden="until-found" attribute when the collapsible is closed, "hiddenUntilFound" prop is true and "disabled" prop is false on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false} disabled={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should not have the "aria-labelledby" attribute when <Collapsible.Root> does not contain <Collapsible.Trigger>', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('aria-labelledby');
    });

    it('should have the "aria-labelledby" attribute associated with <Collapsible.Trigger> "id" attribute when <Collapsible.Root> contains <Collapsible.Trigger>', async () => {
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

    it('should have the "data-closed" attribute with an empty value by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should have the "data-closed" attribute with an empty value when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should not have the "data-closed" attribute when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-closed');
    });

    it('should not have the "data-open" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should have the "data-open" attribute with an empty value when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-open', '');
    });

    it('should not have the "data-open" attribute when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should not have the "data-starting-style" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-starting-style');
    });

    it('should not have the "data-ending-style" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-ending-style');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "display: none !important" inline style by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('display: none !important');
    });

    it('should not have the "display" inline style when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should not have the "display" inline style when the collapsible is closed and "hiddenUntilFound" prop is true', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should have the "display: none !important" inline style when the collapsible is closed and "hiddenUntilFound" prop is false', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('display: none !important');
    });

    it('should not have the "animation-name" inline style by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('animation-name');
    });

    it('should not have the "animation-name" inline style when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('animation-name');
    });

    it('should have the "animation-name: none" inline style when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('animation-name: none');
    });

    it('should not have the "transition" inline style by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('transition');
    });

    it('should have the CSS variable set to "none" when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');
    });

    it('should have the CSS variable set to "auto" when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Panel data-testid={COLLAPSIBLE_PANEL_TESTID} />
        </Collapsible.Root>
      );

      await expect
        .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const COLLAPSIBLE_PANEL_STYLE =
        'display: block; transition-duration: 10s; animation-duration: 5s; --entry-ui-qwik-collapsible-panel-height: 100px; background-color: rgb(1, 2, 3); color: rgba(3, 2, 1)';

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
    it('should render a <span> element by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator as="div" data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator as={Primitive.div} data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
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

    it('should have the aria-hidden="true" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have the "data-closed" attribute with an empty value by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should have the "data-closed" attribute with an empty value when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-closed', '');
    });

    it('should not have the "data-closed" attribute when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-closed');
    });

    it('should not have the "data-open" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should have the "data-open" attribute with an empty value when the collapsible is open', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={true}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-open', '');
    });

    it('should not have the "data-open" attribute when the collapsible is closed', async () => {
      const screen = await render(
        <Collapsible.Root defaultOpen={false}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-open');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={false}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true on <Collapsible.Root>', async () => {
      const screen = await render(
        <Collapsible.Root disabled={true}>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "pointer-events: none" inline style by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveStyle('pointer-events: none');
    });

    it('should have the "user-select: none" inline style by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveStyle('user-select: none');
    });

    it('should have the "-webkit-user-select: none" inline style by default', async () => {
      const screen = await render(
        <Collapsible.Root>
          <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
        </Collapsible.Root>
      );

      await expect.element(screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID)).toHaveStyle('-webkit-user-select: none');
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const COLLAPSIBLE_INDICATOR_STYLE =
        'pointer-events: all; user-select: all; -webkit-user-select: all; background-color: rgb(1, 2, 3); color: rgba(3, 2, 1)';

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

  describe('Collapsible integration', () => {
    describe('<Collapsible.Panel> without animation', () => {
      it('should open, update state attributes and styles of all parts and call the "onOpenChangeComplete$" callback with true when the trigger is clicked and the collapsible is closed', async () => {
        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <Collapsible.Panel
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            />
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
        await expect.element(panelElement).toHaveStyle('display: none !important');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        expect(mockConsolLog).toHaveBeenCalledWith(true);
      });

      it('should close, update state attributes and styles of all parts and call the "onOpenChangeComplete$" callback with false when the trigger is clicked and the collapsible is open', async () => {
        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={true} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <Collapsible.Panel
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            />
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).toHaveStyle('animation-name: none');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
        await expect.element(panelElement).toHaveStyle('display: none !important');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        expect(mockConsolLog).toHaveBeenCalledWith(false);
      });

      it('should open and call the "onOpenChangeComplete$" callback with true when the panel content is found by the browser and "hiddenUntilFound" prop is true, then close and call the callback with false when the trigger is clicked', async () => {
        const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <Collapsible.Panel
              hiddenUntilFound={true}
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            >
              {COLLAPSIBLE_PANEL_TEXT}
            </Collapsible.Panel>
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        // We clear the hash first to ensure the browser registers a distinct navigation change.
        // Appending the Text Fragment (`#:~:text=`) simulates a native "find-in-page" search,
        // which forces the browser to automatically fire the `beforematch` event on our panel
        // utilizing the `hidden="until-found"` attribute.
        window.location.hash = '';
        window.location.hash = '#:~:text=' + encodeURIComponent(COLLAPSIBLE_PANEL_TEXT);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).toHaveStyle('animation-name: none');
        await expect.element(panelElement).toHaveStyle('transition: none');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        expect(mockConsolLog).toHaveBeenCalledWith(true);

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).not.toHaveStyle('transition');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        expect(mockConsolLog).toHaveBeenCalledWith(false);
      });
    });

    describe('<Collapsible.Panel> with CSS transition', () => {
      it('should open, update state attributes and styles of all parts and call the "onOpenChangeComplete$" callback with true when the trigger is clicked and the collapsible is closed', async () => {
        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <CollapsiblePanelCssTransition
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            />
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
        await expect.element(panelElement).toHaveStyle('display: none !important');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        expect(mockConsolLog).toHaveBeenCalledWith(true);
      });

      it('should close, update state attributes and styles of all parts and call the "onOpenChangeComplete$" callback with false when the trigger is clicked and the collapsible is open', async () => {
        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={true} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <CollapsiblePanelCssTransition
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            />
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
        await expect.element(panelElement).toHaveStyle('display: none !important');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        expect(mockConsolLog).toHaveBeenCalledWith(false);
      });

      it('should open and call the "onOpenChangeComplete$" callback with true when the panel content is found by the browser and "hiddenUntilFound" prop is true, then close and call the callback with false when the trigger is clicked', async () => {
        const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <CollapsiblePanelCssTransition
              hiddenUntilFound={true}
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            >
              {COLLAPSIBLE_PANEL_TEXT}
            </CollapsiblePanelCssTransition>
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        // We clear the hash first to ensure the browser registers a distinct navigation change.
        // Appending the Text Fragment (`#:~:text=`) simulates a native "find-in-page" search,
        // which forces the browser to automatically fire the `beforematch` event on our panel
        // utilizing the `hidden="until-found"` attribute.
        window.location.hash = '';
        window.location.hash = '#:~:text=' + encodeURIComponent(COLLAPSIBLE_PANEL_TEXT);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).toHaveStyle('animation-name: none');
        await expect.element(panelElement).toHaveStyle('transition: none');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        expect(mockConsolLog).toHaveBeenCalledWith(true);

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).not.toHaveStyle('transition');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        expect(mockConsolLog).toHaveBeenCalledWith(false);
      });
    });

    describe('<Collapsible.Panel> with CSS animation', () => {
      it('should open, update state attributes and styles of all parts and call the "onOpenChangeComplete$" callback with true when the trigger is clicked and the collapsible is closed', async () => {
        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <CollapsiblePanelCssAnimation
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            />
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
        await expect.element(panelElement).toHaveStyle('display: none !important');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        expect(mockConsolLog).toHaveBeenCalledWith(true);
      });

      it('should close, update state attributes and styles of all parts and call the "onOpenChangeComplete$" callback with false when the trigger is clicked and the collapsible is open', async () => {
        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={true} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <CollapsiblePanelCssAnimation
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            />
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
        await expect.element(panelElement).toHaveStyle('display: none !important');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        expect(mockConsolLog).toHaveBeenCalledWith(false);
      });

      it('should open and call the "onOpenChangeComplete$" callback with true when the panel content is found by the browser and "hiddenUntilFound" prop is true, then close and call the callback with false when the trigger is clicked', async () => {
        const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

        // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
        // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
        // complex internal states that throw a serialization error (Code Q3).
        const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        const screen = await render(
          <Collapsible.Root defaultOpen={false} data-testid={COLLAPSIBLE_ROOT_TESTID}>
            <Collapsible.Trigger data-testid={COLLAPSIBLE_TRIGGER_TESTID}>
              <Collapsible.Indicator data-testid={COLLAPSIBLE_INDICATOR_TESTID} />
            </Collapsible.Trigger>
            <CollapsiblePanelCssAnimation
              hiddenUntilFound={true}
              onOpenChangeComplete$={(open) => console.log(open)}
              data-testid={COLLAPSIBLE_PANEL_TESTID}
            >
              {COLLAPSIBLE_PANEL_TEXT}
            </CollapsiblePanelCssAnimation>
          </Collapsible.Root>
        );

        const rootElement = screen.getByTestId(COLLAPSIBLE_ROOT_TESTID);
        const triggerElement = screen.getByTestId(COLLAPSIBLE_TRIGGER_TESTID);
        const indicatorElement = screen.getByTestId(COLLAPSIBLE_INDICATOR_TESTID);
        const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        // We clear the hash first to ensure the browser registers a distinct navigation change.
        // Appending the Text Fragment (`#:~:text=`) simulates a native "find-in-page" search,
        // which forces the browser to automatically fire the `beforematch` event on our panel
        // utilizing the `hidden="until-found"` attribute.
        window.location.hash = '';
        window.location.hash = '#:~:text=' + encodeURIComponent(COLLAPSIBLE_PANEL_TEXT);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-closed');
        await expect.element(rootElement).toHaveAttribute('data-open', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-closed');
        await expect.element(triggerElement).toHaveAttribute('data-open', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-closed');
        await expect.element(indicatorElement).toHaveAttribute('data-open', '');

        await expect.element(panelElement).not.toHaveAttribute('data-closed');
        await expect.element(panelElement).toHaveAttribute('data-open', '');
        await expect.element(panelElement).not.toHaveAttribute('hidden');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).toHaveStyle('animation-name: none');
        await expect.element(panelElement).toHaveStyle('transition: none');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: auto');

        expect(mockConsolLog).toHaveBeenCalledWith(true);

        await userEvent.click(triggerElement);

        await wait(100);

        await expect.element(rootElement).not.toHaveAttribute('data-open');
        await expect.element(rootElement).toHaveAttribute('data-closed', '');

        await expect.element(triggerElement).not.toHaveAttribute('data-open');
        await expect.element(triggerElement).toHaveAttribute('data-closed', '');

        await expect.element(indicatorElement).not.toHaveAttribute('data-open');
        await expect.element(indicatorElement).toHaveAttribute('data-closed', '');

        await expect.element(panelElement).not.toHaveAttribute('data-open');
        await expect.element(panelElement).toHaveAttribute('data-closed', '');
        await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
        await expect.element(panelElement).not.toHaveStyle('display');
        await expect.element(panelElement).not.toHaveStyle('animation-name');
        await expect.element(panelElement).not.toHaveStyle('transition');
        await expect.element(panelElement).toHaveStyle('--entry-ui-qwik-collapsible-panel-height: none');

        expect(mockConsolLog).toHaveBeenCalledWith(false);
      });
    });
  });
});
