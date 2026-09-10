/**
 * Represents the configuration parameters required by the `getAnimationType` utility.
 *
 * This interface defines the operational options for evaluating active CSS motion states
 * (animations and transitions) applied to a DOM element. It encapsulates the target element
 * alongside evaluation flags to accurately resolve keyframe and property transition classifications.
 */
export interface GetAnimationTypeParams {
  /**
   * The target DOM element whose active motion or transition type you want to resolve.
   * Serves as the source for extracting `animation-name`, `animation-duration`, and `transition-duration` properties.
   */
  element: Element;

  /**
   * Determines whether to bypass validation of the computed `animation-name` property.
   * When set to `true`, keyframe motion detection relies solely on non-zero `animation-duration` rules,
   * accommodating scenarios where keyframe identifiers are temporarily suppressed or managed externally during lifecycle transitions.
   *
   * @default false
   */
  ignoreAnimationName?: boolean | undefined;
}
