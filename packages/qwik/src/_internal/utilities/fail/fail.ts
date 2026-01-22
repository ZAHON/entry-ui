import { fail as _fail } from '@entry-ui/utilities/fail';

/**
 * Throws an error message with a standardized `"[Entry UI Qwik]"` prefix.
 *
 * This utility function simplifies error reporting by automatically
 * prepending a consistent prefix to all messages originating
 * from the Entry UI Qwik library, ensuring immediate execution termination.
 */
export const fail = (messages: string[]) => {
  _fail({ prefix: '[Entry UI Qwik]', messages });
};
