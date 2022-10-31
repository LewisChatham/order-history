function groupOrdersByKey(orderData) {
  // accumulate a new object
  return orderData.reduce((orders, order) => {
    let id = ""
    // if order contains properties then map through to find the key value (only common data between similar products)
    if(order.properties.length) {
      order.properties.map((property) => {
        if (property.name === "_key") {
          id = property.value
          // accumulate an array of orders with the same key value
          if (Array.isArray(orders[id])) {
            orders[id].push(order)
          } else {
            orders[id] = [order]
          }
        }
      })
      // if no key value, assign order object instead of array.
    } else {
      id = order.id
      orders[id] = order
    }
    return orders

  }, {})
}

export default groupOrdersByKey