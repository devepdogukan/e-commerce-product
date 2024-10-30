export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  brand: string
  thumbnail: string
  images: string[]
}

export interface IBasketItem {
  quantity: number
  id: number
}

export type ContainerStore = {
  product: {
    list: IProduct[]
    filter: string
    sort: string
    loading: boolean
    error: string
  }
  basket: {
    list: IBasketItem[]
  }
}
