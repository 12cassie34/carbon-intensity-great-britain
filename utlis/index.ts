type FormatStyle = "full" | "short" | "long" | "medium" | undefined
export type IntensityDegree = 'low' | 'moderate' | 'high'

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

export const fetchData = async (url: string) => {
    const respon = await fetch(url)
    const json = await respon.json()

    return json
}

export const formatTime = ({ date, lang = "en-UK", dateStyle = "full", timeStyle = "short" }: FormatTimeArgs) => {
    return new Intl.DateTimeFormat(lang, {
        dateStyle: dateStyle,
        timeStyle: timeStyle
    }).format(new Date(date))
}