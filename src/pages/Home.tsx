import VideoSlider from "../com/VideoSlider"
import styles from './Home.module.scss'

const Home = () => {

    let slides = [
        { src: 'mov/mov01.mp4', title: 'Item4U, 당신을 위한 선택', subtitle: '작은 아이템 하나로 달라지는 일상의 즐거움을 만나보세요.' },
        { src: 'mov/mov02.mp4', title: 'Fill Your Space', subtitle: '집과 생활을 더 특별하게 만들어주는 감각적인 아이템을 소개합니다.' },
        { src: 'mov/mov03.mp4', title: "Find Your Favorites", subtitle: '당신의 취향에 맞는  아이템을 구경하고, 장바구니에 담아 간편하게 쇼핑하세요.' },
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