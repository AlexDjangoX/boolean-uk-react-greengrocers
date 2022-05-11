import React, { Fragment } from 'react'

const Cart = ({ cart, addToCount, subtractFromCount, cartTotal }) => {
  return (
    <Fragment>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map(item => (
              <li key={item.id}>
                <img
                  className="cart--item-icon"
                  src={`/assets/icons/${item.id}.svg`}
                  alt={`${item.name}`}
                />
                <p>{`${item.name}`}</p>
                <button
                  className="quantity-btn remove-btn center"
                  onClick={() => subtractFromCount(item)}
                >
                  -
                </button>
                <span className="quantity-text center">{item.tally}</span>
                <button
                  className="quantity-btn add-btn center"
                  onClick={() => addToCount(item)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£{cartTotal}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </Fragment>
  )
}

export default Cart
