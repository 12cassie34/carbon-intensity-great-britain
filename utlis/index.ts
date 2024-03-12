type FormatStyle = 'full' | 'long' | 'medium' | 'short' | undefined
export type IntensityDegree = 'low' | 'moderate' | 'high'
export type PageRoutes = 'search-historical-data' | 'carbon-generation-from'

interface FormatTimeArgs {
    date: string,
    lang?: string,
    dateStyle?: FormatStyle,
    timeStyle?: FormatStyle,
}

export interface IntensityData {
    from: string
    to: string
    intensity: {
        forecast: number
        actual: number
        index: IntensityDegree
    }
}

export interface BarChartData {
    time: string,
    value: number,
    degree: IntensityDegree
}

export const INTENSITY_UNIT = 'g/kWh'
export const FULL_DATE_FORMAT = 'dd MMMM yyy'

export const isPageRouteName = (value: unknown): value is PageRoutes => typeof value === 'string'

export const fetchData = async (url: string) => {
    const respon = await fetch(url)
    const json = await respon.json()

    return json
}

export const formatTime = ({ date, lang = 'en-UK', dateStyle, timeStyle = 'short' }: FormatTimeArgs) => {
    return new Intl.DateTimeFormat(lang, {
        dateStyle: dateStyle,
        timeStyle: timeStyle
    }).format(new Date(date))
}

export const formatBarChartData = (data: IntensityData[], isForecast?: boolean): BarChartData[] => {
    return data.map(d => {
        return {
            time: d.from,
            value: isForecast ? d.intensity.forecast : d.intensity.actual,
            degree: d.intensity.index
        }
    })
}