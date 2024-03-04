import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from './ProductCard';
import _ from 'lodash';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedPriceRange, searchTerm]);

  const filterProducts = _.debounce(() => {
    let filtered = products;

    if (selectedCategory || selectedPriceRange || searchTerm) {
      filtered = filtered.filter((product) => {
        if (selectedCategory && product.category !== selectedCategory)
          return false;
        if (selectedPriceRange) {
          const [min, max] = selectedPriceRange
            .split('+')
            .map((range) => parseInt(range));
          if (max === undefined || max === null) {
            if (product.price < min) return false;
          } else {
            if (product.price < min || product.price > max) return false;
          }
        }
        if (
          searchTerm &&
          !product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
    }

    setFilteredProducts(filtered);
  }, 1000);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts();
  };

  return (
    <div className="container mx-auto">
      <div className="my-4 flex justify-center gap-4">
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All</option>
            <option value="laptops">laptops</option>
            <option value="smartphones">smartphones</option>
            <option value="skincare">skincare</option>
            <option value="fragrances">fragrances</option>
            <option value="groceries">groceries</option>
            <option value="home-decoration">home-decoration</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceRange">Price Range:</label>
          <select
            id="priceRange"
            onChange={handlePriceRangeChange}
            value={selectedPriceRange}
          >
            <option value="">All</option>
            <option value="1-100">$1-$100</option>
            <option value="100-200">$100-$200</option>
            <option value="200-500">$200-$500</option>
            <option value="500-1000">$500-$1000</option>
            <option value="1000+">$1000+</option>
          </select>
        </div>
        <div className="flex flex-nowrap w-96">
          <label htmlFor="search" className="w-64">
            Search by Title:
          </label>
          <input
            type="text"
            id="search"
            onChange={handleSearchTermChange}
            className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-4 placeholder-gray-500 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:placeholder-gray-400 focus:text-gray-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
