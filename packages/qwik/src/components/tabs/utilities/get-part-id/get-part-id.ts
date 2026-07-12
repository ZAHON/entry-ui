import type { GetPartIdParams } from './get-part-id.types';

/**
 * An internal utility that generates a standardized HTML `id` attribute string for sub-elements within the `Tabs` system.
 *
 * This helper constructs a deterministic, highly predictable string identifier based on the provided
 * configuration parameters. By unifying the string generation logic, it serves as a centralized source
 * of truth for DOM identity across the entire `Tabs` component hierarchy.
 *
 * This guarantees flawless orchestration between individual trigger buttons (`"tab"`) and their
 * associated content viewports (`"panel"`), eliminating the risk of mismatched references and ensuring
 * full adherence to the WAI-ARIA relationship contract (`aria-controls` / `aria-labelledby`).
 */
export const getPartId = (params: GetPartIdParams) => {
  const { id, value, part } = params;

  return `entry-ui-qwik-tabs-${id}-${part}-${value}`;
};
