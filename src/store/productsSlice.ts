import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
type SortBy = 'price' | 'name' | null;
type SortOrder = 'asc' | 'desc' | null;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  items: Product[];
  status: Status;
  error: string | null;
  sortBy: SortBy;
  sortOrder: SortOrder;
  sortedItems: Product[];
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  sortBy: null,
  sortOrder: null,
  sortedItems: [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
      
      if (!sortBy || !sortOrder) {
        state.sortedItems = state.items;
        return;
      }

      state.sortedItems = [...state.items].sort((a, b) => {
        if (sortBy === 'price') {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else {
          return sortOrder === 'asc' 
            ? a.title.localeCompare(b.title) 
            : b.title.localeCompare(a.title);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.sortedItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSort } = productsSlice.actions;

export default productsSlice.reducer; 