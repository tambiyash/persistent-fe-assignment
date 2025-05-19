import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductTable from '../ProductTable';

describe('ProductTable Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      description: 'Test Description 1',
      category: 'Test Category 1',
      rating: { rate: 4.5, count: 100 }
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      description: 'Test Description 2',
      category: 'Test Category 2',
      rating: { rate: 4, count: 200 }
    }
  ];

  it('renders table headers correctly', () => {
    render(<ProductTable products={mockProducts} />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('renders all products correctly', () => {
    render(<ProductTable products={mockProducts} />);
    
    // Check if all products are rendered
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    
    // Check if descriptions are rendered
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
    
    // Check if categories are rendered
    expect(screen.getByText('Test Category 1')).toBeInTheDocument();
    expect(screen.getByText('Test Category 2')).toBeInTheDocument();
    
    // Check if prices are rendered
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    
    // Check if ratings are rendered
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<ProductTable products={[]} />);
    
    // Headers should still be present
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    
    // No product rows should be present
    expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
  });
}); 