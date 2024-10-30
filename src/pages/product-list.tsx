import { useEffect, useMemo } from 'react'
import Loading from '~/components/loader'
import ProductCart from '~/components/product-cart'
import useAppSelector from '~/utils/use-app-selector'
import withActions, { IWithActions } from '~/utils/with-actions'

const ProductListPage = ({ actions, dispatch }: IWithActions) => {
  const { loading, list, filter, sort } = useAppSelector(
    (state) => state.product,
  )

  useEffect(() => {
    dispatch!(actions!.product.fetchProducts())
  }, [])

  const filteredProducts = useMemo(() => {
    if (!filter) return list
    return list.filter((product) =>
      product.title.toLowerCase().includes(filter.toLowerCase()),
    )
  }, [list, filter])

  const sortedProducts = filteredProducts.toSorted((a, b) => {
    if (sort === 'asc') {
      return a.title.localeCompare(b.title)
    }
    return b.title.localeCompare(a.title)
  })

  if (loading) return <Loading />

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Product list
        <small className="font-semibold"> ({list.length}) count</small>
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search product"
          value={filter}
          onChange={(e) =>
            dispatch!(actions!.product.setFilter(e.target.value))
          }
          className="border rounded p-2 mr-2"
        />
        <select
          value={sort.toString()}
          data-testid="product-list-select"
          onChange={(e) => dispatch!(actions!.product.setSort(e.target.value))}
          className="border rounded p-2"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCart {...product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default withActions(ProductListPage)
