import { useState, createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { Product } from "../types/products"
import type { Cart } from "../types/cart"

export interface CartContextValue {
  cart: Cart
  add: (p: Product, qty?: number) => void
  inc: (id: number) => void
  dec: (id: number) => void
  remove: (id: number) => void
  clear: () => void
  totalCount: number
  totalPrice: number
}

const CartCtx = createContext<CartContextValue | null>(null)

const CartContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>([])

  const add = (p: Product, qty: number = 1) => {
    setCart((item) => {
      const found = item.find(kk => kk.product.id === p.id)
      if (found) {
        return item.map(bb =>
          bb.product.id == p.id ? { ...bb, qty: bb.qty + Math.max(1, qty) } : bb
        )
      }
      return [...item, { product: p, qty: Math.max(1, qty) }]
    })
  }

  const inc = (id: number) => {
    setCart(item => item.map(kk =>
      kk.product.id === id ? { ...kk, qty: kk.qty + 1 } : kk
    ))
  }

  const dec = (id: number) => {
    setCart(item => item.map(kk =>
      kk.product.id === id ? { ...kk, qty: Math.max(0, kk.qty - 1) } : kk
    ))
  }

  const remove = (id: number) => {
    setCart(item => item.filter(kk => kk.product.id !== id))
  }

  const clear = () => setCart([])

  let totalCount = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalCount += item.qty
    totalPrice += item.qty * item.product.price
  })

  const value: CartContextValue = {
    cart, add, inc, dec, remove, clear, totalCount, totalPrice
  }

  return (
    <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
  )
}

export default CartContext

export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('공용 변수의 값을 받지 못햇습니다')
  return ctx
}