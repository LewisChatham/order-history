import { PropsWithChildren } from "react"
import './ItemCard.css'

// create a type declaration for the order object
type Order = {
  title: string,
  subtitle: string,
  price: string,
  image: string,
}

type ItemCardProps = {
  order: Order
}

const ItemCard = (props:PropsWithChildren<ItemCardProps>) => {

  // destructure the key:values for the card from order prop
  const {title, subtitle, price, image} = props.order

  return (
    <div className="item-card">
      <div className="image-container">
        <img src={image} alt="" />
      </div>
      <div className="item-details">
        <div className="item-title-price">
          <p>{title}</p>
          <p>${price}</p>
        </div>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default ItemCard