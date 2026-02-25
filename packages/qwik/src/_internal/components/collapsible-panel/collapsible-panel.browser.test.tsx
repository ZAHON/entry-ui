import type { CollapsiblePanelProps } from '.';
import { component$, Slot } from '@qwik.dev/core';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Primitive } from '@/_internal/components/primitive';
import { CollapsiblePanel } from '.';

const COLLAPSIBLE_PANEL_TESTID = 'COLLAPSIBLE_PANEL_TESTID';

const CollapsiblePanelTest = component$<Partial<CollapsiblePanelProps>>((props) => {
  return (
    <CollapsiblePanel componentName="CollapsiblePanel" heightVariableName="--collapsible-panel-height" {...props}>
      <Slot />
    </CollapsiblePanel>
  );
});

describe('CollapsiblePanel', () => {
  it('should render a div element by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLDivElement);
  });

  it('should render as a span when the "as" prop is set to "span"', async () => {
    const screen = await render(<CollapsiblePanelTest as="span" data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should render as a span when the "as" prop is a Primitive.span component', async () => {
    const screen = await render(<CollapsiblePanelTest as={Primitive.span} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should render child content correctly within the Slot', async () => {
    const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

    const screen = await render(
      <CollapsiblePanelTest>
        <span>{COLLAPSIBLE_PANEL_TEXT}</span>
      </CollapsiblePanelTest>
    );

    await expect.element(screen.getByText(COLLAPSIBLE_PANEL_TEXT)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should not have "hidden" attribute when the "open" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest open={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('hidden');
  });

  it('should have hidden="hidden" by default when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should have hidden="hidden" when the "open" prop is false and "hiddenUntilFound" prop is false', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should have hidden="until-found" when the "open" prop is false and "hiddenUntilFound" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
  });

  it('should have hidden="hidden" when the "open" prop is false, "hiddenUntilFound" prop is true and "disabled" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelTest
        open={false}
        hiddenUntilFound={true}
        disabled={true}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should have hidden="hidden" when the the "open" prop is false, "hiddenUntilFound" prop is false and "disabled" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelTest
        open={false}
        hiddenUntilFound={false}
        disabled={true}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should have hidden="until-found" when the "open" prop is false, "hiddenUntilFound" prop is true and "disabled" prop is false', async () => {
    const screen = await render(
      <CollapsiblePanelTest
        open={false}
        hiddenUntilFound={true}
        disabled={false}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
  });

  it('should have data-state="closed" by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-state', 'closed');
  });

  it('should have data-state="closed" when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-state', 'closed');
  });

  it('should have data-state="open" when the "open" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest open={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-state', 'open');
  });

  it('should not have "data-disabled" attribute by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
  });

  it('should not have "data-disabled" when the "disabled" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest disabled={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
  });

  it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest disabled={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-disabled', '');
  });

  it('should not have any inline "display" style when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
  });

  it('should not have any inline "display" style when the "open" prop is false and "hiddenUntilFound" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
  });

  it('should have style="display: none !important" when the "open" prop is false and "hiddenUntilFound" prop is false', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('display: none !important');
  });

  it('should have style="transition-duration: 0s" by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('transition-duration: 0s');
  });

  it('should have style="animation-duration: 0s" by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('animation-duration: 0s');
  });

  it('should have CSS variable set to "0px" by default when the "open" prop is false', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    const screen = await render(
      <CollapsiblePanelTest
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        open={false}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect
      .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: 0px`);
  });

  it('should have CSS variable set to "auto" by default when the "open" prop is true', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    const screen = await render(
      <CollapsiblePanelTest
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        open={true}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect
      .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);
  });

  it('should have CSS variable set to "0px" when the "open" prop is false and "hiddenUntilFound" prop is false', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    const screen = await render(
      <CollapsiblePanelTest
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        open={false}
        hiddenUntilFound={false}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect
      .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: 0px`);
  });

  it('should have CSS variable set to "auto" when the "open" prop is true and "hiddenUntilFound" prop is false', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    const screen = await render(
      <CollapsiblePanelTest
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        open={true}
        hiddenUntilFound={false}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect
      .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);
  });

  it('should have CSS variable set to "none" when the "open" prop is false and "hiddenUntilFound" prop is true', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    const screen = await render(
      <CollapsiblePanelTest
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        open={false}
        hiddenUntilFound={true}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect
      .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);
  });

  it('should have CSS variable set to "auto" when the "open" prop is true and "hiddenUntilFound" prop is true', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    const screen = await render(
      <CollapsiblePanelTest
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        open={true}
        hiddenUntilFound={true}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
      />
    );

    await expect
      .element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID))
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);
  });

  it('should merge and apply custom inline styles via the "style" prop', async () => {
    const COLLAPSIBLE_PANEL_STYLE =
      'display: block; transition-duration: 10s; animation-duration: 5s; background-color: rgb(1, 2, 3); color: rgba(3, 2, 1)';

    const screen = await render(
      <CollapsiblePanelTest style={COLLAPSIBLE_PANEL_STYLE} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle(COLLAPSIBLE_PANEL_STYLE);
  });
});
