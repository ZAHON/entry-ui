import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { userEvent } from 'vitest/browser';
import { wait } from '@entry-ui/utilities/wait';
import { Primitive } from '@/_internal/components/primitive';
import { Dialog } from '.';

const DIALOG_TRIGGER_TESTID = 'DIALOG_TRIGGER_TESTID';
const DIALOG_POPUP_TESTID = 'DIALOG_POPUP_TESTID';
const DIALOG_TITLE_TESTID = 'DIALOG_TITLE_TESTID';
const DIALOG_DESCRIPTION_TESTID = 'DIALOG_DESCRIPTION_TESTID';
const DIALOG_CLOSE_TESTID = 'DIALOG_CLOSE_TESTID';

describe('Dialog', () => {
  describe('Dialog.Trigger', () => {
    it('should render a <button> element by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger as="div" data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger as={Primitive.div} data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const DIALOG_TRIGGER_TEXT = 'DIALOG_TRIGGER_TEXT';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger>
            <span>{DIALOG_TRIGGER_TEXT}</span>
          </Dialog.Trigger>
        </Dialog.Root>
      );

      await expect.element(screen.getByText(DIALOG_TRIGGER_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the type="button" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const DIALOG_TRIGGER_ID = 'DIALOG_TRIGGER_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger id={DIALOG_TRIGGER_ID} data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('id', DIALOG_TRIGGER_ID);
    });

    it('should not have the "aria-controls" attribute when the dialog is closed and <Dialog.Root> does not contain <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have the "aria-controls" attribute when the dialog is closed and <Dialog.Root> contains <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should not have the "aria-controls" attribute when the dialog is open and <Dialog.Root> does not contain <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('aria-controls');
    });

    it('should have the "aria-controls" attribute associated with <Dialog.Popup> "id" attribute when the dialog is open and <Dialog.Root> contains <Dialog.Popup>', async () => {
      const DIALOG_POPUP_ID = 'DIALOG_POPUP_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup id={DIALOG_POPUP_ID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await wait(500);
      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('aria-controls', DIALOG_POPUP_ID);
    });

    it('should not have the "aria-haspopup" attribute when <Dialog.Root> does not contain <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('aria-haspopup');
    });

    it('should not have the aria-haspopup="dialog" attribute when <Dialog.Root> contains <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('should not have the "aria-expanded" attribute when <Dialog.Root> does not contain <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('aria-expanded');
    });

    it('should have the aria-expanded="false" attribute when the dialog is closed and <Dialog.Root> contains <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have the aria-expanded="true" attribute when the dialog is open and <Dialog.Root> contains <Dialog.Popup>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await wait(500);
      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not be disabled by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should not be disabled when the "disabled" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger disabled={false} data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger disabled={true} data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toBeDisabled();
    });

    it('should have the data-state="closed" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have the data-state="closed" attribute when the dialog is closed', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await userEvent.click(screen.getByTestId(DIALOG_CLOSE_TESTID));
      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have the data-state="open" attribute when the dialog is open', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger disabled={false} data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger disabled={true} data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TRIGGER_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should open the dialog when the trigger is clicked', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await wait(500);
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should have the "data-entry-ui-qwik-dialog-trigger" attribute with an empty value', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
        </Dialog.Root>
      );

      await expect
        .element(screen.getByTestId(DIALOG_TRIGGER_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-dialog-trigger', '');
    });
  });

  describe('Dialog.Popup', () => {
    beforeEach(() => {
      document.body.removeAttribute('data-scroll-lock');
    });

    afterEach(() => {
      document.body.removeAttribute('data-scroll-lock');
    });

    it('should render a <dialog> element by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toBeInstanceOf(HTMLDialogElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const DIALOG_POPUP_TEXT = 'DIALOG_POPUP_TEXT';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <div>{DIALOG_POPUP_TEXT}</div>
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByText(DIALOG_POPUP_TEXT)).toBeInstanceOf(HTMLDivElement);
    });

    it('should have the role="dialog" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('role', 'dialog');
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const DIALOG_POPUP_ID = 'DIALOG_POPUP_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup id={DIALOG_POPUP_ID} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('id', DIALOG_POPUP_ID);
    });

    it('should not have the "aria-labelledby" attribute when <Dialog.Popup> does not contain <Dialog.Title>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).not.toHaveAttribute('aria-labelledby');
    });

    it('should have the "aria-labelledby" attribute when <Dialog.Popup> contains <Dialog.Title>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Title />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('aria-labelledby');
    });

    it('should have the "aria-labelledby" attribute associated with <Dialog.Title> "id" attribute', async () => {
      const DIALOG_TITLE_ID = 'DIALOG_TITLE_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Title id={DIALOG_TITLE_ID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('aria-labelledby', DIALOG_TITLE_ID);
    });

    it('should not have the "aria-describedby" attribute when <Dialog.Popup> does not contain <Dialog.Description>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).not.toHaveAttribute('aria-describedby');
    });

    it('should have the "aria-describedby" attribute when <Dialog.Popup> contains <Dialog.Description>', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Description />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('aria-describedby');
    });

    it('should have the "aria-describedby" attribute associated with <Dialog.Description> "id" attribute', async () => {
      const DIALOG_DESCRIPTION_ID = 'DIALOG_DESCRIPTION_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Description id={DIALOG_DESCRIPTION_ID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect
        .element(screen.getByTestId(DIALOG_POPUP_TESTID))
        .toHaveAttribute('aria-describedby', DIALOG_DESCRIPTION_ID);
    });

    it('should have the data-state="closed" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have the data-state="closed" attribute when the dialog is closed', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await userEvent.click(screen.getByTestId(DIALOG_CLOSE_TESTID));
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should lock the body scroll when the dialog is open by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);
    });

    it('should lock the body scroll when the dialog is open and the "preventScroll" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup preventScroll={true} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);
    });

    it('should not lock the body scroll when the dialog is open and the "preventScroll" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup preventScroll={false} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);
    });

    it('should close the dialog when the "Escape" key is pressed by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should close the dialog when the "Escape" key is pressed and the "closeOnEscapeKeyDown" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup closeOnEscapeKeyDown={true} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should not close the dialog when the "Escape" key is pressed and the "closeOnEscapeKeyDown" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup closeOnEscapeKeyDown={false} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should have the data-state="open" attribute when the dialog is open', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should close the dialog when clicking outside the <Dialog.Popup> content by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));

      // Simulates a click at the top-left corner of the viewport. Since the native <dialog>
      // element is centered by default when opened as a modal, this ensures the click
      // occurs on the backdrop, outside the popup content.
      await userEvent.click(document.body, { position: { x: 0, y: 0 } });

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should close the dialog when clicking outside the <Dialog.Popup> content and the "closeOnClickOutside" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup closeOnClickOutside={true} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));

      // Simulates a click at the top-left corner of the viewport. Since the native <dialog>
      // element is centered by default when opened as a modal, this ensures the click
      // occurs on the backdrop, outside the popup content.
      await userEvent.click(document.body, { position: { x: 0, y: 0 } });

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should not close the dialog when clicking outside the <Dialog.Popup> content and the "closeOnClickOutside" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup closeOnClickOutside={false} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));

      // Simulates a click at the top-left corner of the viewport. Since the native <dialog>
      // element is centered by default when opened as a modal, this ensures the click
      // occurs on the backdrop, outside the popup content.
      await userEvent.click(document.body, { position: { x: 0, y: 0 } });

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'open');
    });

    it('should call the "onOpenChangeComplete$" callback with the correct state upon opening and closing the popup', async () => {
      const handleOpenChangeComplete$ = vi.fn();

      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          {/* eslint-disable-next-line qwik/valid-lexical-scope */}
          <Dialog.Popup onOpenChangeComplete$={handleOpenChangeComplete$} data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      expect(handleOpenChangeComplete$).toHaveBeenCalledWith(true);

      await userEvent.click(screen.getByTestId(DIALOG_CLOSE_TESTID));
      expect(handleOpenChangeComplete$).toHaveBeenCalledWith(false);
    });

    it('should have the inline style "display: none !important" when the dialog is closed and no inline "display" style when the dialog is open', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveStyle('display: none !important');
      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).not.toHaveStyle('display');
      await userEvent.click(screen.getByTestId(DIALOG_CLOSE_TESTID));
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveStyle('display: none !important');
    });

    it('should merge and apply custom inline styles via the "style" prop', async () => {
      const DIALOG_POPUP_STYLE = 'display: block; background-color: rgb(1, 2, 3)';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup style={DIALOG_POPUP_STYLE} data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveStyle(DIALOG_POPUP_STYLE);
    });

    it('should have the "data-entry-ui-qwik-dialog-popup" attribute with an empty value', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID} />
        </Dialog.Root>
      );

      await expect
        .element(screen.getByTestId(DIALOG_POPUP_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-dialog-popup', '');
    });
  });

  describe('Dialog.Title', () => {
    it('should render an <h2> element by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title data-testid={DIALOG_TITLE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TITLE_TESTID)).toContainHTML('<h2');
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title as="div" data-testid={DIALOG_TITLE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TITLE_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title as={Primitive.div} data-testid={DIALOG_TITLE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TITLE_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const DIALOG_TITLE_TEXT = 'DIALOG_TITLE_TEXT';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title>
              <span>{DIALOG_TITLE_TEXT}</span>
            </Dialog.Title>
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByText(DIALOG_TITLE_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title data-testid={DIALOG_TITLE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TITLE_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const DIALOG_TITLE_ID = 'DIALOG_TITLE_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title id={DIALOG_TITLE_ID} data-testid={DIALOG_TITLE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_TITLE_TESTID)).toHaveAttribute('id', DIALOG_TITLE_ID);
    });

    it('should have the "data-entry-ui-qwik-dialog-title" attribute with an empty value', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Title data-testid={DIALOG_TITLE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect
        .element(screen.getByTestId(DIALOG_TITLE_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-dialog-title', '');
    });
  });

  describe('Dialog.Description', () => {
    it('should render an <p> element by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description data-testid={DIALOG_DESCRIPTION_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_DESCRIPTION_TESTID)).toBeInstanceOf(HTMLParagraphElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description as="div" data-testid={DIALOG_DESCRIPTION_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_DESCRIPTION_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description as={Primitive.div} data-testid={DIALOG_DESCRIPTION_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_DESCRIPTION_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const DIALOG_DESCRIPTION_TEXT = 'DIALOG_DESCRIPTION_TEXT';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description>
              <span>{DIALOG_DESCRIPTION_TEXT}</span>
            </Dialog.Description>
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByText(DIALOG_DESCRIPTION_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have a generated id by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description data-testid={DIALOG_DESCRIPTION_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_DESCRIPTION_TESTID)).toHaveAttribute('id');
    });

    it('should use the provided "id" prop as the element id', async () => {
      const DIALOG_DESCRIPTION_ID = 'DIALOG_DESCRIPTION_ID';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description id={DIALOG_DESCRIPTION_ID} data-testid={DIALOG_DESCRIPTION_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_DESCRIPTION_TESTID)).toHaveAttribute('id', DIALOG_DESCRIPTION_ID);
    });

    it('should have the "data-entry-ui-qwik-dialog-description" attribute with an empty value', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Description data-testid={DIALOG_DESCRIPTION_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect
        .element(screen.getByTestId(DIALOG_DESCRIPTION_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-dialog-description', '');
    });
  });

  describe('Dialog.Close', () => {
    it('should render a <button> element by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render as a <div> element when the "as" prop is set to "div"', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close as="div" data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render as a <div> element when the "as" prop is set to the <Primitive.div> component', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close as={Primitive.div} data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render child content correctly within the <Slot>', async () => {
      const DIALOG_CLOSE_TEXT = 'DIALOG_CLOSE_TEXT';

      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close>
              <span>{DIALOG_CLOSE_TEXT}</span>
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByText(DIALOG_CLOSE_TEXT)).toBeInstanceOf(HTMLSpanElement);
    });

    it('should have the type="button" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).toHaveAttribute('type', 'button');
    });

    it('should not be disabled by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).not.toBeDisabled();
    });

    it('should not be disabled when the "disabled" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close disabled={false} data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).not.toBeDisabled();
    });

    it('should be disabled when the "disabled" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close disabled={true} data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).toBeDisabled();
    });

    it('should not have the "data-disabled" attribute by default', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should not have the "data-disabled" attribute when the "disabled" prop is false', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close disabled={false} data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).not.toHaveAttribute('data-disabled');
    });

    it('should have the "data-disabled" attribute with an empty value when the "disabled" prop is true', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close disabled={true} data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect.element(screen.getByTestId(DIALOG_CLOSE_TESTID)).toHaveAttribute('data-disabled', '');
    });

    it('should close the dialog when the close button is clicked', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Trigger data-testid={DIALOG_TRIGGER_TESTID} />
          <Dialog.Popup data-testid={DIALOG_POPUP_TESTID}>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await userEvent.click(screen.getByTestId(DIALOG_TRIGGER_TESTID));
      await userEvent.click(screen.getByTestId(DIALOG_CLOSE_TESTID));
      await expect.element(screen.getByTestId(DIALOG_POPUP_TESTID)).toHaveAttribute('data-state', 'closed');
    });

    it('should have the "data-entry-ui-qwik-dialog-close" attribute with an empty value', async () => {
      const screen = await render(
        <Dialog.Root>
          <Dialog.Popup>
            <Dialog.Close data-testid={DIALOG_CLOSE_TESTID} />
          </Dialog.Popup>
        </Dialog.Root>
      );

      await expect
        .element(screen.getByTestId(DIALOG_CLOSE_TESTID))
        .toHaveAttribute('data-entry-ui-qwik-dialog-close', '');
    });
  });
});
