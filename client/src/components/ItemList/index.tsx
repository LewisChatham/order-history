import useGetOrders from "src/hooks/useGetOrders"
import ItemCard from "./ItemCard"
import './ItemList.css'

const ItemList = () => {

  const {orders, isLoading, error} = useGetOrders()

  console.log(orders)

  if(isLoading) return <div>loading...</div>

  const ItemCards = orders.map((order) => <ItemCard key={order.title} order={order} />)

  return (
    <div className="item-list-container">
      {ItemCards}
    </div>
  )
}

export default ItemList