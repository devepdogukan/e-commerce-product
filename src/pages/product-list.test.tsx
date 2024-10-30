import { screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductListPage from '~/pages/product-list'
import renderWithRedux from '~/mocks/redux'
import { productMockActions } from '~/mocks/container/actions'
import { IProduct } from '~/types/store'

jest.mock('~/components/loader', () => jest.fn(() => <div>Loading...</div>))

const mockStore = {
  product: {
    loading: false,
    list: [
      {
        id: 1,
        title: 'Apple',
        price: 100,
        thumbnail: 'http://example.com/image.jpg',
        description: 'Test Apple',
        brand: '',
        category: '',
        images: [],
      },
      {
        id: 2,
        title: 'Banana',
        price: 200,
        thumbnail: 'http://example.com/image.jpg',
        description: 'Test Banana',
        brand: '',
        category: '',
        images: [],
      },
    ] as IProduct[],
    filter: '',
    sort: 'asc',
    error: '',
  },
}

describe('ProductListPage', () => {
  it('should render loading state', async () => {
    await renderWithRedux(<ProductListPage />, {
      initialState: {
        ...mockStore,
        product: {
          ...mockStore.product,
          loading: true,
        },
      },
    })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should dispatch fetchProducts on mount', async () => {
    await renderWithRedux(<ProductListPage />, { initialState: mockStore })
    expect(productMockActions.fetchProducts).toHaveBeenCalled()
  })

  it('should render product list', async () => {
    await renderWithRedux(<ProductListPage />, { initialState: mockStore })
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('should filter products based on filter input', async () => {
    await renderWithRedux(<ProductListPage />, {
      initialState: {
        ...mockStore,
        product: {
          ...mockStore.product,
          filter: 'ap',
        },
      },
    })
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Banana')).not.toBeInTheDocument()

    const input = screen.getByPlaceholderText('Search product')

    fireEvent.change(input, { target: { value: 'Ba' } })
    expect(productMockActions.setFilter).toHaveBeenCalled()
  })

  it('should sort products in descending order', async () => {
    await renderWithRedux(<ProductListPage />, {
      initialState: {
        ...mockStore,
        product: {
          ...mockStore.product,
          sort: 'desc',
        },
      },
    })
    const productElements = screen.getAllByTestId('product-cart')
    expect(productElements[0].querySelector('h5')).toHaveTextContent(/Banana/)
    expect(productElements[1].querySelector('h5')).toHaveTextContent(/Apple/)
    const select = screen.getByTestId('product-list-select')

    fireEvent.change(select, { target: { value: 'asc' } })
    expect(productMockActions.setSort).toHaveBeenCalled()
  })
})
