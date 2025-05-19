import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { RootState, AppDispatch } from '../store';
import ProductGrid from '../components/ProductGrid';
import ProductTable from '../components/ProductTable';
import ToggleMenu from '../components/ToggleMenu';
import Spinner from '../components/Spinner';
const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, error } = useSelector((state: RootState) => state.products);
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

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
      <div className="mb-4">
        <ToggleMenu viewMode={viewMode} onToggle={setViewMode} />
      </div>
      {viewMode === 'grid' ? <ProductGrid products={products} /> : <ProductTable products={products} />}
    </div>
  );
};

export default ProductList; 