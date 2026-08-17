import type { SetStylePropertyParams } from './set-style-property.types';

/**
 * Verifies and applies a specific CSS property to an element with a revertible cleanup.
 *
 * This utility focuses on a single CSS property, providing a lightweight way to
 * manage individual styles or CSS variables. It avoids unnecessary DOM updates
 * if the property already holds the target value. When the returned cleanup
 * function is called, the property is restored to its previous value, and the
 * `style` attribute is removed if it becomes empty.
 *
 * @example
 * ```ts
 * const cleanup = setStyleProperty({
 * 	element: document.documentElement,
 * 	property: "--brand-color",
 * 	value: "blue"
 * });
 *
 * // Reverts the property to its original value
 * cleanup();
 * ```
 */
export const setStyleProperty = (params: SetStylePropertyParams) => {
  const { element, property, value } = params;

  const prevPropertyValue = element.style.getPropertyValue(property);

  if (prevPropertyValue === value) {
    return () => void 0;
  }

  element.style.setProperty(property, value);

  return () => {
    element.style.setProperty(property, prevPropertyValue);

    if (element.style.length === 0) {
      element.removeAttribute('style');
    }
  };
};
