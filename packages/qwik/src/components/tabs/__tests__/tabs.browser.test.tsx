import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { wait } from '@entry-ui/utilities/wait';
import { Primitive } from '@/_internal/components/primitive';
import { Tabs } from '..';

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

    it('should have the tabindex="0" attribute when the tab is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('tabindex', '0');
    });

    it('should have the tabindex="-1" attribute when the tab is inactive', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-2">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
            <Tabs.Tab value="tab-2" />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('tabindex', '-1');
    });

    it('should have the tabindex="0" attribute when previous tabs are disabled', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" disabled={true} />
            <Tabs.Tab value="tab-2" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('tabindex', '0');
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

    it('should not have the "data-active" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).not.toHaveAttribute('data-active');
    });

    it('should not have the "data-active" attribute when the tab is inactive', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-2">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
            <Tabs.Tab value="tab-2" />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).not.toHaveAttribute('data-active');
    });

    it('should have the "data-active" attribute with an empty value when the tab is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Tab value="tab-1" data-testid={TABS_TAB_TESTID} />
          </Tabs.List>
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_TAB_TESTID)).toHaveAttribute('data-active', '');
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

    it('should have the hidden="hidden" attribute when the panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
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

    it('should not have the "data-active" attribute by default', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).not.toHaveAttribute('data-active');
    });

    it('should not have the "data-active" attribute when the panel is inactive', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-2">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
          <Tabs.Panel value="tab-2" />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).not.toHaveAttribute('data-active');
    });

    it('should have the "data-active" attribute with an empty value when the panel is active', async () => {
      const screen = await render(
        <Tabs.Root defaultValue="tab-1">
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-active', '');
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

    it('should have the "data-entry-ui-qwik-tabs-panel" attribute with an empty value', async () => {
      const screen = await render(
        <Tabs.Root>
          <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_TESTID} />
        </Tabs.Root>
      );

      await expect.element(screen.getByTestId(TABS_PANEL_TESTID)).toHaveAttribute('data-entry-ui-qwik-tabs-panel', '');
    });
  });

  describe('Tabs integration', () => {
    const TABS_TAB_1_TESTID = 'TABS_TAB_1_TESTID';
    const TABS_PANEL_1_TESTID = 'TABS_PANEL_1_TESTID';

    const TABS_TAB_2_TESTID = 'TABS_TAB_2_TESTID';
    const TABS_PANEL_2_TESTID = 'TABS_PANEL_2_TESTID';

    const TABS_TAB_3_TESTID = 'TABS_TAB_3_TESTID';
    // const TABS_PANEL_3_TESTID = 'TABS_PANEL_3_TESTID';

    const TABS_TAB_4_TESTID = 'TABS_TAB_4_TESTID';
    // const TABS_PANEL_4_TESTID = 'TABS_PANEL_4_TESTID';

    describe('activation modes', () => {
      it('should activate tabs and display corresponding panels when clicked', async () => {
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

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const panel1Element = screen.getByTestId(TABS_PANEL_1_TESTID);

        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const panel2Element = screen.getByTestId(TABS_PANEL_2_TESTID);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.click(tab1Element);
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).toHaveAttribute('data-active', '');
        await expect.element(panel1Element).not.toHaveAttribute('hidden', '');
        await expect.element(panel1Element).not.toHaveStyle('display');
        await expect.element(panel1Element).toHaveAttribute('data-active', '');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.click(tab2Element);
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab2Element).toHaveAttribute('data-active', '');
        await expect.element(panel2Element).not.toHaveAttribute('hidden', '');
        await expect.element(panel2Element).not.toHaveStyle('display');
        await expect.element(panel2Element).toHaveAttribute('data-active', '');
      });

      it('should automatically activate focused tab on arrow key navigation when the "activationMode" prop is "automatic" on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root>
            <Tabs.List activationMode="automatic">
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            </Tabs.List>
            <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_1_TESTID} />
            <Tabs.Panel value="tab-2" data-testid={TABS_PANEL_2_TESTID} />
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const panel1Element = screen.getByTestId(TABS_PANEL_1_TESTID);

        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const panel2Element = screen.getByTestId(TABS_PANEL_2_TESTID);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.click(tab1Element);
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).toHaveAttribute('data-active', '');
        await expect.element(panel1Element).not.toHaveAttribute('hidden', '');
        await expect.element(panel1Element).not.toHaveStyle('display');
        await expect.element(panel1Element).toHaveAttribute('data-active', '');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab1Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveFocus();
        await expect.element(tab2Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab2Element).toHaveAttribute('data-active', '');
        await expect.element(panel2Element).not.toHaveAttribute('hidden');
        await expect.element(panel2Element).not.toHaveStyle('display');
        await expect.element(panel2Element).toHaveAttribute('data-active', '');
      });

      it('should move focus with arrow keys without activating and activate on Enter when the "activationMode" prop is "manual" on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root>
            <Tabs.List activationMode="manual">
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            </Tabs.List>
            <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_1_TESTID} />
            <Tabs.Panel value="tab-2" data-testid={TABS_PANEL_2_TESTID} />
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const panel1Element = screen.getByTestId(TABS_PANEL_1_TESTID);

        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const panel2Element = screen.getByTestId(TABS_PANEL_2_TESTID);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.click(tab1Element);
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).toHaveAttribute('data-active', '');
        await expect.element(panel1Element).not.toHaveAttribute('hidden', '');
        await expect.element(panel1Element).not.toHaveStyle('display');
        await expect.element(panel1Element).toHaveAttribute('data-active', '');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab1Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab1Element).toHaveAttribute('data-active', '');
        await expect.element(panel1Element).not.toHaveAttribute('hidden');
        await expect.element(panel1Element).not.toHaveStyle('display');
        await expect.element(panel1Element).toHaveAttribute('data-active', '');

        await expect.element(tab2Element).toHaveFocus();
        await expect.element(tab2Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.keyboard('[Enter]');
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab2Element).toHaveAttribute('data-active', '');
        await expect.element(panel2Element).not.toHaveAttribute('hidden');
        await expect.element(panel2Element).not.toHaveStyle('display');
        await expect.element(panel2Element).toHaveAttribute('data-active', '');
      });

      it('should move focus with arrow keys without activating and activate on Space when the "activationMode" prop is "manual" on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root>
            <Tabs.List activationMode="manual">
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            </Tabs.List>
            <Tabs.Panel value="tab-1" data-testid={TABS_PANEL_1_TESTID} />
            <Tabs.Panel value="tab-2" data-testid={TABS_PANEL_2_TESTID} />
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const panel1Element = screen.getByTestId(TABS_PANEL_1_TESTID);

        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const panel2Element = screen.getByTestId(TABS_PANEL_2_TESTID);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.click(tab1Element);
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab1Element).toHaveAttribute('data-active', '');
        await expect.element(panel1Element).not.toHaveAttribute('hidden', '');
        await expect.element(panel1Element).not.toHaveStyle('display');
        await expect.element(panel1Element).toHaveAttribute('data-active', '');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab1Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab1Element).toHaveAttribute('data-active', '');
        await expect.element(panel1Element).not.toHaveAttribute('hidden');
        await expect.element(panel1Element).not.toHaveStyle('display');
        await expect.element(panel1Element).toHaveAttribute('data-active', '');

        await expect.element(tab2Element).toHaveFocus();
        await expect.element(tab2Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab2Element).not.toHaveAttribute('data-active');
        await expect.element(panel2Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel2Element).toHaveStyle('display: none !important');
        await expect.element(panel2Element).not.toHaveAttribute('data-active');

        await userEvent.keyboard('[Space]');
        await wait(100);

        await expect.element(tab1Element).toHaveAttribute('tabindex', '-1');
        await expect.element(tab1Element).not.toHaveAttribute('data-active');
        await expect.element(panel1Element).toHaveAttribute('hidden', 'hidden');
        await expect.element(panel1Element).toHaveStyle('display: none !important');
        await expect.element(panel1Element).not.toHaveAttribute('data-active');

        await expect.element(tab2Element).toHaveAttribute('tabindex', '0');
        await expect.element(tab2Element).toHaveAttribute('data-active', '');
        await expect.element(panel2Element).not.toHaveAttribute('hidden');
        await expect.element(panel2Element).not.toHaveStyle('display');
        await expect.element(panel2Element).toHaveAttribute('data-active', '');
      });
    });

    describe('keyboard navigation', () => {
      it('should ignore ArrowUp and ArrowDown keys when the "orientation" prop is "horizontal" on <Tabs.Root>', async () => {
        const screen = await render(
          <Tabs.Root orientation="horizontal">
            <Tabs.List>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "horizontal" on <Tabs.Root>, the "dir" prop is "ltr" on <Tabs.Root>, and the "loopFocus" prop is false on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="horizontal" dir="ltr">
            <Tabs.List loopFocus={false}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "horizontal" on <Tabs.Root>, the "dir" prop is "ltr" on <Tabs.Root>, and the "loopFocus" prop is true on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="horizontal" dir="ltr">
            <Tabs.List loopFocus={true}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "horizontal" on <Tabs.Root>, the "dir" prop is "rtl" on <Tabs.Root>, and the "loopFocus" prop is false on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="horizontal" dir="rtl">
            <Tabs.List loopFocus={false}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "horizontal" on <Tabs.Root>, the "dir" prop is "rtl" on <Tabs.Root>, and the "loopFocus" prop is true on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="horizontal" dir="rtl">
            <Tabs.List loopFocus={true}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();
      });

      it('should ignore ArrowLeft and ArrowRight keys when the "orientation" prop is "vertical" on <Tabs.Root>', async () => {
        const screen = await render(
          <Tabs.Root orientation="vertical">
            <Tabs.List>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" data-testid={TABS_TAB_2_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowLeft]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowRight]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "vertical" on <Tabs.Root>, the "dir" prop is "ltr" on <Tabs.Root>, and the "loopFocus" prop is false on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="vertical" dir="ltr">
            <Tabs.List loopFocus={false}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "vertical" on <Tabs.Root>, the "dir" prop is "ltr" on <Tabs.Root>, and the "loopFocus" prop is true on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="vertical" dir="ltr">
            <Tabs.List loopFocus={true}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "vertical" on <Tabs.Root>, the "dir" prop is "rtl" on <Tabs.Root>, and the "loopFocus" prop is false on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="vertical" dir="rtl">
            <Tabs.List loopFocus={false}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();
      });

      it('should navigate focus when the "orientation" prop is "vertical" on <Tabs.Root>, the "dir" prop is "rtl" on <Tabs.Root>, and the "loopFocus" prop is true on <Tabs.List>', async () => {
        const screen = await render(
          <Tabs.Root orientation="vertical" dir="rtl">
            <Tabs.List loopFocus={true}>
              <Tabs.Tab value="tab-1" data-testid={TABS_TAB_1_TESTID} />
              <Tabs.Tab value="tab-2" disabled={true} data-testid={TABS_TAB_2_TESTID} />
              <Tabs.Tab value="tab-3" data-testid={TABS_TAB_3_TESTID} />
              <Tabs.Tab value="tab-4" data-testid={TABS_TAB_4_TESTID} />
            </Tabs.List>
          </Tabs.Root>
        );

        const tab1Element = screen.getByTestId(TABS_TAB_1_TESTID);
        const tab2Element = screen.getByTestId(TABS_TAB_2_TESTID);
        const tab3Element = screen.getByTestId(TABS_TAB_3_TESTID);
        const tab4Element = screen.getByTestId(TABS_TAB_4_TESTID);

        await userEvent.click(tab1Element);
        await wait(100);

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[ArrowDown]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[ArrowUp]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();

        await userEvent.keyboard('[Home]');
        await wait(100);

        await expect.element(tab1Element).toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).not.toHaveFocus();

        await userEvent.keyboard('[End]');
        await wait(100);

        await expect.element(tab1Element).not.toHaveFocus();
        await expect.element(tab2Element).not.toHaveFocus();
        await expect.element(tab3Element).not.toHaveFocus();
        await expect.element(tab4Element).toHaveFocus();
      });
    });
  });
});
