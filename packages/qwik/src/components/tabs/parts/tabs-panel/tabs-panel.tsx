import type { TabsPanelProps } from './tabs-panel.types';
import { component$, useComputed$, useContextProvider, Slot } from '@qwik.dev/core';
import { mergeStyles } from '@/utilities/merge-styles';
import { Primitive } from '@/_internal/components/primitive';
import { useTabsRootContext } from '../../contexts/tabs-root-context';
import { TabsPanelContext } from '../../contexts/tabs-panel-context';

/**
 * A panel displayed when the corresponding tab is active.
 *
 * Renders a `<div>` element.
 */
export const TabsPanel = component$<TabsPanelProps>((props) => {
  const { as = 'div', value, containsFocusableContent = false, style, ...others } = props;

  const { value: activeTabValue, orientation, id } = useTabsRootContext();

  const tabId = useComputed$(() => `entry-ui-qwik-tabs-${id}-tab-${value}`);
  const panelId = useComputed$(() => `entry-ui-qwik-tabs-${id}-panel-${value}`);
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
