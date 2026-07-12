import { error as _error } from '@entry-ui/utilities/error';

/**
 * An internal utility used for logging standardized error messages to the console.
 *
 * It automatically prepends the `"[Entry UI Qwik]"` prefix to all provided messages,
 * ensuring a consistent and recognizable logging format across the package.
 *
 * This utility is designed for internal library use to simplify error reporting,
 * maintain uniform diagnostic output, and streamline debugging within the library.
 */
export const error = (messages: string[]) => {
  _error({ prefix: '[Entry UI Qwik]', messages });
};
