import { useCart } from "./CartContext"
import styles from './Cart.module.scss'


const Cart: React.FC = () => {

    const { cart, inc, dec, remove, clear, totalCount, totalPrice } = useCart()

    if (cart.length === 0) {
        return (
            <div className={styles.none}>
                <h1>장바구니</h1>
                <h3>선택된 상품이 없습니다</h3>
            </div>
        )
    }

    return (
        <div>
            <h1 className={styles.h2}>장바구니</h1>
            <div className={styles.container}>
                <ul className={styles.ul}>
                    {
                        cart.map(item => (
                            <li key={item.product.id} className={styles.outBox}>
                                <img src={item.product.image} alt={item.product.title} className={styles.img} />
                                <div className={styles.info}>
                                    <h3>{item.product.title}</h3>
                                    <div>{(item.qty * item.product.price).toLocaleString()}원</div>
                                    <div className={styles.btns}>
                                        <button className={styles.btn} onClick={() => dec(item.product.id)}>-</button>
                                        <span>{item.qty}</span>
                                        <button className={styles.btn} onClick={() => inc(item.product.id)}>+</button>
                                    </div>
                                    <button className={styles.reBtn} onClick={() => remove(item.product.id)}>상품삭제</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className={styles.totalBox}>
                    <div className={styles.totalC}>총 수량: <strong>{totalCount}</strong>개</div>
                    <div>총 금액: <strong>{totalPrice.toLocaleString()}</strong>원</div>
                    <button className={styles.clear} onClick={() => clear()}>전체 비우기</button>
                </div>
            </div>
        </div>
    )
}

export default Cart