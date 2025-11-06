import styles from './Weather.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { WeatherAPI, WeatherData, WeatherMsg } from '../types/weather'
export { }

declare global {
    interface Window {
        kakao: any;
    }
}

const Weather = () => {

    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [time, setTime] = useState<string>("")
    const [time2, setTime2] = useState<string>("")
    const [message, setMessage] = useState<WeatherMsg>({
        title: "",
        desc: "",
        item: ""
    })
    const API_KEY = '258396f85afb2d7144f0562c0a7c6401'
    const KAKAO_KEY = '343e0b5f075239e9cdfa0bd02756e176'

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const formatTime = now.toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            })

            const formatTime2 = now.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
            })

            setTime(formatTime)
            setTime2(formatTime2)
        }

        updateTime()
        const timer = setInterval(updateTime, 60 * 1000)

        return () => clearInterval(timer)
    }, [])


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async pos => {
                const { latitude, longitude } = pos.coords

                try {
                    const { data } = await axios.get<WeatherAPI>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`)
                    const redata: WeatherData = {
                        city: data.name,
                        temp: data.main.temp,
                        icon: data.weather[0].icon,
                        desc: data.weather[0].description
                    }
                    setWeather(redata)
                } catch {
                    setError('날씨 정보를 불러오지 못했습니다')
                }

                const script = document.createElement("script")
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`
                script.onload = () => {
                    window.kakao.maps.load(() => {
                        const mapContainer = document.getElementById('map') as HTMLElement
                        const mapOption = {
                            center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
                            level: 3
                        }
                        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

                        // 마커가 표시될 위치입니다 
                        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

                        // 마커를 생성합니다
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition
                        });

                        // 마커가 지도 위에 표시되도록 설정합니다
                        marker.setMap(map);

                    }) // kakao load end
                } // script onload end
                document.body.appendChild(script)

            }, err => {
                setError('위치 정보를 가지고 오지 못했습니다')
                console.log(err);
            }
        )
    }, [])

    useEffect(() => {
        if (!weather) return
        const desc = weather.desc.toLowerCase()

        if (desc.includes('비')) {
            setMessage({
                title: "비 오는 하루☔",
                desc: "따뜻한 음료와 함께 여유를 즐겨보세요.",
                item: "보온 텀블러"
            })
        } else if (desc.includes('맑음')) {
            setMessage({
                title: "화창한 날씨☀️",
                desc: "활동적인 하루를 위한 아이템을 만나보세요.",
                item: "무선 이어폰"
            })
        } else if (desc.includes('구름')) {
            setMessage({
                title: "구름 낀 하루☁️",
                desc: "은은한 조명이 어울리는 하루예요.",
                item: "LED 무드등"
            })
        } else if (desc.includes('눈')) {
            setMessage({
                title: "눈 오는 날❄️",
                desc: "따뜻한 감성을 채워줄 홈 아이템을 만나보세요.",
                item: "플러피 쿠션 커버"
            })
        } else {
            setMessage({
                title: "오늘의 하루🌈",
                desc: "기분 좋은 하루를 위한 아이템을 추천해드려요.",
                item: "에코 머그컵"
            })
        }
    }, [weather])

    if (error) return <p>{error}</p>
    if (!weather) return null

    return (
        <div className={styles.weather}>
            <div className={styles.ment}>
                <div>오늘의 날씨는&nbsp;&nbsp;<span className={styles.mentDesc}>{weather.desc}</span> </div>
                <div>{message.title}&nbsp;&nbsp;오늘은 {message.desc}</div>
                <div>추천 아이템: <span className={styles.mentDesc}>{message.item}</span></div>
            </div>
            <div className={styles.content}>
                <div className={styles.textBox}>
                    <div className={styles.today}>오늘 날씨</div>
                    <p className={styles.time}>{time}<br />{time2}</p>
                    <div className={styles.wBox}>
                        <h2>{weather.city}</h2>
                        <h3>{weather.temp}º</h3>
                        <div className={styles.desc}>
                            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
                            <h3>{weather.desc}</h3>
                        </div>
                    </div>
                </div>
                <div id="map" className={styles.map}>지도</div>
            </div>
        </div>
    )
}

export default Weather