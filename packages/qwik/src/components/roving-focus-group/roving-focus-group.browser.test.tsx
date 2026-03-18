import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { Primitive } from '@/_internal/components/primitive';
import { RovingFocusGroup } from '.';

const ROVING_FOCUS_GROUP_ROOT_TESTID = 'ROVING_FOCUS_GROUP_ROOT_TESTID';
const ROVING_FOCUS_GROUP_ITEM_TESTID = 'ROVING_FOCUS_GROUP_ITEM_TESTID';

describe('RovingFocusGroup', () => {
  describe('RovingFocusGroup.Root', () => {
    it('should render a div element by default', async () => {
      const screen = await render(<RovingFocusGroup.Root data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(<RovingFocusGroup.Root as="span" data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(
        <RovingFocusGroup.Root as={Primitive.span} data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ROVING_FOCUS_GROUP_ROOT_TEXT = 'ROVING_FOCUS_GROUP_ROOT_TEXT';

      const screen = await render(
        <RovingFocusGroup.Root>
          <span>{ROVING_FOCUS_GROUP_ROOT_TEXT}</span>
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByText(ROVING_FOCUS_GROUP_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have dir="ltr" by default', async () => {
      const screen = await render(<RovingFocusGroup.Root data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID)).toHaveAttribute('dir', 'ltr');
    });

    it('should have dir="ltr" when "dir" prop is "ltr"', async () => {
      const screen = await render(<RovingFocusGroup.Root dir="ltr" data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID)).toHaveAttribute('dir', 'ltr');
    });

    it('should have dir="rtl" when "dir" prop is "rtl"', async () => {
      const screen = await render(<RovingFocusGroup.Root dir="rtl" data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID)).toHaveAttribute('dir', 'rtl');
    });

    it('should have data-orientation="both" by default', async () => {
      const screen = await render(<RovingFocusGroup.Root data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID))
        .toHaveAttribute('data-orientation', 'both');
    });

    it('should have data-orientation="horizontal" when "orientation" prop is "horizontal"', async () => {
      const screen = await render(
        <RovingFocusGroup.Root orientation="horizontal" data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID))
        .toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have data-orientation="vertical" when "orientation" prop is "vertical"', async () => {
      const screen = await render(
        <RovingFocusGroup.Root orientation="vertical" data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID))
        .toHaveAttribute('data-orientation', 'vertical');
    });

    it('should have data-orientation="both" when "orientation" prop is "both"', async () => {
      const screen = await render(
        <RovingFocusGroup.Root orientation="both" data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID))
        .toHaveAttribute('data-orientation', 'both');
    });

    it('should have the "data-entry-ui-qwik-roving-focus-group-root" attribute with an empty value', async () => {
      const screen = await render(<RovingFocusGroup.Root data-testid={ROVING_FOCUS_GROUP_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-roving-focus-group-root', '');
    });
  });

  describe('RovingFocusGroup.Item', () => {
    it('should render a div element by default', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item as="span" data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item as={Primitive.span} data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ROVING_FOCUS_GROUP_ITEM_TEXT = 'ROVING_FOCUS_GROUP_ITEM_TEXT';

      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item>
            <span>{ROVING_FOCUS_GROUP_ITEM_TEXT}</span>
          </RovingFocusGroup.Item>
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByText(ROVING_FOCUS_GROUP_ITEM_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have tabindex="0" on the first focusable item by default', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID)).toHaveAttribute('tabindex', '0');
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID)).toHaveAttribute('tabindex', '-1');
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID)).toHaveAttribute('tabindex', '-1');
    });

    it('should have tabindex="0" on the item matching the "defaultCurrentTabStopId" prop on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root defaultCurrentTabStopId="item-2">
          <RovingFocusGroup.Item tabStopId="item-1" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item tabStopId="item-2" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item tabStopId="item-3" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID)).toHaveAttribute('tabindex', '-1');
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID)).toHaveAttribute('tabindex', '0');
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID)).toHaveAttribute('tabindex', '-1');
    });

    it('should have "data-active" attribute with an empty value on the active item', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root defaultCurrentTabStopId="item-1">
          <RovingFocusGroup.Item tabStopId="item-1" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item tabStopId="item-2" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID)).toHaveAttribute('data-active', '');
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID)).not.toHaveAttribute('data-active');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "focusable" prop is true', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item focusable={true} data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "focusable" prop is false', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item focusable={false} data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have data-orientation="both" by default', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID))
        .toHaveAttribute('data-orientation', 'both');
    });

    it('should have data-orientation="horizontal" when "orientation" prop is "horizontal" on RovingFocusGroup.Root', async () => {
      const screen = await render(
        <RovingFocusGroup.Root orientation="horizontal">
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID))
        .toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have data-orientation="vertical" when "orientation" prop is "vertical" on RovingFocusGroup.Root', async () => {
      const screen = await render(
        <RovingFocusGroup.Root orientation="vertical">
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID))
        .toHaveAttribute('data-orientation', 'vertical');
    });

    it('should have data-orientation="both" when "orientation" prop is "both" on RovingFocusGroup.Root', async () => {
      const screen = await render(
        <RovingFocusGroup.Root orientation="both">
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );

      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID))
        .toHaveAttribute('data-orientation', 'both');
    });

    it('should update the active item and tabindex on mouse click', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
        </RovingFocusGroup.Root>
      );

      await userEvent.click(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID));

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID)).toHaveAttribute('tabindex', '-1');
      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID)).toHaveAttribute('tabindex', '0');
    });

    it('should not move focus to an item with the "focusable" prop set to false on mouse click', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" focusable={false} data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
        </RovingFocusGroup.Root>
      );

      await userEvent.click(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID));

      await expect.element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID)).not.toHaveFocus();
    });

    it('should navigate through enabled items using ArrowRight, ArrowLeft, ArrowDown, ArrowUp, Home, and End keys when the "orientation" prop is "both" on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root orientation="both">
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" focusable={false} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);
      const item4 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(item4).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[End]');
      await expect.element(item4).toHaveFocus();

      await userEvent.keyboard('[Home]');
      await expect.element(item1).toHaveFocus();
    });

    it('should navigate through enabled items using only ArrowRight and ArrowLeft keys when the "orientation" prop is "horizontal" on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root orientation="horizontal">
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item2 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item2).toHaveFocus();
    });

    it('should navigate through enabled items using only ArrowDown and ArrowUp keys when the "orientation" prop is "vertical" on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root orientation="vertical">
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item2 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(item2).toHaveFocus();
    });

    it('should navigate through enabled items using Arrow keys but not loop focus when the "loopFocus" prop is false on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root loopFocus={false}>
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item2 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item1).toHaveFocus();
    });

    it('should loop focus between enabled items using Arrow keys when the "loopFocus" prop is true on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root loopFocus={true}>
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item2 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item1).toHaveFocus();
    });

    it('should swap ArrowRight and ArrowLeft navigation directions when the "dir" prop is "rtl" on RovingFocusGroup.Root', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_3_TESTID = 'ROVING_FOCUS_GROUP_ITEM_3_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root dir="rtl">
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_3_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item2 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_3_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item2).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item1).toHaveFocus();
    });

    it('should skip items with the "focusable" prop set to false during keyboard navigation', async () => {
      const ROVING_FOCUS_GROUP_ITEM_1_TESTID = 'ROVING_FOCUS_GROUP_ITEM_1_TESTID';
      const ROVING_FOCUS_GROUP_ITEM_2_TESTID = 'ROVING_FOCUS_GROUP_ITEM_2_TESTID';

      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_1_TESTID} />
          <RovingFocusGroup.Item as="button" focusable={false} />
          <RovingFocusGroup.Item as="button" data-testid={ROVING_FOCUS_GROUP_ITEM_2_TESTID} />
        </RovingFocusGroup.Root>
      );

      const item1 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_1_TESTID);
      const item3 = screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_2_TESTID);

      await userEvent.click(item1);
      await expect.element(item1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(item3).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(item1).toHaveFocus();
    });

    it('should have the "data-entry-ui-qwik-roving-focus-group-item" attribute with an empty value', async () => {
      const screen = await render(
        <RovingFocusGroup.Root>
          <RovingFocusGroup.Item data-testid={ROVING_FOCUS_GROUP_ITEM_TESTID} />
        </RovingFocusGroup.Root>
      );
      await expect
        .element(screen.getByTestId(ROVING_FOCUS_GROUP_ITEM_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-roving-focus-group-item', '');
    });
  });
});
