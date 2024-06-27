import { render, screen, } from '@testing-library/react';
import App from './App';
import { describe, expect } from 'vitest';

describe('App', () => {

  it('renders headline', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Vite + React');
  });
});