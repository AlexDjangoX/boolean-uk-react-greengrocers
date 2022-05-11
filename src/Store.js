import React, { useState } from 'react'
import initialStoreItems from './store-items'
import Cart from './Cart'

const Store = () => {
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [cart, setCart] = useState([])

  const addToCart = item => {
    setCart([...cart, item])
  }

  return (
    <React.Fragment>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {storeItems.map(item => (
            <li key={item.id}>
              <div className="store--item-icon">
                <img
                  src={`/assets/icons/${item.id}.svg`}
                  alt={`${item.name}`}
                />
              </div>
              <button onClick={() => addToCart(item)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </header>
      <Cart cart={cart} />
    </React.Fragment>
  )
}

export default Store
