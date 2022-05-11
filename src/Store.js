import React, { useState } from 'react'
import initialStoreItems from './store-items'
import Cart from './Cart'

const Store = () => {
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [cart, setCart] = useState([])

  const [cartTotal, setCartTotal] = useState(0)

  let count = 0
  const cartTotalAmount = () => {
    for (let item of storeItems) count += item.tally * item.price
    setCartTotal(count)
  }

  const addToCount = item => {
    setStoreItems(
      storeItems.map(el => {
        if (el.id === item.id) {
          el.tally += 1
        }
        return el
      })
    )
    cartTotalAmount()
  }

  const subtractFromCount = item => {
    setStoreItems(
      storeItems.map(el => {
        if (el.id === item.id) {
          if (el.tally > 0) el.tally -= 1
          if (el.tally === 0) removeEmptyCart(el.id)
        }
        return el
      })
    )
    cartTotalAmount()
  }

  const removeEmptyCart = el => {
    setCart(cart.filter(item => item.id !== el))
  }

  const addToCart = item => {
    if (!cart.includes(item)) setCart([...cart, item])
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
      <Cart
        cart={cart}
        addToCount={addToCount}
        subtractFromCount={subtractFromCount}
        cartTotal={cartTotal}
      />
    </React.Fragment>
  )
}

export default Store

// const subtractFromCount = item => {
//     console.log('23.. subtracting')
//     const updatedTally = storeItems.map(el =>
//       el.id === item.id ? { ...el, tally: (el.tally -= 1) } : el
//     )
//     setStoreItems(updatedTally)
//   }

//   const subtractFromCount = item => {
//     setStoreItems(
//       storeItems.map(el => {
//         return el.id === item.id ? { ...el, tally: (el.tally -= 1) } : el
//       })
//     )
//   }
