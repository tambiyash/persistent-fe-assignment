import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSort } from '../store/productsSlice';
import { RootState, AppDispatch } from '../store';
import ProductGrid from '../components/ProductGrid';
import ProductTable from '../components/ProductTable';
import ToggleMenu from '../components/ToggleMenu';
import Spinner from '../components/Spinner';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sortedItems: products, status, error, sortBy, sortOrder } = useSelector((state: RootState) => state.products);
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (status === 'idle' && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSort = (sortBy: 'price' | 'name', sortOrder: 'asc' | 'desc') => {
    dispatch(setSort({ sortBy, sortOrder }));
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <ToggleMenu viewMode={viewMode} onToggle={setViewMode} />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSort('price', sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded transition-colors ${
              sortBy === 'price' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('name', sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded transition-colors ${
              sortBy === 'name' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      {viewMode === 'grid' ? <ProductGrid products={products} /> : <ProductTable products={products} />}
    </div>
  );
};

export default ProductList; 