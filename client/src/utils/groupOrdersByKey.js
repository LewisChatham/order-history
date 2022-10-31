function groupOrdersByKey(orderData) {
  return orderData.reduce((orders, order) => {
    let id = ""
    if(order.properties.length) {
      order.properties.map((property) => {
        if (property.name === "_key") {
          id = property.value
          if (Array.isArray(orders[id])) {
            orders[id].push(order)
          } else {
            orders[id] = [order]
          }
        }
      })
    } else {
      id = order.id
      orders[id] = order
    }
    return orders

  }, {})
}

export default groupOrdersByKey