import { warn as _warn } from '@entry-ui/utilities/warn';

/**
 * An internal utility used for logging standardized warning messages to the console.
 *
 * It automatically prepends the `"[Entry UI Qwik]"` prefix to all provided messages,
 * ensuring a consistent and recognizable warning format across the package.
 *
 * This utility is designed for internal library use to simplify warning reporting,
 * maintain uniform diagnostic logging, and streamline debugging within the library.
 */
export const warn = (messages: string[]) => {
  _warn({ prefix: '[Entry UI Qwik]', messages });
};
