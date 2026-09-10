import type { GetAnimationTypeParams } from './get-animation-type.types';
import { getComputedStyle } from '../get-computed-style';
import { hasNamedAnimation } from './_internal/has-named-animation';
import { hasNonZeroDuration } from './_internal/has-non-zero-duration';

/**
 * Resolves the active type of CSS animation or transition currently applied to a DOM element.
 *
 * This utility inspects the element's computed styles for `animation-name`, `animation-duration`,
 * and `transition-duration`, and categorizes its motion state into `"both"`, `"css-animation"`,
 * `"css-transition"`, or `"none"` to support lifecycle timing and transition tracking logic.
 *
 * It safely handles multi-valued property strings, zero-duration rules, and allows bypassing
 * keyframe name checks via `ignoreAnimationName`.
 *
 * @example
 * ```ts
 * const element = document.querySelector("#my-element");
 *
 * // Determine the active motion or transition type applied to the element.
 * if (element) {
 *   const animationType = getAnimationType({ element });
 * }
 * ```
 */
export const getAnimationType = (params: GetAnimationTypeParams) => {
  const { element, ignoreAnimationName = false } = params;

  // Extract the relevant animation and transition computed style properties from the element.
  // These properties serve as the raw inputs for detecting active motion phases.
  const { animationName, animationDuration, transitionDuration } = getComputedStyle(element);

  // Evaluate whether the element has active CSS keyframe animations based on name resolution or explicit override.
  // Bypasses the identifier check if `ignoreAnimationName` is `true`, while still requiring a non-zero duration.
  const hasAnimation =
    (hasNamedAnimation(animationName) || ignoreAnimationName) && hasNonZeroDuration(animationDuration);

  // Evaluate whether the element has any active transition durations greater than zero seconds.
  // Determines if a CSS transition rule is currently configured to execute upon property changes.
  const hasTransition = hasNonZeroDuration(transitionDuration);

  // Check if both active CSS animations and CSS transitions are running concurrently.
  // Returns the compound classification string when multiple motion types execute together.
  if (hasAnimation && hasTransition) {
    return 'both';
  }

  // Check if only a CSS keyframe animation is active on the element.
  // Returns the dedicated classification string for keyframe-based motion.
  if (hasAnimation) {
    return 'css-animation';
  }

  // Check if only a CSS property transition is active on the element.
  // Returns the dedicated classification string for property transition effects.
  if (hasTransition) {
    return 'css-transition';
  }

  // Fallback when no active animations or transitions are detected.
  // Returns `"none"`` to indicate the element is entirely static regarding motion.
  return 'none';
};

export namespace getAnimationType {
  /**
   * Represents the configuration parameters required by the `getAnimationType` utility.
   *
   * This interface defines the operational options for evaluating active CSS motion states
   * (animations and transitions) applied to a DOM element. It encapsulates the target element
   * alongside evaluation flags to accurately resolve keyframe and property transition classifications.
   */
  export type Params = GetAnimationTypeParams;
}
