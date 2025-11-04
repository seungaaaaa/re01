import VideoSlider from "../com/VideoSlider"
import styles from './Home.module.scss'

const Home = () => {

    let slides = [
        { src: 'mov/mov01.mp4', title: 'Welcome to My Portfolio', subtitle: '포트폴리오 사이트에 오신 걸 환영합니다.' },
        { src: 'mov/mov02.mp4', title: 'React & TypeScript', subtitle: 'React와 TypeScript를 사용해 구조적이고 유지보수가 쉬운 코드를 작성했습니다.' },
        { src: 'mov/mov03.mp4', title: "Simple Store", subtitle: '상품을 구경하고 장바구니에 담고, 후기까지 볼 수 있는 간단한 사이트입니다.' },
    ]

    return (
        <div className={styles.home}>
            <div className={styles.sb}>
                <VideoSlider slides={slides} />
            </div>
        </div>
    )
}

export default Home