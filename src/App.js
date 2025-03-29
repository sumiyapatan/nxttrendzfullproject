import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeallitems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterid = cartList.filter(each => each.id !== id)
    this.setState({cartList: filterid})
  }

  onincrementquantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === id) {
          const increaseof = each.quantity + 1
          return {...each, quantity: increaseof}
        }
        return each
      }),
    }))
  }

  ondecrementquantity = id => {
    const {cartList} = this.state
    const filterids = cartList.find(each => each.id === id)
    if (filterids.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === id) {
            const decreaseof = each.quantity - 1
            return {...each, quantity: decreaseof}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const filterids = cartList.find(each => each.id === product.id)
    if (filterids) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === filterids.id) {
            const updateof = each.quantity + product.quantity
            return {...each, quantity: updateof}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeallitems,
          incrementCartItemQuantity: this.onincrementquantity,
          decrementCartItemQuantity: this.ondecrementquantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
