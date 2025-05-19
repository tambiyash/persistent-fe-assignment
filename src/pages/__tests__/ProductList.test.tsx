import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductList from '../ProductList';
import { ProductsState } from '../../store/productsSlice';
import { AnyAction } from '@reduxjs/toolkit';

type RootState = {
  products: ProductsState;
};

const mockStore = configureStore<RootState, AnyAction>([]);

describe('ProductList Component', () => {
  let store: ReturnType<typeof mockStore>;

  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      description: 'Test Description 1',
      category: 'Test Category 1',
      image: 'test-image-1.jpg',
      rating: { rate: 4.5, count: 100 }
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      description: 'Test Description 2',
      category: 'Test Category 2',
      image: 'test-image-2.jpg',
      rating: { rate: 4.0, count: 200 }
    }
  ];

  beforeEach(() => {
    store = mockStore({
      products: {
        items: mockProducts,
        sortedItems: mockProducts,
        status: 'succeeded',
        error: null,
        sortBy: null,
        sortOrder: null
      }
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductList />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders loading state correctly', () => {
    store = mockStore({
      products: {
        items: [],
        sortedItems: [],
        status: 'loading',
        error: null,
        sortBy: null,
        sortOrder: null
      }
    });
    renderComponent();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    store = mockStore({
      products: {
        items: [],
        sortedItems: [],
        status: 'failed',
        error: 'Failed to fetch products',
        sortBy: null,
        sortOrder: null
      }
    });
    renderComponent();
    expect(screen.getByText('Failed to fetch products')).toBeInTheDocument();
  });

  it('renders products in grid view by default', () => {
    renderComponent();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('switches between grid and table views', () => {
    renderComponent();
    const tableButton = screen.getByText('Table');
    fireEvent.click(tableButton);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('sorts products by price', async () => {
    renderComponent();
    const sortPriceButton = screen.getByText('Sort by Price');
    fireEvent.click(sortPriceButton);
    
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual({ sortBy: 'price', sortOrder: 'asc' });
    });
  });

  it('sorts products by name', async () => {
    renderComponent();
    const sortNameButton = screen.getByText('Sort by Name');
    fireEvent.click(sortNameButton);
    
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual({ sortBy: 'name', sortOrder: 'asc' });
    });
  });
}); 