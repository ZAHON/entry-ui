import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { Primitive } from '@/_internal/components/primitive';
import { Accordion } from '.';

const ACCORDION_ROOT_TESTID = 'ACCORDION_ROOT_TESTID';
const ACCORDION_ITEM_TESTID = 'ACCORDION_ITEM_TESTID';
const ACCORDION_ITEM_HEADER_TESTID = 'ACCORDION_ITEM_HEADER_TESTID';
const ACCORDION_ITEM_TRIGGER_TESTID = 'ACCORDION_ITEM_TRIGGER_TESTID';
const ACCORDION_ITEM_PANEL_TESTID = 'ACCORDION_ITEM_PANEL_TESTID';
const ACCORDION_ITEM_INDICATOR_TESTID = 'ACCORDION_ITEM_INDICATOR_TESTID';

describe('Accordion', () => {
  describe('Accordion.Root', () => {
    it('should render a div element by default', async () => {
      const screen = await render(<Accordion.Root data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(<Accordion.Root as="span" data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(<Accordion.Root as={Primitive.span} data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ACCORDION_ROOT_TEXT = 'ACCORDION_ROOT_TEXT';

      const screen = await render(
        <Accordion.Root>
          <span>{ACCORDION_ROOT_TEXT}</span>
        </Accordion.Root>
      );

      await expect.element(screen.getByText(ACCORDION_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(<Accordion.Root data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(<Accordion.Root disabled={false} data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(<Accordion.Root disabled={true} data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should navigate through enabled triggers using Arrow keys, Home, and End with focus looping by default', async () => {
      const ACCORDION_ITEM_TRIGGER_2_TESTID = 'ACCORDION_ITEM_TRIGGER_2_TESTID';
      const ACCORDION_ITEM_TRIGGER_3_TESTID = 'ACCORDION_ITEM_TRIGGER_3_TESTID';
      const ACCORDION_ITEM_TRIGGER_4_TESTID = 'ACCORDION_ITEM_TRIGGER_4_TESTID';

      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger disabled={true} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_2_TESTID} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_3_TESTID} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_4_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      const itemTrigger2 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_2_TESTID);
      const itemTrigger3 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_3_TESTID);
      const itemTrigger4 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_4_TESTID);

      await userEvent.click(itemTrigger2);
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger3).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[End]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[Home]');
      await expect.element(itemTrigger2).toHaveFocus();
    });

    it('should navigate through triggers using Arrow keys but not loop focus when "loopFocus" prop is false', async () => {
      const ACCORDION_ITEM_TRIGGER_2_TESTID = 'ACCORDION_ITEM_TRIGGER_2_TESTID';
      const ACCORDION_ITEM_TRIGGER_3_TESTID = 'ACCORDION_ITEM_TRIGGER_3_TESTID';
      const ACCORDION_ITEM_TRIGGER_4_TESTID = 'ACCORDION_ITEM_TRIGGER_4_TESTID';

      const screen = await render(
        <Accordion.Root loopFocus={false}>
          <Accordion.Item>
            <Accordion.ItemTrigger disabled={true} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_2_TESTID} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_3_TESTID} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_4_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      const itemTrigger2 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_2_TESTID);
      const itemTrigger3 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_3_TESTID);
      const itemTrigger4 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_4_TESTID);

      await userEvent.click(itemTrigger2);
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger3).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger2).toHaveFocus();
    });

    it('should loop focus between enabled triggers using Arrow keys when "loopFocus" prop is true', async () => {
      const ACCORDION_ITEM_TRIGGER_2_TESTID = 'ACCORDION_ITEM_TRIGGER_2_TESTID';
      const ACCORDION_ITEM_TRIGGER_3_TESTID = 'ACCORDION_ITEM_TRIGGER_3_TESTID';
      const ACCORDION_ITEM_TRIGGER_4_TESTID = 'ACCORDION_ITEM_TRIGGER_4_TESTID';

      const screen = await render(
        <Accordion.Root loopFocus={true}>
          <Accordion.Item>
            <Accordion.ItemTrigger disabled={true} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_2_TESTID} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_3_TESTID} />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_4_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      const itemTrigger2 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_2_TESTID);
      const itemTrigger3 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_3_TESTID);
      const itemTrigger4 = screen.getByTestId(ACCORDION_ITEM_TRIGGER_4_TESTID);

      await userEvent.click(itemTrigger2);
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger3).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(itemTrigger2).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger4).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(itemTrigger2).toHaveFocus();
    });

    it('should have style="contain: layout style"', async () => {
      const screen = await render(<Accordion.Root data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).toHaveStyle({ contain: 'layout style' });
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const ACCORDION_ROOT_STYLE = { backgroundColor: 'rgb(1, 2, 3)', color: 'rgba(3, 2, 1)' };

      const screen = await render(<Accordion.Root style={ACCORDION_ROOT_STYLE} data-testid={ACCORDION_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(ACCORDION_ROOT_TESTID)).toHaveStyle(ACCORDION_ROOT_STYLE);
    });

    it('should have the "data-entry-ui-qwik-accordion-root" attribute with an empty value', async () => {
      const screen = await render(<Accordion.Root data-testid={ACCORDION_ROOT_TESTID} />);
      await expect
        .element(screen.getByTestId(ACCORDION_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-accordion-root', '');
    });
  });

  describe('Accordion.Item', () => {
    it('should render a div element by default', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item as="span" data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item as={Primitive.span} data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ACCORDION_ITEM_TEXT = 'ACCORDION_ITEM_TEXT';

      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <span>{ACCORDION_ITEM_TEXT}</span>
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByText(ACCORDION_ITEM_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have data-state="closed" by default', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when its value is not provided in "defaultValue" prop on Accordion.Root', async () => {
      const screen = await render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when its value is provided in "defaultValue" prop on Accordion.Root', async () => {
      const screen = await render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item" data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when "disabled" prop is false', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item disabled={false} data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when "disabled" prop is true', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item disabled={true} data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false on Accordion.Root', async () => {
      const screen = await render(
        <Accordion.Root disabled={false}>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true on Accordion.Root', async () => {
      const screen = await render(
        <Accordion.Root disabled={true}>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have "data-disabled" attribute when its "disabled" prop is false but Accordion.Root is disabled', async () => {
      const screen = await render(
        <Accordion.Root disabled={true}>
          <Accordion.Item disabled={false} data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have "data-disabled" attribute when its "disabled" prop is true even if Accordion.Root is enabled', async () => {
      const screen = await render(
        <Accordion.Root disabled={false}>
          <Accordion.Item disabled={true} data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "data-entry-ui-qwik-accordion-item" attribute with an empty value', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item data-testid={ACCORDION_ITEM_TESTID} />
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-accordion-item', '');
    });
  });

  describe('Accordion.ItemHeader', () => {
    it('should render an h3 element by default', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toContainHTML('<h3');
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader as="div" data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader as={Primitive.div} data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ACCORDION_ITEM_HEADER_TEXT = 'ACCORDION_ITEM_HEADER_TEXT';

      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader>
              <span>{ACCORDION_ITEM_HEADER_TEXT}</span>
            </Accordion.ItemHeader>
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByText(ACCORDION_ITEM_HEADER_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have data-state="closed" by default', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when Accordion.Item is closed', async () => {
      const screen = await render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when Accordion.Item is open', async () => {
      const screen = await render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when Accordion.Item is enabled', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item disabled={false}>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the Accordion.Item is disabled', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item disabled={true}>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "data-entry-ui-qwik-accordion-item-header" attribute with an empty value', async () => {
      const screen = await render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemHeader data-testid={ACCORDION_ITEM_HEADER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_HEADER_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-accordion-item-header', '');
    });
  });

  describe('Accordion.ItemTrigger', () => {
    it('should render a button element by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger as="div" data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger as={Primitive.div} data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ACCORDION_ITEM_TRIGGER_TEXT = 'ACCORDION_ITEM_TRIGGER_TEXT';

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger>
              <span>{ACCORDION_ITEM_TRIGGER_TEXT}</span>
            </Accordion.ItemTrigger>
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByText(ACCORDION_ITEM_TRIGGER_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have type="button" by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should have a generated id by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id even when the "id" prop is undefined', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger id={undefined} data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id when an empty string is provided as "id" prop', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger id=" " data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const ACCORDION_ITEM_TRIGGER_ID = 'ACCORDION_ITEM_TRIGGER_ID';

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger id={ACCORDION_ITEM_TRIGGER_ID} data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID))
        .toHaveAttribute('id', ACCORDION_ITEM_TRIGGER_ID);
    });

    it('should not be disabled by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be not disabled when the "disabled" prop is false on Accordion.Item', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={false}>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true on Accordion.Item', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={true}>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toBeDisabled();
    });

    it('should be not disabled when "disabled" prop is false even if Accordion.Item is disabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={true}>
            <Accordion.ItemTrigger disabled={false} data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true even if Accordion.Item is enabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={false}>
            <Accordion.ItemTrigger disabled={true} data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toBeDisabled();
    });

    it('should not have "aria-controls" attribute when the Accordion.Item is closed and not contains Accordion.ItemPanel', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have "aria-controls" attribute when the Accordion.Item is closed and contains Accordion.ItemPanel', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            <Accordion.ItemPanel />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have "aria-controls" attribute when the Accordion.Item is open and not contains Accordion.ItemPanel', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should have "aria-controls" attribute associated with Accordion.ItemPanel "id" attribute when the Accordion.Item is open and contains Accordion.ItemPanel', async () => {
      const ACCORDION_ITEM_PANEL_ID = 'ACCORDION_ITEM_PANEL_ID';

      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            <Accordion.ItemPanel id={ACCORDION_ITEM_PANEL_ID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID))
        .toHaveAttribute('aria-controls', ACCORDION_ITEM_PANEL_ID);
    });

    it('should not have "aria-expanded" attribute when Accordion.Item not contains Accordion.ItemPanel', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toHaveAttribute('aria-expanded');
    });

    it('should have aria-expanded="false" when the Accordion.Item is closed and contains Accordion.ItemPanel', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            <Accordion.ItemPanel />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when the Accordion.Item is open and contains Accordion.ItemPanel', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            <Accordion.ItemPanel />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have data-state="closed" by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when Accordion.Item is enabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={false}>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when Accordion.Item is disabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={true}>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the "data-entry-ui-qwik-accordion-item-trigger" attribute with an empty value', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-accordion-item-trigger', '');
    });
  });

  describe('Accordion.ItemPanel', () => {
    it('should render a div element by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a span when the "as" prop is set to "span"', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel as="span" data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a span when the "as" prop is a Primitive.span component', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel as={Primitive.span} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const ACCORDION_ITEM_PANEL_TEXT = 'ACCORDION_ITEM_PANEL_TEXT';

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel>
              <span>{ACCORDION_ITEM_PANEL_TEXT}</span>
            </Accordion.ItemPanel>
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByText(ACCORDION_ITEM_PANEL_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have a generated id by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id even when the "id" prop is undefined', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel id={undefined} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should have a generated id when an empty string is provided as "id" prop', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel id=" " data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const ACCORDION_ITEM_PANEL_ID = 'ACCORDION_ITEM_PANEL_ID';

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel id={ACCORDION_ITEM_PANEL_ID} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveAttribute('id', ACCORDION_ITEM_PANEL_ID);
    });

    it('should not have "role" attribute when Accordion.Item not contains Accordion.ItemTrigger', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveAttribute('role');
    });

    it('should not have role="region" when Accordion.Item contains Accordion.ItemTrigger', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger />
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('role', 'region');
    });

    it('should not have "hidden" attribute when Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveAttribute('hidden');
    });

    it('should have hidden="hidden" when Accordion.Item is closed by default', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have hidden="hidden" when Accordion.Item is closed and "hiddenUntilFound" is false', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={false} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have hidden="until-found" when Accordion.Item is closed and "hiddenUntilFound" is true', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={true} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should have hidden="hidden" when Accordion.Item is closed and "hiddenUntilFound" prop is false on Accordion.Root', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]} hiddenUntilFound={false}>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
    });

    it('should have hidden="until-found" when Accordion.Item is closed and "hiddenUntilFound" prop is true on Accordion.Root', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]} hiddenUntilFound={true}>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should have hidden="until-found" when "hiddenUntilFound" is false but true on Accordion.Root and Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]} hiddenUntilFound={true}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={false} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should have hidden="until-found" when "hiddenUntilFound" is true even if false on Accordion.Root and Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]} hiddenUntilFound={false}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={true} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
    });

    it('should not have "aria-labelledby" attribute when Accordion.Item not contains Accordion.ItemTrigger', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveAttribute('aria-labelledby');
    });

    it('should have "aria-labelledby" attribute associated with Accordion.ItemTrigger "id" attribute when Accordion.Item contains Accordion.ItemTrigger', async () => {
      const ACCORDION_ITEM_TRIGGER_ID = 'ACCORDION_ITEM_TRIGGER_ID';

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger id={ACCORDION_ITEM_TRIGGER_ID} />
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveAttribute('aria-labelledby', ACCORDION_ITEM_TRIGGER_ID);
    });

    it('should have data-state="closed" by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when Accordion.Item is enabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={false}>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when Accordion.Item is disabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={true}>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should not have any inline "display" style when Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should not have any inline "display" style when Accordion.Item is closed and "hiddenUntilFound" is true', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={true} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should have style="display: none !important" when Accordion.Item is closed and "hiddenUntilFound" is false', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={false} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveStyle('display: none !important');
    });

    it('should temporarily disable animations on initial mount and re-enable them after the first interaction when the Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      const itemTriggerElement = screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID);
      const itemPanelElement = screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID);

      await expect.element(itemPanelElement).toHaveStyle({ transitionDuration: '0s' });
      await expect.element(itemPanelElement).toHaveStyle({ animationDuration: '0s' });

      await userEvent.click(itemTriggerElement);

      await expect.element(itemPanelElement).not.toHaveStyle('transition-duration');
      await expect.element(itemPanelElement).not.toHaveStyle('animation-duration');

      await userEvent.click(itemTriggerElement);

      await expect.element(itemPanelElement).not.toHaveStyle('transition-duration');
      await expect.element(itemPanelElement).not.toHaveStyle('animation-duration');
    });

    it('should temporarily disable animations on initial mount and re-enable them after the first interaction when the Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      const itemTriggerElement = screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID);
      const itemPanelElement = screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID);

      await expect.element(itemPanelElement).toHaveStyle({ transitionDuration: '0s' });
      await expect.element(itemPanelElement).toHaveStyle({ animationDuration: '0s' });

      await userEvent.click(itemTriggerElement);

      await expect.element(itemPanelElement).not.toHaveStyle('transition-duration');
      await expect.element(itemPanelElement).not.toHaveStyle('animation-duration');

      await userEvent.click(itemTriggerElement);

      await expect.element(itemPanelElement).not.toHaveStyle('transition-duration');
      await expect.element(itemPanelElement).not.toHaveStyle('animation-duration');
    });

    it('should have style="--entry-ui-qwik-accordion-item-panel-height: 0px" when "hiddenUntilFound" is false and Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={false} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-accordion-item-panel-height: 0px');
    });

    it('should have style="--entry-ui-qwik-accordion-item-panel-height: auto" when "hiddenUntilFound" is false and Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemPanel hiddenUntilFound={false} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-accordion-item-panel-height: auto');
    });

    it('should have style="--entry-ui-qwik-accordion-item-panel-height: none" when "hiddenUntilFound" is true and Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemPanel hiddenUntilFound={true} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-accordion-item-panel-height: none');
    });

    it('should have style="--entry-ui-qwik-accordion-item-panel-height: auto" when "hiddenUntilFound" is true and Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemPanel hiddenUntilFound={true} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveStyle('--entry-ui-qwik-accordion-item-panel-height: auto');
    });

    it('should call "onOpenChangeComplete$" with the correct state when the panel is opened and closed', async () => {
      const handleOpenChangeComplete$ = vi.fn();

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemTrigger data-testid={ACCORDION_ITEM_TRIGGER_TESTID} />
            {/* eslint-disable-next-line qwik/valid-lexical-scope */}
            <Accordion.ItemPanel onOpenChangeComplete$={handleOpenChangeComplete$} />
          </Accordion.Item>
        </Accordion.Root>
      );

      const itemTriggerElement = screen.getByTestId(ACCORDION_ITEM_TRIGGER_TESTID);

      await userEvent.click(itemTriggerElement);
      expect(handleOpenChangeComplete$).toHaveBeenCalledWith(true);

      await userEvent.click(itemTriggerElement);
      expect(handleOpenChangeComplete$).toHaveBeenCalledWith(false);
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const ACCORDION_ITEM_PANEL_STYLE = { backgroundColor: 'rgb(1, 2, 3)', color: 'rgba(3, 2, 1)' };

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel style={ACCORDION_ITEM_PANEL_STYLE} data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID)).toHaveStyle(ACCORDION_ITEM_PANEL_STYLE);
    });

    it('should have the "data-entry-ui-qwik-accordion-item-panel" attribute with an empty value', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemPanel data-testid={ACCORDION_ITEM_PANEL_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_PANEL_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-accordion-item-panel', '');
    });
  });

  describe('Accordion.ItemIndicator', () => {
    it('should render a span element by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator as="div" data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator as={Primitive.div} data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render a span element by default', async () => {
      const ACCORDION_ITEM_INDICATOR_TEXT = 'ACCORDION_ITEM_INDICATOR_TEXT';

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator>
              <div>{ACCORDION_ITEM_INDICATOR_TEXT}</div>
            </Accordion.ItemIndicator>
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByText(ACCORDION_ITEM_INDICATOR_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have aria-hidden="true" by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have data-state="closed" by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="closed" when Accordion.Item is closed', async () => {
      const screen = render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have data-state="open" when Accordion.Item is open', async () => {
      const screen = render(
        <Accordion.Root defaultValue={['item']}>
          <Accordion.Item value="item">
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when Accordion.Item is enabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={false}>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when Accordion.Item is disabled', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item disabled={true}>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have style="pointer-events: none"', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveStyle({ pointerEvents: 'none' });
    });

    it('should have style="user-select: none"', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect.element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID)).toHaveStyle({ userSelect: 'none' });
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const ACCORDION_ITEM_INDICATOR_STYLE = { backgroundColor: 'rgb(1, 2, 3)', color: 'rgba(3, 2, 1)' };

      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator
              style={ACCORDION_ITEM_INDICATOR_STYLE}
              data-testid={ACCORDION_ITEM_INDICATOR_TESTID}
            />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID))
        .toHaveStyle(ACCORDION_ITEM_INDICATOR_STYLE);
    });

    it('should have the "data-entry-ui-qwik-accordion-item-indicator" attribute with an empty value', async () => {
      const screen = render(
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.ItemIndicator data-testid={ACCORDION_ITEM_INDICATOR_TESTID} />
          </Accordion.Item>
        </Accordion.Root>
      );

      await expect
        .element(screen.getByTestId(ACCORDION_ITEM_INDICATOR_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-accordion-item-indicator', '');
    });
  });
});
