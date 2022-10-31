import { useEffect, useState } from "react"
import axios from 'axios';
import mapOrderData from "src/utils";

const useGetOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('https://frontendtest.huel.io/api/line-items')
      if (data?.line_items?.length) {
        const mappedOrderData = mapOrderData(data.line_items)
        setOrders(mappedOrderData)
        setIsLoading(false)
      }
    }
    catch(err) {
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return {orders, isLoading, error}
}

export default useGetOrders