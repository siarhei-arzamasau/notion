import { render, screen } from '@testing-library/react';

import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders hint', () => {
    const handleClick = jest.fn();

    render(<Spacer handleClick={handleClick} showHint />);

    expect(
      screen.getByText('Click to create the first paragraph.')
    ).toBeInTheDocument();
  });
});
