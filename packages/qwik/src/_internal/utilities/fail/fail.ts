import { fail as _fail } from '@entry-ui/utilities/fail';

/**
 * An internal utility used for throwing standardized error messages.
 *
 * It automatically prepends the `"[Entry UI Qwik]"` prefix to all provided messages,
 * ensuring immediate execution termination and a consistent error format across the package.
 *
 * This utility is designed for internal library use to simplify error handling,
 * maintain uniform diagnostic exceptions, and streamline debugging within the library.
 */
export const fail = (messages: string[]) => {
  _fail({ prefix: '[Entry UI Qwik]', messages });
};
