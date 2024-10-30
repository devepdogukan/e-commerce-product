const emptyMockFn = jest.fn(() => () => {
  return Promise.resolve()
})

export const basketMockActions = {
  addBasket: emptyMockFn,
}

export const productMockActions = {
  setFilter: emptyMockFn,
  setSort: emptyMockFn,
  fetchProducts: emptyMockFn,
}

export default {
  basket: basketMockActions,
  product: productMockActions,
}
