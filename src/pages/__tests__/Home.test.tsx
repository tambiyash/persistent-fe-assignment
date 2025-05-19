import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Page', () => {
  it('renders all sections correctly', () => {
    render(<Home />);
    
    // Check section headings
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders about us content', () => {
    render(<Home />);
    
    const aboutText = screen.getByText(/Welcome to our products store!/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('renders features list', () => {
    render(<Home />);
    
    const features = [
      'Wide selection of products',
      'Fast shipping and delivery',
      'Secure payment options',
      '24/7 customer support'
    ];
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders contact information', () => {
    render(<Home />);
    
    const contactText = screen.getByText(/Have questions or need assistance?/i);
    expect(contactText).toBeInTheDocument();
    
    const emailLink = screen.getByText('tambiyash@gmail.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:tambiyash@gmail.com');
  });
}); 