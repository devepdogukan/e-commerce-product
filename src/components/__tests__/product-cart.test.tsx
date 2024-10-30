import { fireEvent, screen } from '@testing-library/react'
import renderWithRedux from '~/mocks/redux'
import { basketMockActions } from '~/mocks/container/actions'
import ProductCart from '~/components/product-cart'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  thumbnail: 'http://example.com/image.jpg',
  description: 'Test description',
}

describe('ProductCard Component', () => {
  test('renders ProductCard component', async () => {
    await renderWithRedux(<ProductCart {...mockProduct} />)

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  test('add item to basket', async () => {
    await renderWithRedux(<ProductCart {...mockProduct} />)

    const addButton = screen.getByText('Add to cart')
    fireEvent.click(addButton)
    expect(basketMockActions.addBasket).toHaveBeenCalledWith({ id: 1 })
  })
})
