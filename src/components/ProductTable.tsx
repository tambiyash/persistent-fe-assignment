import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border">Title</th>
          <th className="py-2 px-4 border">Description</th>
          <th className="py-2 px-4 border">Category</th>
          <th className="py-2 px-4 border">Price</th>
          <th className="py-2 px-4 border">Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td className="py-2 px-4 border">{product.title}</td>
            <td className="py-2 px-4 border">{product.description}</td>
            <td className="py-2 px-4 border">{product.category}</td>
            <td className="py-2 px-4 border">${product.price}</td>
            <td className="py-2 px-4 border">{product.rating.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable; 