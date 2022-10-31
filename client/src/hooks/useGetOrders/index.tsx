import { useEffect, useState } from "react"
import axios from 'axios';
import mapOrderData from "src/utils";

// function to fetch the order data and set a usable version to state.
const useGetOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchOrders = async () => {
    // simple loading control
    setIsLoading(true)
    try {
      // fetch and destructure data from response
      const { data } = await axios.get('https://frontendtest.huel.io/api/line-items')
      // if data exists, map the data
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

  // run once on load
  // if order data would change, could be improved to check against state/props so it runs when these are changed
  useEffect(() => {
    fetchOrders()
  }, [])

  return {orders, isLoading, error}
}

export default useGetOrders