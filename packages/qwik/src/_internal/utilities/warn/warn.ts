import { warn as _warn } from '@entry-ui/utilities/warn';

/**
 * Logs a warning message to the console with a standardized `"[Entry UI Qwik]"` prefix.
 *
 * This utility serves as a wrapper around the core warning function, ensuring that
 * all logs originating from this library are easily identifiable and consistent.
 */
export const warn = (messages: string[]) => {
  _warn({ prefix: '[Entry UI Qwik]', messages });
};
