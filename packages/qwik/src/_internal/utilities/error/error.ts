import { error as _error } from '@entry-ui/utilities/error';

/**
 * Logs an error message to the console with a standardized `"[Entry UI Qwik]"` prefix.
 *
 * This utility function simplifies error reporting by automatically
 * prepending a consistent prefix to all messages originating
 * from the Entry UI Qwik library.
 */
export const error = (messages: string[]) => {
  _error({ prefix: '[Entry UI Qwik]', messages });
};
