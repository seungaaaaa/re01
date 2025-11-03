import { useEffect, useState } from "react"
import axios from "axios"
import { useCart } from './CartContext'
import styles from './Products.module.scss'
import type { Product } from "../types/products"

const Products: React.FC = () => {

    const [list, setList] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const { cart, add, inc, dec } = useCart()

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axios.get<Product[]>('products.json')
                setList(data)
            } catch (err) {
                setError('상품목록을 불러오지 못했습니다')
                console.error(err)
            }
        }
        load()
    }, [])

    const getQty = (id: number) => {
        const found = cart.find(kk => kk.product.id === id)
        return Math.max(found ? found.qty : 0, 0)
    }

    if (error) return <div style={{ color: 'red', padding: 20 }} >{error}</div>

    return (
        <div className={styles.products}>
            <h1>상품 소개</h1>
            <div className={styles.gridBox}>
                {
                    list.map(item => {
                        const qty = getQty(item.id)
                        return (
                            <article key={item.id} className={styles.card}>
                                <img src={item.image} alt={item.title} className={styles.imgs} />
                                <div className={styles.info}>
                                    <h3>{item.title}</h3>
                                    <p>{item.price.toLocaleString()}원</p>
                                </div>
                                <div>
                                    {qty === 0 ? (
                                        <button onClick={() => add(item, 1)} className={styles.btn}>담기(상품선택)</button>
                                    ) : (
                                        <div className={styles.btnOutBox}>
                                            <button className={styles.btns} onClick={() => dec(item.id)} aria-label={'빼기'}>-</button>
                                            <span>{qty}</span>
                                            <button className={styles.btns} onClick={() => inc(item.id)} aria-label={'더하기'}>+</button>
                                        </div>
                                    ) // 삼합연산자문법 end 
                                    }
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products