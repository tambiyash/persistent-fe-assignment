import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4">
        <section role="region" aria-label="About Us" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Us</h2>
          <p className="text-gray-600">
            Welcome to our products store! We offer a wide range of products with competitive prices and excellent customer service.
          </p>
        </section>
        <section role="region" aria-label="Features" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Wide selection of products</li>
            <li>Fast shipping and delivery</li>
            <li>Secure payment options</li>
            <li>24/7 customer support</li>
          </ul>
        </section>
        <section role="region" aria-label="Contact Us" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or need assistance? Reach out to us at <a href="mailto:tambiyash@gmail.com" className="text-yellow-600 hover:underline">tambiyash@gmail.com</a>.
          </p>
          <p className="text-gray-600">
            See Yash Tambi's portfolio <a href="https://portfolio-web-phi-six.vercel.app/" className="text-yellow-600 hover:underline">here</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
