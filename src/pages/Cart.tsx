import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { removeItem } from '../redux/slices/cart/cartSlice'

import '../styles/cart.scss'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { cartItems } = useSelector((state: RootState) => state.cart)

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <div className="card">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="product-image" />
                <span className="product-name">{item.name}</span>
                <span className="product-price">${item.price}</span>
                <i
                  className="fa fa-window-close action-icons"
                  onClick={() => dispatch(removeItem({ itemId: item.id }))}></i>
              </div>
            ))}
            <div className="total-price">Total: ${totalPrice}</div>
          </>
        ) : (
          <h2>No items in the cart.</h2>
        )}
      </div>
    </div>
  )
}

export default Cart
