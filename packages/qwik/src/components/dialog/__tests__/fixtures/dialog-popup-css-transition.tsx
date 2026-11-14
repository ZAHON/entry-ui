import type { DialogPopupProps } from '../../parts/dialog-popup';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { DialogPopup } from '../../parts/dialog-popup';

export const DialogPopupCssTransition = component$<DialogPopupProps>((props) => {
  const { class: className, ...others } = props;

  useStyles$(`
    .dialog-popup-css-transition {
      transition: opacity 100ms linear;
    }

    .dialog-popup-css-transition[data-starting-style],
    .dialog-popup-css-transition[data-ending-style] {
      opacity: 0;
    }
    `);

  return (
    <DialogPopup class={['dialog-popup-css-transition', className]} {...others}>
      <Slot />
    </DialogPopup>
  );
});
