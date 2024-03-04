import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../reducers/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
    toast.success('Item removed from cart', {
      position: 'top-right',
    });
  };

  // Function to calculate GST for an item
  const calculateGST = (price) => {
    return (price * 0.28).toFixed(2); // Assuming GST rate is 28%
  };

  // Calculate total price including GST and shipping charge
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice +=
        parseFloat(item.price) + parseFloat(calculateGST(item.price)) + 10; // Adding GST and shipping charge
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-8">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>GST (28%): ${calculateGST(item.price)}</p>
                <p>Shipping Charge: $10</p>
                <p>
                  Total Price: $
                  {(
                    parseFloat(item.price) +
                    parseFloat(calculateGST(item.price)) +
                    10
                  ).toFixed(2)}
                </p>
                <p>Description: {item.description}</p>
                <p>Brand: {item.brand}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-semibold">
              Grand Total : ${calculateTotalPrice()}
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
