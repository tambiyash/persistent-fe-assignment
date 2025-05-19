import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleMenu from '../ToggleMenu';

describe('ToggleMenu Component', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders both grid and table buttons', () => {
    render(<ToggleMenu viewMode="grid" onToggle={mockOnToggle} />);
    
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('highlights the active view mode', () => {
    render(<ToggleMenu viewMode="grid" onToggle={mockOnToggle} />);
    
    const gridButton = screen.getByText('Grid');
    const tableButton = screen.getByText('Table');
    
    expect(gridButton).toHaveClass('bg-yellow-400');
    expect(tableButton).not.toHaveClass('bg-yellow-400');
  });

  it('calls onToggle with correct view mode when clicking inactive button', () => {
    render(<ToggleMenu viewMode="grid" onToggle={mockOnToggle} />);
    
    const tableButton = screen.getByText('Table');
    fireEvent.click(tableButton);
    
    expect(mockOnToggle).toHaveBeenCalledWith('table');
  });

  it('does not call onToggle when clicking active button', () => {
    render(<ToggleMenu viewMode="grid" onToggle={mockOnToggle} />);
    
    const gridButton = screen.getByText('Grid');
    fireEvent.click(gridButton);
    
    expect(mockOnToggle).not.toHaveBeenCalled();
  });

  it('handles view mode changes correctly', () => {
    const { rerender } = render(<ToggleMenu viewMode="grid" onToggle={mockOnToggle} />);
    
    // Initial state
    expect(screen.getByText('Grid')).toHaveClass('bg-yellow-400');
    expect(screen.getByText('Table')).not.toHaveClass('bg-yellow-400');
    
    // After view mode change
    rerender(<ToggleMenu viewMode="table" onToggle={mockOnToggle} />);
    expect(screen.getByText('Grid')).not.toHaveClass('bg-yellow-400');
    expect(screen.getByText('Table')).toHaveClass('bg-yellow-400');
  });
}); 