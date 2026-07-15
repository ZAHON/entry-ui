import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { wait } from '@entry-ui/utilities/wait';
import { Primitive } from '@/_internal/components/primitive';
import { Tabs } from '.';

const TABS_ROOT_TESTID = 'TABS_ROOT_TESTID';
const TABS_LIST_TESTID = 'TABS_LIST_TESTID';
const TABS_TAB_TESTID = 'TABS_TAB_TESTID';
const TABS_PANEL_TESTID = 'TABS_PANEL_TESTID';

describe('Tabs', () => {
  describe('Tabs.Root', () => {
    it('should render a <div> element by default', async () => {
      const screen = await render(<Tabs.Root data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <span> element when the "as" prop is set to "span"', async () => {
      const screen = await render(<Tabs.Root as="span" data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <span> element when the "as" prop is set to the <Primitive.span> component', async () => {
      const screen = await render(<Tabs.Root as={Primitive.span} data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const TABS_ROOT_TEXT = 'TABS_ROOT_TEXT';

      const screen = await render(
        <Tabs.Root>
          <span>{TABS_ROOT_TEXT}</span>
        </Tabs.Root>
      );

      await expect.element(screen.getByText(TABS_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the dir="ltr" attribute by default', async () => {
      const screen = await render(<Tabs.Root data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('dir', 'ltr');
    });

    it('should have the dir="ltr" attribute when "dir" prop is "ltr"', async () => {
      const screen = await render(<Tabs.Root dir="ltr" data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('dir', 'ltr');
    });

    it('should have the dir="rtl" attribute when "dir" prop is "rtl"', async () => {
      const screen = await render(<Tabs.Root dir="rtl" data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('dir', 'rtl');
    });

    it('should have the data-orientation="horizontal" attribute by default', async () => {
      const screen = await render(<Tabs.Root data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="horizontal" attribute when "orientation" prop is "horizontal"', async () => {
      const screen = await render(<Tabs.Root orientation="horizontal" data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="vertical" attribute when "orientation" prop is "vertical"', async () => {
      const screen = await render(<Tabs.Root orientation="vertical" data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should have the "data-entry-ui-qwik-tabs-root" attribute with an empty value', async () => {
      const screen = await render(<Tabs.Root data-testid={TABS_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(TABS_ROOT_TESTID)).toHaveAttribute('data-entry-ui-qwik-tabs-root', '');
    });
  });

  describe('Tabs.List', () => {
    it('should render a <div> element by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );
      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <span> element when the "as" prop is set to "span"', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List as="span" data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );
      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <span> element when the "as" prop is set to the <Primitive.span> component', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List as={Primitive.span} data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );
      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const TABS_LIST_TEXT = 'TABS_LIST_TEXT';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <span>{TABS_LIST_TEXT}</span>
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByText(TABS_LIST_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the role="tablist" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('role', 'tablist');
    });

    it('should have the aria-orientation="horizontal" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have the aria-orientation="horizontal" attribute when the "orientation" prop is "horizontal" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="horizontal">
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have the aria-orientation="vertical" attribute when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should have the data-orientation="horizontal" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="horizontal" attribute when the "orientation" prop is "horizontal" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="horizontal">
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="vertical" attribute when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should have the "data-entry-ui-qwik-tabs-list" attribute with an empty value', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List data-testid={TABS_LIST_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_LIST_TESTID)).toHaveAttribute('data-entry-ui-qwik-tabs-list', '');
    });
  });

  describe('Tabs.Tab', () => {
    it('should render a <button> element by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab as="div" value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab as={Primitive.div} value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const TABS_TAB_TEXT = 'TABS_TAB_TEXT';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1">
              <span>{TABS_TAB_TEXT}</span>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByText(TABS_TAB_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('id');
    });

    it('should have the type="button" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should have the role="tab" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('role', 'tab');
    });

    it('should not be disabled by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).not.toBeDisabled();
    });

    it('should not be disabled when the "disabled" prop is false', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" disabled={false} data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" disabled={true} data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toBeDisabled();
    });

    it('should set the "tabindex" attribute to "0" on the first enabled tab button and "-1" on the rest by default', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" disabled={true} data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await wait(1000);

      await expect.element(screen.getByTestId(TABS_TAB_1_TESTID)).toHaveAttribute('tabindex', '-1');
      await expect.element(screen.getByTestId(TABS_TAB_2_TESTID)).toHaveAttribute('tabindex', '0');
      await expect.element(screen.getByTestId(TABS_TAB_3_TESTID)).toHaveAttribute('tabindex', '-1');
    });

    it('should set the "tabindex" attribute to "0" on the default active tab button based on the "defaultValue" prop on <Tabs.Root>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root defaultValue="tab-3">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_1_TESTID)).toHaveAttribute('tabindex', '-1');
      await expect.element(screen.getByTestId(TABS_TAB_2_TESTID)).toHaveAttribute('tabindex', '-1');
      await expect.element(screen.getByTestId(TABS_TAB_3_TESTID)).toHaveAttribute('tabindex', '0');
    });

    it('should have the aria-selected="false" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('aria-selected', 'false');
    });

    it('should have the aria-selected="false" attribute when the tab is inactive', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('aria-selected', 'false');
    });

    it('should have the aria-selected="true" attribute when the tab is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('aria-selected', 'true');
    });

    it('should have the data-state="inactive" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-state', 'inactive');
    });

    it('should have the data-state="inactive" attribute when the tab is inactive', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-2">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
            <Tabs.Tab value="tab-2" />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-state', 'inactive');
    });

    it('should have the data-state="active" attribute when the tab is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-state', 'active');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" disabled={false} data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" disabled={true} data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have the data-orientation="horizontal" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="horizontal" attribute when the "orientation" prop is "horizontal" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="horizontal">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="vertical" attribute when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should activate the corresponding tab when the user clicks it', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);

      await expect.element(tab1).toHaveAttribute('data-state', 'inactive');
      await expect.element(tab2).toHaveAttribute('data-state', 'inactive');

      await userEvent.click(tab1);

      await expect.element(tab1).toHaveAttribute('data-state', 'active');
      await expect.element(tab2).toHaveAttribute('data-state', 'inactive');

      await userEvent.click(tab2);

      await expect.element(tab1).toHaveAttribute('data-state', 'inactive');
      await expect.element(tab2).toHaveAttribute('data-state', 'active');
    });

    it('should activate the focused tab when the user presses the Enter key and the "activationMode" prop is "manual" on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List activationMode="manual">
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);

      await userEvent.click(tab1);
      await userEvent.keyboard('[ArrowRight]');

      await expect.element(tab2).toHaveFocus();
      await expect.element(tab2).toHaveAttribute('data-state', 'inactive');

      await userEvent.keyboard('[Enter]');

      await expect.element(tab2).toHaveAttribute('data-state', 'active');
    });

    it('should activate the focused tab when the user presses the Space key and the "activationMode" prop is "manual" on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List activationMode="manual">
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);

      await userEvent.click(tab1);
      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab2).toHaveFocus();
      await expect.element(tab2).toHaveAttribute('data-state', 'inactive');

      await userEvent.keyboard('[Space]');
      await expect.element(tab2).toHaveAttribute('data-state', 'active');
    });

    it('should activate the focused tab when it receives focus and the "activationMode" prop is "automatic" on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List activationMode="automatic">
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveAttribute('data-state', 'active');

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab2).toHaveFocus();
      await expect.element(tab2).toHaveAttribute('data-state', 'active');
    });

    it('should not activate the focused tab when it receives focus and the "activationMode" prop is "manual" on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List activationMode="manual">
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveAttribute('data-state', 'active');

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab2).toHaveFocus();
      await expect.element(tab2).toHaveAttribute('data-state', 'inactive');
    });

    it('should navigate focus through enabled tab buttons, skip disabled ones, and loop focus by default when the user presses navigation keys', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" disabled={true} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-4" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab4 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab4).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab4).toHaveFocus();

      await userEvent.keyboard('[End]');
      await expect.element(tab4).toHaveFocus();

      await userEvent.keyboard('[Home]');
      await expect.element(tab1).toHaveFocus();
    });

    it('should navigate focus through enabled tab buttons without looping when the user presses navigation keys and the "loopFocus" prop is false on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List loopFocus={false}>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab1).toHaveFocus();
    });

    it('should navigate focus through enabled tab buttons with looping when the user presses navigation keys and the "loopFocus" prop is true on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List loopFocus={true}>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab3).toHaveFocus();
    });

    it('should navigate focus through enabled tab buttons using ArrowDown and ArrowUp keys when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab2).toHaveFocus();
    });

    it('should not navigate focus using ArrowLeft and ArrowRight keys when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab1).toHaveFocus();
    });

    it('should not navigate focus using ArrowUp and ArrowDown keys when the "orientation" prop is "horizontal" (default) on <Tabs.Root>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab1).toHaveFocus();
    });

    it('should reverse ArrowLeft and ArrowRight navigation when the "dir" prop is "rtl" on <Tabs.Root> and orientation is horizontal', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root dir="rtl">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      // In RTL, ArrowLeft should move to the next tab instead of ArrowRight.
      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowLeft]');
      await expect.element(tab3).toHaveFocus();

      // And ArrowRight should move backwards instead of ArrowLeft.
      await userEvent.keyboard('[ArrowRight]');
      await expect.element(tab2).toHaveFocus();
    });

    it('should not reverse ArrowUp and ArrowDown navigation when the "dir" prop is "rtl" on <Tabs.Root> and orientation is vertical', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root dir="rtl" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      // Direction only affects the horizontal axis, so ArrowDown should still move forward.
      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab2).toHaveFocus();
    });

    it('should move focus to the first and last enabled tab buttons using Home and End keys when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab2);
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[End]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[Home]');
      await expect.element(tab1).toHaveFocus();
    });

    it('should navigate focus through enabled tab buttons, skip disabled ones, and loop focus by default when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" disabled={true} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-4" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab4 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab1);
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab4).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab4).toHaveFocus();
    });

    it('should navigate focus through enabled tab buttons without looping when the "orientation" prop is "vertical" and the "loopFocus" prop is false on <Tabs.List>', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
      const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';

      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.List loopFocus={false}>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      const tab1 = screen.getByTestId(TABS_TAB_1_TESTID);
      const tab2 = screen.getByTestId(TABS_TAB_2_TESTID);
      const tab3 = screen.getByTestId(TABS_TAB_3_TESTID);

      await userEvent.click(tab3);
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowDown]');
      await expect.element(tab3).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab2).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab1).toHaveFocus();

      await userEvent.keyboard('[ArrowUp]');
      await expect.element(tab1).toHaveFocus();
    });

    it('should have the "data-entry-ui-qwik-tabs-tab" attribute with an empty value', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-entry-ui-qwik-tabs-tab', '');
    });
  });

  describe('Tabs.Panel', () => {
    it('should render a <div> element by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <span> element when the "as" prop is set to "span"', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel as="span" value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a <span> element when the "as" prop is set to the <Primitive.span> component', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel as={Primitive.span} value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const TABS_PANEL_TEXT = 'TABS_PANEL_TEXT';

      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1">
            <span>{TABS_PANEL_TEXT}</span>
          </Tabs.Panel>
        </Tabs.Root>
      );

      await expect.element(screen.getByText(TABS_PANEL_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the role="tabpanel" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('role', 'tabpanel');
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('id');
    });

    it('should have the hidden="true" attribute when the panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('hidden', 'true');
    });

    it('should not have the "hidden" attribute when the panel is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).not.toHaveAttribute('hidden');
    });

    it('should have the tabindex="0" attribute when the "containsFocusableContent" prop is false and panel is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1" containsFocusableContent={false} data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('tabindex', '0');
    });

    it('should not have "tabindex" attribute when the "containsFocusableContent" prop is true and panel is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1" containsFocusableContent={true} data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).not.toHaveAttribute('tabindex');
    });

    it('should have the tabindex="-1" when the "containsFocusableContent" prop is false and panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" containsFocusableContent={false} data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('tabindex', '-1');
    });

    it('should have the tabindex="-1" when the "containsFocusableContent" prop is true and panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" containsFocusableContent={true} data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('tabindex', '-1');
    });

    it('should have the data-state="inactive" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-state', 'inactive');
    });

    it('should have the data-state="inactive" attribute when the panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-2">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
          <Tabs.Panel value="tab-2" />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-state', 'inactive');
    });

    it('should have the data-state="active" attribute when the panel is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-state', 'active');
    });

    it('should have the data-orientation="horizontal" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="horizontal" attribute when the "orientation" prop is "horizontal" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="horizontal">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should have the data-orientation="vertical" attribute when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
      const screen = await render(
        <Tabs.Root orientation="vertical">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should have the "display: none !important" inline style when the panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveStyle('display: none !important');
    });

    it('should not have the "display" inline style when the panel is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).not.toHaveStyle('display');
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const TABS_PANEL_STYLE = 'display: block; background-color: rgb(1, 2, 3); color: rgba(3, 2, 1)';

      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel style={TABS_PANEL_STYLE} value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveStyle(TABS_PANEL_STYLE);
    });

    it('should toggle the "hidden" attribute of the panels when their associated tab buttons are clicked', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const TABS_PANEL_1_TESTID = 'TABS_PANEL_1_TESTID';
      const TABS_PANEL_2_TESTID = 'TABS_PANEL_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_1_TESTID} />
          <Tabs.Panel value="tab-2" data-testid={TABS_PANEL_2_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_1_TESTID)).toHaveAttribute('hidden', 'true');
      await expect.element(screen.getByTestId(TABS_PANEL_2_TESTID)).toHaveAttribute('hidden', 'true');

      await userEvent.click(screen.getByTestId(TABS_TAB_1_TESTID));

      await expect.element(screen.getByTestId(TABS_PANEL_1_TESTID)).not.toHaveAttribute('hidden');
      await expect.element(screen.getByTestId(TABS_PANEL_2_TESTID)).toHaveAttribute('hidden', 'true');

      await userEvent.click(screen.getByTestId(TABS_TAB_2_TESTID));

      await expect.element(screen.getByTestId(TABS_PANEL_1_TESTID)).toHaveAttribute('hidden', 'true');
      await expect.element(screen.getByTestId(TABS_PANEL_2_TESTID)).not.toHaveAttribute('hidden');
    });

    it('should update the "data-state" attribute of the panels when their associated tab buttons are clicked', async () => {
      const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
      const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';

      const TABS_PANEL_1_TESTID = 'TABS_PANEL_1_TESTID';
      const TABS_PANEL_2_TESTID = 'TABS_PANEL_2_TESTID';

      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
          </Tabs.List>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_1_TESTID} />
          <Tabs.Panel value="tab-2" data-testid={TABS_PANEL_2_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_1_TESTID)).toHaveAttribute('data-state', 'inactive');
      await expect.element(screen.getByTestId(TABS_PANEL_2_TESTID)).toHaveAttribute('data-state', 'inactive');

      await userEvent.click(screen.getByTestId(TABS_TAB_1_TESTID));

      await expect.element(screen.getByTestId(TABS_PANEL_1_TESTID)).toHaveAttribute('data-state', 'active');
      await expect.element(screen.getByTestId(TABS_PANEL_2_TESTID)).toHaveAttribute('data-state', 'inactive');

      await userEvent.click(screen.getByTestId(TABS_TAB_2_TESTID));

      await expect.element(screen.getByTestId(TABS_PANEL_1_TESTID)).toHaveAttribute('data-state', 'inactive');
      await expect.element(screen.getByTestId(TABS_PANEL_2_TESTID)).toHaveAttribute('data-state', 'active');
    });

    it('should have the "data-entry-ui-qwik-tabs-panel" attribute with an empty value', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-entry-ui-qwik-tabs-panel', '');
    });
  });
});
