import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-qwik';
import { Primitive } from '@/_internal/components/primitive';
import { Indicator } from '.';

const INDICATOR_TESTID = 'INDICATOR_TESTID';

describe('Indicator', () => {
  it('should render a span element by default', async () => {
    const screen = await render(<Indicator data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should render as a div when the "as" prop is set to "div"', async () => {
    const screen = await render(<Indicator as="div" data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
  });

  it('should render as a div when the "as" prop is a Primitive.div component', async () => {
    const screen = await render(<Indicator as={Primitive.div} data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toBeInstanceOf(HTMLDivElement);
  });

  it('should render child content correctly within the Slot', async () => {
    const INDICATOT_TEXT = 'INDICATOT_TEXT';

    const screen = await render(
      <Indicator>
        <div>{INDICATOT_TEXT}</div>
      </Indicator>
    );

    await expect.element(screen.getByText(INDICATOT_TEXT)).toBeInstanceOf(HTMLDivElement);
  });

  it('should have aria-hidden="true" by default', async () => {
    const screen = await render(<Indicator data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have style="pointer-events: none"', async () => {
    const screen = await render(<Indicator data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toHaveStyle('pointer-events: none');
  });

  it('should have style="user-select: none"', async () => {
    const screen = await render(<Indicator data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toHaveStyle('user-select: none');
  });

  it('should have style="-webkit-user-select: none"', async () => {
    const screen = await render(<Indicator data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toHaveStyle('-webkit-user-select: none');
  });

  it('should merge and apply custom inline styles via the "style" prop', async () => {
    const INDICATOT_STYLE = 'pointer-events: all; user-select: all; -webkit-user-select: all, color: "rgba(3, 2, 1)"';

    const screen = await render(<Indicator style={INDICATOT_STYLE} data-testid={INDICATOR_TESTID} />);
    await expect.element(screen.getByTestId(INDICATOR_TESTID)).toHaveStyle(INDICATOT_STYLE);
  });
});
