import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center">
          <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-4 rounded" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">{product.title}</h3>
          <p className="text-yellow-600 font-semibold mb-2">${product.price}</p>
          <p className="text-gray-600">Rating: {product.rating.rate}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 