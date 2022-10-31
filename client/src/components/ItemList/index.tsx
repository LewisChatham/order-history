import useGetOrders from "src/hooks/useGetOrders"
import ItemCard from "./ItemCard"
import './ItemList.css'

const ItemList = () => {

  // call useGetOrders hook and destructure order data
  const {orders, isLoading} = useGetOrders()

  // basic loading state
  if(isLoading) return <div>loading...</div>

  // map the grouped orders into cards to be rendered in the container.
  // to improve this, I would use the order ID as the key prop.
  const ItemCards = orders.map((order) => <ItemCard key={order.title} order={order} />)

  return (
    <div className="item-list-container">
      {ItemCards}
    </div>
  )
}

export default ItemList