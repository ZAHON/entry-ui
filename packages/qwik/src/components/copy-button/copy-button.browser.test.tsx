import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { wait } from '@entry-ui/utilities/wait';
import { Primitive } from '@/_internal/components/primitive';
import { CopyButton } from '.';

const COPY_BUTTON_ROOT_TESTID = 'COPY_BUTTON_ROOT_TESTID';
const COPY_BUTTON_INDICATOT_TESTID = 'COPY_BUTTON_INDICATOT_TESTID';

describe('CopyButton', () => {
  let mockClipboard: { writeText: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('CopyButton.Root', () => {
    it('should render a button element by default', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = await render(<CopyButton.Root as="div" data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = await render(<CopyButton.Root as={Primitive.div} data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const COPY_BUTTON_ROOT_TEXT = 'COPY_BUTTON_ROOT_TEXT';

      const screen = await render(
        <CopyButton.Root>
          <span>{COPY_BUTTON_ROOT_TEXT}</span>
        </CopyButton.Root>
      );

      await expect.element(screen.getByText(COPY_BUTTON_ROOT_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have type="button" by default', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should not be disabled by default', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).not.toBeDisabled();
    });

    it('should not be disabled when the "disabled" prop is false', async () => {
      const screen = await render(<CopyButton.Root disabled={false} data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true', async () => {
      const screen = await render(<CopyButton.Root disabled={true} data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).toBeDisabled();
    });

    it('should not have "data-copied" attribute by default', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).not.toHaveAttribute('data-copied');
    });

    it('should have "data-copied" attribute with an empty value after clicking', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);

      const rootElement = screen.getByTestId(COPY_BUTTON_ROOT_TESTID);

      await userEvent.click(rootElement);
      await wait(500);
      await expect.element(rootElement).toHaveAttribute('data-copied', '');
    });

    it('should remove "data-copied" attribute after "timeoutMs" elapses', async () => {
      const screen = await render(<CopyButton.Root timeoutMs={1000} data-testid={COPY_BUTTON_ROOT_TESTID} />);

      const rootElement = screen.getByTestId(COPY_BUTTON_ROOT_TESTID);

      await userEvent.click(rootElement);
      await expect.element(rootElement).toHaveAttribute('data-copied', '');

      await wait(1100);
      await expect.element(rootElement).not.toHaveAttribute('data-copied');
    });

    it('should not have "data-error" attribute by default', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).not.toHaveAttribute('data-error');
    });

    it('should have "data-error" attribute with an empty value when clipboard API is unavailable', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);

      const rootElement = screen.getByTestId(COPY_BUTTON_ROOT_TESTID);

      await userEvent.click(rootElement);
      await expect.element(rootElement).toHaveAttribute('data-error', '');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(<CopyButton.Root disabled={false} data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(<CopyButton.Root disabled={true} data-testid={COPY_BUTTON_ROOT_TESTID} />);
      await expect.element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should copy the "defaultText" value when clicked', async () => {
      const COPY_BUTTON_ROOT_DEFAULT_TEXT = 'COPY_BUTTON_ROOT_DEFAULT_TEXT';

      const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

      const screen = await render(
        <CopyButton.Root defaultText={COPY_BUTTON_ROOT_DEFAULT_TEXT} data-testid={COPY_BUTTON_ROOT_TESTID} />
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      expect(writeTextSpy).toHaveBeenCalledWith(COPY_BUTTON_ROOT_DEFAULT_TEXT);
    });

    it('should copy an empty string when no "defaultText" is provided', async () => {
      const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      expect(writeTextSpy).toHaveBeenCalledWith('');
    });

    it('should not copy again when clicked while already in "copied" state', async () => {
      const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);

      const rootElement = screen.getByTestId(COPY_BUTTON_ROOT_TESTID);

      await userEvent.click(rootElement);
      await wait(500);
      await userEvent.click(rootElement);
      expect(writeTextSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke "onStatusChange$" with { copied: true, error: null } after clicking', async () => {
      const handleStatusChange$ = vi.fn();

      const screen = await render(
        // eslint-disable-next-line qwik/valid-lexical-scope
        <CopyButton.Root onStatusChange$={handleStatusChange$} data-testid={COPY_BUTTON_ROOT_TESTID} />
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      expect(handleStatusChange$).toHaveBeenCalledWith({ copied: true, error: null });
    });

    it('should invoke "onStatusChange$" with { copied: false, error: null } after "timeoutMs" elapses', async () => {
      const handleStatusChange$ = vi.fn();

      const screen = await render(
        // eslint-disable-next-line qwik/valid-lexical-scope
        <CopyButton.Root onStatusChange$={handleStatusChange$} timeoutMs={1000} data-testid={COPY_BUTTON_ROOT_TESTID} />
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      await wait(1100);
      expect(handleStatusChange$).toHaveBeenCalledWith({ copied: false, error: null });
    });

    it('should invoke "onStatusChange$" with { copied: false, error: "NOT_SUPPORTED" } when clipboard API is unavailable', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const handleStatusChange$ = vi.fn();

      const screen = await render(
        // eslint-disable-next-line qwik/valid-lexical-scope
        <CopyButton.Root onStatusChange$={handleStatusChange$} data-testid={COPY_BUTTON_ROOT_TESTID} />
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      expect(handleStatusChange$).toHaveBeenCalledWith({ copied: false, error: 'NOT_SUPPORTED' });
    });

    it('should invoke "onStatusChange$" with { copied: false, error: "COPY_FAILED" } when writeText throws', async () => {
      mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));

      const handleStatusChange$ = vi.fn();

      const screen = await render(
        // eslint-disable-next-line qwik/valid-lexical-scope
        <CopyButton.Root onStatusChange$={handleStatusChange$} data-testid={COPY_BUTTON_ROOT_TESTID} />
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      expect(handleStatusChange$).toHaveBeenCalledWith({ copied: false, error: 'COPY_FAILED' });
    });

    it('should call the "onClick$" prop when clicked', async () => {
      const handleClick$ = vi.fn();

      const screen = await render(
        // eslint-disable-next-line qwik/valid-lexical-scope
        <CopyButton.Root onClick$={handleClick$} data-testid={COPY_BUTTON_ROOT_TESTID} />
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      expect(handleClick$).toHaveBeenCalledTimes(1);
    });

    it('should have the "data-entry-ui-qwik-copy-button-root" attribute with an empty value', async () => {
      const screen = await render(<CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID} />);

      await expect
        .element(screen.getByTestId(COPY_BUTTON_ROOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-copy-button-root', '');
    });
  });

  describe('CopyButton.Indicator', () => {
    it('should render a span element by default', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render as a div when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator as="div" data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a div when the "as" prop is a Primitive.div component', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator as={Primitive.div} data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the Slot', async () => {
      const COPY_BUTTON_INDICATOT_TEXT = 'COPY_BUTTON_INDICATOT_TEXT';

      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator>
            <div>{COPY_BUTTON_INDICATOT_TEXT}</div>
          </CopyButton.Indicator>
        </CopyButton.Root>
      );

      await expect.element(screen.getByText(COPY_BUTTON_INDICATOT_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have aria-hidden="true" by default', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not have "data-copied" attribute by default', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).not.toHaveAttribute('data-copied');
    });

    it('should have "data-copied" attribute with an empty value after clicking CopyButton.Root', async () => {
      const screen = await render(
        <CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID}>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      await wait(500);
      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveAttribute('data-copied', '');
    });

    it('should remove "data-copied" attribute after "timeoutMs" elapses', async () => {
      const screen = await render(
        <CopyButton.Root timeoutMs={1000} data-testid={COPY_BUTTON_ROOT_TESTID}>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveAttribute('data-copied', '');

      await wait(1100);
      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).not.toHaveAttribute('data-copied');
    });

    it('should not have "data-error" attribute by default', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).not.toHaveAttribute('data-error');
    });

    it('should have "data-error" attribute with an empty value when clipboard API is unavailable', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const screen = await render(
        <CopyButton.Root data-testid={COPY_BUTTON_ROOT_TESTID}>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await userEvent.click(screen.getByTestId(COPY_BUTTON_ROOT_TESTID));
      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveAttribute('data-error', '');
    });

    it('should not have "data-disabled" attribute by default', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have "data-disabled" attribute when CopyButton.Root is enabled', async () => {
      const screen = await render(
        <CopyButton.Root disabled={false}>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have "data-disabled" attribute with an empty value when CopyButton.Root is disabled', async () => {
      const screen = await render(
        <CopyButton.Root disabled={true}>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should have style="pointer-events: none"', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveStyle({ pointerEvents: 'none' });
    });

    it('should have style="user-select: none"', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveStyle({ userSelect: 'none' });
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const COPY_BUTTON_INDICATOT_STYLE = {
        pointerEvents: 'all',
        userSelect: 'all',
        backgroundColor: 'rgb(1, 2, 3)',
        color: 'rgba(3, 2, 1)',
      } as const;

      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator style={COPY_BUTTON_INDICATOT_STYLE} data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect.element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID)).toHaveStyle(COPY_BUTTON_INDICATOT_STYLE);
    });

    it('should have the "data-entry-ui-qwik-copy-button-indicator" attribute with an empty value', async () => {
      const screen = await render(
        <CopyButton.Root>
          <CopyButton.Indicator data-testid={COPY_BUTTON_INDICATOT_TESTID} />
        </CopyButton.Root>
      );

      await expect
        .element(screen.getByTestId(COPY_BUTTON_INDICATOT_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-copy-button-indicator', '');
    });
  });
});
