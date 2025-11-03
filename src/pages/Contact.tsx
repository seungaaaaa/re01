import type { Review } from "../types/contact"
import axios from "axios"
import styles from './Contact.module.scss'
import { useEffect, useState } from "react"



const Contact: React.FC = () => {

    const [review, setReview] = useState<Review[]>([])

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axios.get<Review[]>('contact.json')
                setReview(data)
            } catch (err) {
                console.error(err)
            }
        }
        load()
    }, [])

    return (
        <div className={styles.contact}>
            <h2>상품후기</h2>
            <div className={styles.reviewBox}>
                {
                    review.map(item => (
                        <div key={item.id} className={styles.reviewCard}>
                            <div className={styles.imgBox}><img src={item.image} alt='img' /></div>
                            <div className={styles.text}>
                                <p>아이디: {item.user}</p>
                                <div className={styles.product}>상품: {item.product}</div>
                                <div className={styles.rating}>평점: {item.rating}</div>
                                <div className={styles.content}>"{item.content}"</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Contact