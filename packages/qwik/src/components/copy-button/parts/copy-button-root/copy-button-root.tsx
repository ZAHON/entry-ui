import type { CopyButtonRootProps } from './copy-button-root.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { useClipboard } from '@/hooks/use-clipboard';
import { Primitive } from '@/_internal/components/primitive';
import { CopyButtonRootContext } from '../../contexts/copy-button-root-context';

/**
 * Contains the content for the copy button.
 *
 * Renders a `<button>` element.
 */
export const CopyButtonRoot = component$<CopyButtonRootProps>((props) => {
  const {
    as = 'button',
    defaultText,
    text: _text,
    onStatusChange$,
    timeoutMs = 3000,
    disabled: _disabled = false,
    onClick$,
    ...others
  } = props;

  const { state: text } = useControllable({
    defaultValue: defaultText ?? '',
    controlledSignal: _text,
  });

  const { copied, error, copy$ } = useClipboard({
    timeoutMs,
    onStatusChange$,
  });

  const disabled = useComputed$(() => _disabled);

  const handleClick$ = $(async (event: PointerEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && !disabled.value && !copied.value) {
      await copy$(text.value);
    }
  });

  useContextProvider(CopyButtonRootContext, { copied, error, disabled });

  return (
    <Primitive.button
      as={as}
      type="button"
      disabled={disabled.value}
      data-entry-ui-qwik-copy-button-root=""
      data-copied={copied.value ? '' : undefined}
      data-error={error.value ? '' : undefined}
      data-disabled={disabled.value ? '' : undefined}
      onClick$={[onClick$, handleClick$]}
      {...others}
    >
      <Slot />
    </Primitive.button>
  );
});
