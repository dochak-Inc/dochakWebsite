import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroVideo from './HeroVideo';

const mockMatchMedia = (matches) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
};

describe('HeroVideo', () => {
  test('renders a <video> when reduced motion is not preferred', () => {
    mockMatchMedia(false);
    const { container } = render(<HeroVideo />);
    const video = container.querySelector('video.hero-video__media');
    const img = container.querySelector('img.hero-video__media');
    expect(video).toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  });

  test('renders a poster <img> when reduced motion is preferred', () => {
    mockMatchMedia(true);
    const { container } = render(<HeroVideo />);
    const video = container.querySelector('video.hero-video__media');
    const img = container.querySelector('img.hero-video__media');
    expect(video).not.toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/videos/hero-smart-city-poster.jpg');
  });

  test('always renders the headline as an <h1>', () => {
    mockMatchMedia(false);
    render(<HeroVideo />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Smarter cities/);
    expect(h1).toHaveTextContent(/Seamless mobility/);
  });
});
