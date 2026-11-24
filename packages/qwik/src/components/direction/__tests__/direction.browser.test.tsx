import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Direction } from '../index';
import { UseDirectionProviderContextTest } from './fixtures/use-direction-provider-context-test';

const USE_DIRECTION_PROVIDER_CONTEXT_TESTID = 'USE_DIRECTION_PROVIDER_CONTEXT_TESTID';

describe('Direction', () => {
  describe('Provider', () => {
    it('should render child content correctly within the <Slot>', async () => {
      const DIRECTION_PROVIDER_TEXT = 'ALERT_ROOT_TEXT';

      const screen = await render(
        <Direction.Provider>
          <div>{DIRECTION_PROVIDER_TEXT}</div>
        </Direction.Provider>
      );

      await expect.element(screen.getByText(DIRECTION_PROVIDER_TEXT)).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('useDirectionProviderContext', () => {
    it('should return "ltr" as the default direction when no "direction" prop is provided to <Direction.Provider>', async () => {
      const screen = await render(
        <Direction.Provider>
          <UseDirectionProviderContextTest data-testid={USE_DIRECTION_PROVIDER_CONTEXT_TESTID} />
        </Direction.Provider>
      );

      await expect.element(screen.getByTestId(USE_DIRECTION_PROVIDER_CONTEXT_TESTID)).toHaveTextContent('ltr');
    });

    it('should return "ltr" when the "direction" prop on <Direction.Provider> is set to "ltr"', async () => {
      const screen = await render(
        <Direction.Provider direction="ltr">
          <UseDirectionProviderContextTest data-testid={USE_DIRECTION_PROVIDER_CONTEXT_TESTID} />
        </Direction.Provider>
      );

      await expect.element(screen.getByTestId(USE_DIRECTION_PROVIDER_CONTEXT_TESTID)).toHaveTextContent('ltr');
    });

    it('should return "rtl" when the "direction" prop on <Direction.Provider> is set to "rtl"', async () => {
      const screen = await render(
        <Direction.Provider direction="rtl">
          <UseDirectionProviderContextTest data-testid={USE_DIRECTION_PROVIDER_CONTEXT_TESTID} />
        </Direction.Provider>
      );

      await expect.element(screen.getByTestId(USE_DIRECTION_PROVIDER_CONTEXT_TESTID)).toHaveTextContent('rtl');
    });

    it('should fall back to "ltr" as the default direction when used outside of a <Direction.Provider>', async () => {
      const screen = await render(
        <UseDirectionProviderContextTest data-testid={USE_DIRECTION_PROVIDER_CONTEXT_TESTID} />
      );

      await expect.element(screen.getByTestId(USE_DIRECTION_PROVIDER_CONTEXT_TESTID)).toHaveTextContent('ltr');
    });
  });
});
