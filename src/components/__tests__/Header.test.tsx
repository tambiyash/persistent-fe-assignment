import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('renders the store title', () => {
    renderComponent();
    expect(screen.getByText('Products Store')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderComponent();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Product List')).toBeInTheDocument();
  });

  it('applies underline to active link', () => {
    renderComponent();
    
    // Since we're on the root path, no link should be underlined
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).not.toHaveClass('underline');
    });
  });
}); 