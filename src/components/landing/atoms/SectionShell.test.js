import React from 'react';
import { render } from '@testing-library/react';
import SectionShell from './SectionShell';

describe('SectionShell', () => {
  test('applies the deep tone class', () => {
    const { container } = render(
      <SectionShell tone="deep" ariaLabel="test">x</SectionShell>
    );
    expect(container.querySelector('.landing-section--deep')).toBeInTheDocument();
  });

  test('applies the base tone class', () => {
    const { container } = render(
      <SectionShell tone="base" ariaLabel="test">x</SectionShell>
    );
    expect(container.querySelector('.landing-section--base')).toBeInTheDocument();
  });

  test('applies the lift tone class', () => {
    const { container } = render(
      <SectionShell tone="lift" ariaLabel="test">x</SectionShell>
    );
    expect(container.querySelector('.landing-section--lift')).toBeInTheDocument();
  });

  test('defaults to base tone when prop omitted', () => {
    const { container } = render(<SectionShell ariaLabel="test">x</SectionShell>);
    expect(container.querySelector('.landing-section--base')).toBeInTheDocument();
  });

  test('renders children inside the container', () => {
    const { getByText } = render(
      <SectionShell tone="base" ariaLabel="test">hello world</SectionShell>
    );
    expect(getByText('hello world')).toBeInTheDocument();
  });
});
