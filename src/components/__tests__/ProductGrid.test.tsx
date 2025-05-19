import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';

describe('ProductGrid Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      image: 'test-image-1.jpg',
      rating: { rate: 4.5, count: 100 }
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      image: 'test-image-2.jpg',
      rating: { rate: 4, count: 200 }
    }
  ];

  it('renders all products correctly', () => {
    render(<ProductGrid products={mockProducts} />);
    
    // Check if all products are rendered
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    
    // Check if prices are rendered
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    
    // Check if ratings are rendered
    expect(screen.getByText('Rating: 4.5')).toBeInTheDocument();
    expect(screen.getByText('Rating: 4')).toBeInTheDocument();
  });

  it('renders product images with correct attributes', () => {
    render(<ProductGrid products={mockProducts} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockProducts[index].image);
      expect(img).toHaveAttribute('alt', mockProducts[index].title);
    });
  });

  it('renders empty state correctly', () => {
    render(<ProductGrid products={[]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
}); 