import type { ToggleRootProps } from './toggle-root.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { Primitive } from '@/_internal/components/primitive';
import { ToggleRootContext } from '../../contexts/toggle-root-context';

/**
 * Contains the content for the toggle.
 *
 * Renders a `<button>` element.
 */
export const ToggleRoot = component$<ToggleRootProps>((props) => {
  const {
    as = 'button',
    defaultPressed,
    pressed: _pressed,
    onPressedChange$,
    disabled: _disabled = false,
    onClick$,
    ...others
  } = props;

  const { state: pressed, setState$: setPressed$ } = useControllable({
    defaultValue: defaultPressed ?? false,
    controlledSignal: _pressed,
    onChange$: onPressedChange$,
  });

  const disabled = useComputed$(() => _disabled);

  const handleClick$ = $((event: PointerEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && !disabled.value) {
      setPressed$(!pressed.value);
    }
  });

  useContextProvider(ToggleRootContext, { pressed, setPressed$, disabled });

  return (
    <Primitive.button
      as={as}
      type="button"
      disabled={disabled.value}
      aria-pressed={pressed.value}
      data-entry-ui-qwik-toggle-root=""
      data-state={pressed.value ? 'on' : 'off'}
      data-disabled={disabled.value ? '' : undefined}
      onClick$={[onClick$, handleClick$]}
      {...others}
    >
      <Slot />
    </Primitive.button>
  );
});
