import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '~/product-listing-app'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

test('render App component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
})
