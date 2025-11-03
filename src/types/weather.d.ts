export interface WeatherAPI {
    coord?: { lon: number; lat: number }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    main: {
        temp: number
        feel_like?: number
        temp_min?: number
        temp_max?: number
        pressure?: number
        humidty?: number
    }
    wind?: {
        speed?: number
        deg?: number
    }
    sys?: {
        country?: string
        sunrise?: number
        sunset?: number
    }
    name: string
    dt?: number
}

export interface WeatherData {
    city: string
    temp: number
    icon: string
    desc: string
}