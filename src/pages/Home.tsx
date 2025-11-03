import VideoSlider from "../com/VideoSlider"
import styles from './Home.module.scss'

const Home = () => {

    let slides = [
        { src: 'mov/mov01.mp4', title: 'Welcome to Our Site', subtitle: 'TypeScript로 만든 포트폴리오에 오신 것을 환영합니다' },
        { src: 'mov/mov02.mp4', title: 'Clean & Robust', subtitle: "TypeScript와 React로 견고하고 유지보수 쉬운 코드를 구현했습니다" },
        { src: 'mov/mov03.mp4', title: "Interactive Experience", subtitle: '사용자 친화적 UI와 인터랙티브한 기능으로 경험을 제공합니다.' },
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