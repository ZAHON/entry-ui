import type { TabsRootProps } from './tabs-root.types';
import { component$, useId ,useComputed$, useContextProvider, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { Primitive } from '@/_internal/components/primitive';
import { TabsRootContext } from '../../contexts/tabs-root-context';

/**
 * Groups the tabs and the corresponding panels.
 *
 * Renders a `<div>` element.
 */
export const TabsRoot = component$<TabsRootProps>((props) => {
  const {
    as = 'div',
    defaultValue,
    value: _value,
    onValueChange$,
    dir: _dir = 'ltr',
    orientation: _orientation = 'horizontal',
    ...others
  } = props;

  const { state: value, setState$: setValue$ } = useControllable({
    defaultValue: defaultValue ?? '',
    controlledSignal: _value,
    onChange$: onValueChange$,
  });

	const id = useId();
  const dir = useComputed$(() => _dir);
  const orientation = useComputed$(() => _orientation);

  useContextProvider(TabsRootContext, { value, setValue$, id ,dir, orientation });

  return (
    <Primitive.div
      as={as}
      dir={dir.value}
      data-entry-ui-qwik-tabs-root=""
      data-orientation={orientation.value}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
