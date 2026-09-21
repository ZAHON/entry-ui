import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { wait } from '@entry-ui/utilities/wait';
import { Primitive } from '@/_internal/components/primitive';
import { CollapsiblePanelTest } from './fixtures/collapsible-panel-test';
import { CollapsiblePanelNoneAnimation } from './fixtures/collapsible-panel-none-animation';
import { CollapsiblePanelCssTransition } from './fixtures/collapsible-panel-css-transition';
import { CollapsiblePanelCssAnimation } from './fixtures/collapsible-panel-css-animation';
import { CollapsiblePanelDisabled } from './fixtures/collapsible-panel-disabled';

const COLLAPSIBLE_PANEL_TESTID = 'COLLAPSIBLE_PANEL_TESTID';
const COLLAPSIBLE_PANEL_TRIGGER_TESTID = 'COLLAPSIBLE_PANEL_TRIGGER_TESTID';

describe('CollapsiblePanel', () => {
  it('should render a <div> element by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLDivElement);
  });

  it('should render as a <span> element when the "as" prop is set to "span"', async () => {
    const screen = await render(<CollapsiblePanelTest as="span" data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should render as a <span> element when the "as" prop is set to the <Primitive.span> component', async () => {
    const screen = await render(<CollapsiblePanelTest as={Primitive.span} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should render child content correctly within the <Slot>', async () => {
    const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

    const screen = await render(
      <CollapsiblePanelTest>
        <span>{COLLAPSIBLE_PANEL_TEXT}</span>
      </CollapsiblePanelTest>
    );

    await expect.element(screen.getByText(COLLAPSIBLE_PANEL_TEXT)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should have the hidden="hidden" attribute by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should have the hidden="hidden" attribute when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should not have the "hidden" attribute when the "open" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest open={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('hidden');
  });

  it('should have the hidden="hidden" attribute when the "open" prop is false and "hiddenUntilFound" prop is false', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'hidden');
  });

  it('should have the hidden="until-found" attribute when the "open" prop is false and "hiddenUntilFound" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('hidden', 'until-found');
  });

  it('should have the hidden="hidden" attribute when the "open" prop is false, "hiddenUntilFound" prop is true and "disabled" prop is true', async () => {
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

  it('should have the hidden="hidden" attribute when the the "open" prop is false, "hiddenUntilFound" prop is false and "disabled" prop is true', async () => {
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

  it('should have the hidden="until-found" attribute when the "open" prop is false, "hiddenUntilFound" prop is true and "disabled" prop is false', async () => {
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

  it('should have the "data-closed" attribute with an empty value by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-closed', '');
  });

  it('should have the "data-closed" attribute with an empty value when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-closed', '');
  });

  it('should not have the "data-closed" attribute when the "open" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest open={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-closed');
  });

  it('should have the "data-open" attribute with an empty value when the "open" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest open={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-open', '');
  });

  it('should not have the "data-open" attribute when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-open');
  });

  it('should not have the "data-starting-style" attribute by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-starting-style');
  });

  it('should not have the "data-ending-style" attribute by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-ending-style');
  });

  it('should not have the "data-disabled" attribute by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
  });

  it('should not have the "data-disabled" attribute when the "disabled" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest disabled={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveAttribute('data-disabled');
  });

  it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest disabled={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveAttribute('data-disabled', '');
  });

  it('should have the "display: none !important" inline style by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('display: none !important');
  });

  it('should not have the "display" inline style when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
  });

  it('should not have the "display" inline style when the "open" prop is false and "hiddenUntilFound" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('display');
  });

  it('should have the "display: none !important" inline style when the "open" prop is false and "hiddenUntilFound" prop is false', async () => {
    const screen = await render(
      <CollapsiblePanelTest open={false} hiddenUntilFound={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('display: none !important');
  });

  it('should not have the "animation-name" inline style by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('animation-name');
  });

  it('should not have the "animation-name" inline style when the "open" prop is false', async () => {
    const screen = await render(<CollapsiblePanelTest open={false} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('animation-name');
  });

  it('should have the "animation-name: none" inline style when the "open" prop is true', async () => {
    const screen = await render(<CollapsiblePanelTest open={true} data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle('animation-name: none');
  });

  it('should not have the "transition" inline style by default', async () => {
    const screen = await render(<CollapsiblePanelTest data-testid={COLLAPSIBLE_PANEL_TESTID} />);
    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).not.toHaveStyle('transition');
  });

  it('should have the CSS variable set to "none" when the "open" prop is false', async () => {
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
      .toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);
  });

  it('should have the CSS variable set to "auto" when the "open" prop is true', async () => {
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

  it('should merge and apply custom inline styles via the "style" prop', async () => {
    const COLLAPSIBLE_PANEL_STYLE =
      'display: block; transition-duration: 10s; animation-duration: 5s; background-color: rgb(1, 2, 3); color: rgba(3, 2, 1)';

    const screen = await render(
      <CollapsiblePanelTest style={COLLAPSIBLE_PANEL_STYLE} data-testid={COLLAPSIBLE_PANEL_TESTID} />
    );

    await expect.element(screen.getByTestId(COLLAPSIBLE_PANEL_TESTID)).toHaveStyle(COLLAPSIBLE_PANEL_STYLE);
  });

  it('should correctly update the "hidden" and "data-disabled" attributes and the "display" inline style when the "disabled" prop changes to true via user interaction, even when the "hiddenUntilFound" prop is true', async () => {
    const screen = await render(
      <CollapsiblePanelDisabled
        hiddenUntilFound={true}
        disabled={false}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).not.toHaveAttribute('data-disabled');
    await expect.element(panelElement).not.toHaveStyle('display');

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-disabled', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
  });

  it('should correctly open the panel and invoke the "onOpenChangeComplete$" callback with true when the animation type is "none"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelNoneAnimation
        open={false}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);
  });

  it('should correctly close the panel and invoke the "onOpenChangeComplete$" callback with false when the animation type is "none"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelNoneAnimation
        open={true}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).toHaveStyle('animation-name: none');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(false);
  });

  it('should correctly open the panel via the "beforematch" event and close it via user interaction when the "hiddenUntilFound" prop is true and the animation type is "none"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';
    const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelNoneAnimation
        open={false}
        hiddenUntilFound={true}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      >
        {COLLAPSIBLE_PANEL_TEXT}
      </CollapsiblePanelNoneAnimation>
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    // We clear the hash first to ensure the browser registers a distinct navigation change.
    // Appending the Text Fragment (`#:~:text=`) simulates a native "find-in-page" search,
    // which forces the browser to automatically fire the `beforematch` event on our panel
    // utilizing the `hidden="until-found"` attribute.
    window.location.hash = '';
    window.location.hash = '#:~:text=' + encodeURIComponent(COLLAPSIBLE_PANEL_TEXT);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).toHaveStyle('animation-name: none');
    await expect.element(panelElement).toHaveStyle('transition: none');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).not.toHaveStyle('transition');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);
  });

  it('should correctly open the panel and invoke the "onOpenChangeComplete$" callback with true when the animation type is "css-transition"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelCssTransition
        open={false}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);
  });

  it('should correctly close the panel and invoke the "onOpenChangeComplete$" callback with false when the animation type is "css-transition"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelCssTransition
        open={true}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).toHaveStyle('animation-name: none');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(false);
  });

  it('should correctly open the panel via the "beforematch" event and close it via user interaction when the "hiddenUntilFound" prop is true and the animation type is "css-transition"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';
    const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelCssTransition
        open={false}
        hiddenUntilFound={true}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      >
        {COLLAPSIBLE_PANEL_TEXT}
      </CollapsiblePanelCssTransition>
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    // We clear the hash first to ensure the browser registers a distinct navigation change.
    // Appending the Text Fragment (`#:~:text=`) simulates a native "find-in-page" search,
    // which forces the browser to automatically fire the `beforematch` event on our panel
    // utilizing the `hidden="until-found"` attribute.
    window.location.hash = '';
    window.location.hash = '#:~:text=' + encodeURIComponent(COLLAPSIBLE_PANEL_TEXT);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).toHaveStyle('animation-name: none');
    await expect.element(panelElement).toHaveStyle('transition: none');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).not.toHaveStyle('transition');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);
  });

  it('should correctly open the panel and invoke the "onOpenChangeComplete$" callback with true when the animation type is "css-animation"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelCssAnimation
        open={false}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);
  });

  it('should correctly close the panel and invoke the "onOpenChangeComplete$" callback with false when the animation type is "css-animation"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelCssAnimation
        open={true}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      />
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).toHaveStyle('animation-name: none');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'hidden');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).toHaveStyle('display: none !important');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(false);
  });

  it('should correctly open the panel via the "beforematch" event and close it via user interaction when the "hiddenUntilFound" prop is true and the animation type is "css-animation"', async () => {
    const COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME = '--collapsible-panel-height';
    const COLLAPSIBLE_PANEL_TEXT = 'COLLAPSIBLE_PANEL_TEXT';

    // We spy on `console.log` instead of using `vi.fn()` directly inside the component prop.
    // Qwik attempts to serialize props, and Vitest mock functions (`vi.fn()`) contain
    // complex internal states that throw a serialization error (Code Q3).
    const mockConsolLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    const screen = await render(
      <CollapsiblePanelCssAnimation
        open={false}
        hiddenUntilFound={true}
        heightVariableName={COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}
        onOpenChangeComplete$={(open) => console.log(open)}
        data-testid={COLLAPSIBLE_PANEL_TESTID}
        triggerDataTestId={COLLAPSIBLE_PANEL_TRIGGER_TESTID}
      >
        {COLLAPSIBLE_PANEL_TEXT}
      </CollapsiblePanelCssAnimation>
    );

    const triggerElement = screen.getByTestId(COLLAPSIBLE_PANEL_TRIGGER_TESTID);
    const panelElement = screen.getByTestId(COLLAPSIBLE_PANEL_TESTID);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    // We clear the hash first to ensure the browser registers a distinct navigation change.
    // Appending the Text Fragment (`#:~:text=`) simulates a native "find-in-page" search,
    // which forces the browser to automatically fire the `beforematch` event on our panel
    // utilizing the `hidden="until-found"` attribute.
    window.location.hash = '';
    window.location.hash = '#:~:text=' + encodeURIComponent(COLLAPSIBLE_PANEL_TEXT);

    await expect.element(panelElement).not.toHaveAttribute('hidden');
    await expect.element(panelElement).toHaveAttribute('data-open');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).toHaveStyle('animation-name: none');
    await expect.element(panelElement).toHaveStyle('transition: none');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: auto`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);

    await userEvent.click(triggerElement);

    await expect.element(panelElement).toHaveAttribute('hidden', 'until-found');
    await expect.element(panelElement).toHaveAttribute('data-closed', '');
    await expect.element(panelElement).not.toHaveStyle('display');
    await expect.element(panelElement).not.toHaveStyle('animation-name');
    await expect.element(panelElement).not.toHaveStyle('transition');
    await expect.element(panelElement).toHaveStyle(`${COLLAPSIBLE_PANEL_HEIGHT_VARIABLE_NAME}: none`);

    await wait(100);
    expect(mockConsolLog).toHaveBeenCalledWith(true);
  });
});
