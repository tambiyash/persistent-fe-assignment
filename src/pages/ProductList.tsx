import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Product List</h1>
        <ul className="list-disc pl-5">
          {products.map(product => (
            <li key={product.id} className="text-gray-800 mb-2">{product.title}</li>
          ))}
        </ul>
      </div>
    </div>
    
  );
};

export default ProductList; 