import type { DialogPopupProps } from '../../parts/dialog-popup';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { DialogPopup } from '../../parts/dialog-popup';

export const DialogPopupCssAnimation = component$<DialogPopupProps>((props) => {
  const { class: className, ...others } = props;

  useStyles$(`
    .dialog-popup-css-animation[data-open] {
      animation: dialog-popup-show 100ms linear;
    }

    .dialog-popup-css-animation[data-closed] {
      animation: dialog-popup-hide 100ms linear;
    }

    @keyframes dialog-popup-show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes dialog-popup-hide {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    `);

  return (
    <DialogPopup class={['dialog-popup-css-animation', className]} {...others}>
      <Slot />
    </DialogPopup>
  );
});
