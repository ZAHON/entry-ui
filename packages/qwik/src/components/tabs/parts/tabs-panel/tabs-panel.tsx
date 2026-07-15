import type { TabsPanelProps } from './tabs-panel.types';
import { component$, useComputed$, useContextProvider, Slot } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { mergeStyles } from '@/utilities/merge-styles';
import { fail } from '@/_internal/utilities/fail';
import { Primitive } from '@/_internal/components/primitive';
import { getPartId } from '../../utilities/get-part-id';
import { useTabsRootContext } from '../../contexts/tabs-root-context';
import { TabsPanelContext } from '../../contexts/tabs-panel-context';

/**
 * A panel displayed when the corresponding tab is active.
 *
 * Renders a `<div>` element.
 */
export const TabsPanel = component$<TabsPanelProps>((props) => {
  const { as = 'div', value, containsFocusableContent = false, style, ...others } = props;

  if (isDev && !value) {
    fail([
      `The 'Tabs.Panel' component requires a 'value' prop to function correctly.`,
      `Without a unique value, the panel cannot be mapped and toggled by its corresponding 'Tabs.Tab' component.`,
      `Please provide a non-empty string as the 'value' prop.`,
    ]);
  }

  const { value: activeTabValue, orientation, id } = useTabsRootContext();

  const tabId = useComputed$(() => getPartId({ id: id, value: value, part: 'tab' }));
  const panelId = useComputed$(() => getPartId({ id: id, value: value, part: 'panel' }));
  const active = useComputed$(() => activeTabValue.value === value);
  const mergedStyles = useComputed$(() =>
    mergeStyles([{ display: !active.value ? 'none !important' : undefined }, style])
  );

  useContextProvider(TabsPanelContext, { active });

  return (
    <Primitive.div
      as={as}
      role="tabpanel"
      id={panelId.value}
      hidden={!active.value}
      tabIndex={!active.value ? -1 : containsFocusableContent ? undefined : 0}
      aria-labelledby={tabId.value}
      data-entry-ui-qwik-tabs-panel=""
      data-state={active.value ? 'active' : 'inactive'}
      data-orientation={orientation.value}
      style={mergedStyles.value}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
