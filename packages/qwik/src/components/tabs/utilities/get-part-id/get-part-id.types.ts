/**
 * Represents the configuration parameters required by the `getPartId` internal utility.
 *
 * This interface defines the mandatory context fields needed to compute a precise,
 * deterministic DOM identifier for a compound sub-element within the `Tabs` component hierarchy.
 * It ensures that both interactive triggers and content panels share a coordinated token schema,
 * allowing full compliance with WAI-ARIA accessibility mapping specifications across the `Tabs` system.
 */
export interface GetPartIdParams {
  /**
   * The unique base identifier assigned to the root `Tabs` container instance.
   * Used to isolate the DOM elements of this specific `Tabs` instance from others on the page.
   */
  id: string;

  /**
   * The unique value representing the specific item state within the `Tabs` collection.
   * Acts as the distinct discriminator for individual trigger-and-panel pairs.
   */
  value: string;

  /**
   * The functional sub-element type within the compound `Tabs` structure.
   * Determines whether the identifier is meant for the interactive trigger button (`"tab"`)
   * or the associated content viewport (`"panel"`).
   */
  part: 'tab' | 'panel';
}
