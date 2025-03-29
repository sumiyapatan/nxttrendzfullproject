// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0

      cartList.forEach(each => {
        total += each.price * each.quantit
      })

      return (
        <div className="summary-container">
          <h1 className="summary">
            Order Total:<span className="spanel">Rs {total}/-</span>
          </h1>
          <div className="divof">
            <p className="lengthof">{cartList.length} items in cart</p>
            <button type="button" className="btnsummary">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
