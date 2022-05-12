import React, { useState } from 'react'
import initialStoreItems from './store-items'
import Cart from './Cart'
import Calculator from './Calculator'
import { Checkbox } from '@nextui-org/react'
import { Button, Grid } from '@nextui-org/react'

const filterByVegetables = storeItemList =>
  storeItemList.filter(item => item.type === 'vegetable')

const filterByFruit = storeItemList =>
  storeItemList.filter(item => item.type === 'fruit')

const sortAlphabetically = storeItemList =>
  storeItemList.sort((a, b) => a.name.localeCompare(b.name))

const Store = () => {
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  const [showFruits, setShowFruits] = useState(false)
  const [showVeg, setShowVeg] = useState(false)
  const [sortAlpha, setSortAlpha] = useState(false)

  const [calculatorVisible, setCalculatorVisible] = useState(false)

  const hideCalculator = () => {
    setCalculatorVisible(false)
  }

  const showCalculator = () => {
    setCalculatorVisible(true)
  }

  let count = 0
  const cartTotalAmount = () => {
    for (let item of storeItems) count += item.tally * item.price
    setCartTotal(Number(count.toFixed(2)))
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
    setStoreItems(
      storeItems.map(el => {
        if (el.id === item.id) {
          el.tally = 1
        }
        return el
      })
    )

    cartTotalAmount()
  }

  const setFruitsOnly = () => {
    if (!showFruits) setShowFruits(true)
    if (showFruits) setShowFruits(false)
  }

  const setVegOnly = () => {
    showVeg ? setShowVeg(false) : setShowVeg(true)
  }

  const sort = () => {
    sortAlpha ? setSortAlpha(false) : setSortAlpha(true)
    console.log(sortAlpha)
  }

  const conditionalRender = () => {
    let filteredItems = [...storeItems]
    if (showFruits) filteredItems = filterByFruit(filteredItems)
    if (showVeg) filteredItems = filterByVegetables(filteredItems)
    if (showFruits && showVeg) filteredItems = storeItems

    if (sortAlpha) filteredItems = sortAlphabetically(filteredItems)

    return filteredItems
  }

  return (
    <React.Fragment>
      <header id="store">
        <div className="sorting-buttons">
          <Checkbox
            color="secondary"
            labelColor="secondary"
            type="checkbox"
            onChange={setFruitsOnly}
          >
            Fruit
          </Checkbox>
          <Checkbox
            color="success"
            labelColor="success"
            type="checkbox"
            onChange={setVegOnly}
          >
            Veg
          </Checkbox>
          <Checkbox
            color="warning"
            labelColor="warning"
            type="checkbox"
            onChange={sort}
          >
            Sort
          </Checkbox>
          <Grid.Container gap={4}>
            <Grid>
              <Button
                auto
                color="secondary"
                rounded
                flat
                onPress={showCalculator}
              >
                Calculator
              </Button>
            </Grid>
          </Grid.Container>
        </div>
        <h1>Greengrocers</h1>
        {calculatorVisible && <Calculator hideCalculator={hideCalculator} />}

        <ul className="item-list store--item-list">
          {conditionalRender().map(item => (
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
//   const updatedTally = storeItems.map(el =>
//     el.id === item.id ? { ...el, tally: (el.tally -= 1) } : el
//   )
//   setStoreItems(updatedTally)
// }

// const subtractFromCount = item => {
//   setStoreItems(
//     storeItems.map(el => {
//       return el.id === item.id ? { ...el, tally: (el.tally -= 1) } : el
//     })
//   )
// }
