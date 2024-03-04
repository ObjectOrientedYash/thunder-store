import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa';
import LoadingGif from '../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { addItem } from '../reducers/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success('Item added to cart', {
      position: 'top-right',
    });
  };
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-8">Product Details</h2>
      {product ? (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <Slider {...settings} className="w-full">
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="md:col-span-1">
              <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
              <p className=" text-gray-600 mb-4">Price : ${product.price}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <p className="text-gray-600 mb-4">
                Rating: {product.rating}
                <FaStar className="inline-block text-yellow-500 mt-[-4px] ml-1" />
              </p>
              <p className="text-gray-600 mb-4">
                Discount Percentage: {product.discountPercentage}%
              </p>

              <p className=" mb-4">
                Availability :
                {product.stock > 0 ? (
                  <span className=" ml-4  font-semibold">
                    {product.stock} left
                  </span>
                ) : (
                  <span className="  ml-4 font-semibold">
                    currently this product is out of stock
                  </span>
                )}
              </p>

              <p className="text-gray-600 mb-4">Brand: {product.brand}</p>
              <p className="text-gray-600 mb-4">Category: {product.category}</p>
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <img src={LoadingGif} alt="loading....." className="w-64 h-64" />
        </div>
      )}
    </div>
  );
};

export default Details;
