import { useEffect, useState } from "react";
import fetchDataFromApi from "../utils/axiosInstance";

const useFetch = (url) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setData(null)
        setError(null)

        const fetchData = async () => {
            try {
                const result = await fetchDataFromApi(url)
                setLoading(false)
                setData(result)
            } catch (error) {
                setLoading(false)
                setError(error.response)
            }
        }

        fetchData()
    }, [url])

    return {data, error, loading}
}

export default useFetch