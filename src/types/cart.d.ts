
import type { Product } from "./products"

export interface CartItem {
    product: Product
    qty: number
}

export type Cart = CartItem[]   
