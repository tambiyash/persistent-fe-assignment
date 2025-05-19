import productsReducer, { setSort, fetchProducts } from '../productsSlice';
import { ProductsState } from '../productsSlice';

describe('productsSlice', () => {
  const initialState: ProductsState = {
    items: [],
    sortedItems: [],
    status: 'idle',
    error: null,
    sortBy: null,
    sortOrder: null
  };

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
      rating: { rate: 4, count: 200 }
    }
  ];

  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSort', () => {
    const state: ProductsState = {
      ...initialState,
      items: mockProducts,
      sortedItems: mockProducts
    };

    const action = setSort({ sortBy: 'price', sortOrder: 'asc' });
    const result = productsReducer(state, action);

    expect(result.sortBy).toBe('price');
    expect(result.sortOrder).toBe('asc');
    expect(result.sortedItems).toEqual([...mockProducts].sort((a, b) => a.price - b.price));
  });

  it('should handle setSort with name', () => {
    const state: ProductsState = {
      ...initialState,
      items: mockProducts,
      sortedItems: mockProducts
    };

    const action = setSort({ sortBy: 'name', sortOrder: 'desc' });
    const result = productsReducer(state, action);

    expect(result.sortBy).toBe('name');
    expect(result.sortOrder).toBe('desc');
    expect(result.sortedItems).toEqual([...mockProducts].sort((a, b) => b.title.localeCompare(a.title)));
  });

  it('should handle setSort with null values', () => {
    const state: ProductsState = {
      ...initialState,
      items: mockProducts,
      sortedItems: mockProducts
    };

    const action = setSort({ sortBy: null, sortOrder: null });
    const result = productsReducer(state, action);

    expect(result.sortBy).toBeNull();
    expect(result.sortOrder).toBeNull();
    expect(result.sortedItems).toEqual(mockProducts);
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const result = productsReducer(initialState, action);

    expect(result.status).toBe('loading');
  });

  it('should handle fetchProducts.fulfilled', () => {
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts
    };
    const result = productsReducer(initialState, action);

    expect(result.status).toBe('succeeded');
    expect(result.items).toEqual(mockProducts);
    expect(result.sortedItems).toEqual(mockProducts);
  });

  it('should handle fetchProducts.rejected', () => {
    const errorMessage = 'Failed to fetch products';
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: errorMessage }
    };
    const result = productsReducer(initialState, action);

    expect(result.status).toBe('failed');
    expect(result.error).toBe(errorMessage);
  });
}); 