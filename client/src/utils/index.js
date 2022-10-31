import getDifference from './getDifference'
import groupOrdersByKey from './groupOrdersByKey'

const mapOrderData = (orderData) => {
  
  const groupedOrders = groupOrdersByKey(orderData)

  const cardData = Object.values(groupedOrders).map((_order) => {
    if (Array.isArray(_order)) {
      const mappedOrder = _order.reduce((newOrder, order, index, array) => {
        if (array[index+1]) {
          let test = getDifference(order.title, array[index + 1].title)
          const title = array[index + 1].title.split(test)[0].trim()
          newOrder.title = title
          if (index === 0) {
            newOrder.subtitle.push(`${order.quantity}x ${getDifference(title, array[0].title)}`)
            newOrder.subtitle.push(`${order.quantity}x ${test}`)
          } else {
            newOrder.subtitle.push(`${order.quantity}x ${test}`)
          }
          console.log(newOrder.subtitle)
        }
        
        const price = Number(newOrder.price) + Number(order.price)
        newOrder.price = `${price.toFixed(2)}`
        

        return newOrder
      }, {title: '', subtitle: [], price: '', image: _order[0].image})
      _order = mappedOrder
    } else {
      const title = _order.variant_title ? _order.title : _order.name
      const subtitle = _order.variant_title ? _order.variant_title : _order.name
      _order = {
        title,
        subtitle: `${_order.quantity}x ${subtitle}`,
        price: _order.price,
        image: _order.image
      }
    }
    if (Array.isArray(_order.subtitle)) {
      _order.subtitle = _order.subtitle.join(', ')
    }
    return _order
  })

  return cardData
}

export default mapOrderData