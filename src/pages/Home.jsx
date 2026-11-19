import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = [
  'All',
  ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError('Unable to load investment products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="home">
      <h1>Discover Investment Opportunities</h1>

      <p>
        Explore investment products designed to help you achieve your
        financial goals.
      </p>

      <section className="products-section">
        <h2>Available Investment Products</h2>
        <div className="product-filters">
          <input
            type="text"
            placeholder="Search investment products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading && <p>Loading products...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p>No matching investment products available.</p>
        )}

        <div className="product-list">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Minimum Investment: ₦{product.minimumInvestment.toLocaleString('en-NG')}</p>
              <p>Duration: {product.duration}</p>
              <p>Risk: {product.risk}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;