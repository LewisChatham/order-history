import getDifference from './getDifference'
import groupOrdersByKey from './groupOrdersByKey'

// function to get readable order data.
const mapOrderData = (orderData) => {
  
  // firstly group common items into a single array based on properties: key value
  const groupedOrders = groupOrdersByKey(orderData)

  // map through the grouped orders to find the ones that have been saved as arrays, and create an object from common data.
  const cardData = Object.values(groupedOrders).map((_order) => {
    if (Array.isArray(_order)) {
      // if the order is an array, accumulate a new object from array data.
      const mappedOrder = _order.reduce((newOrder, order, index, array) => {
        // if there is another item in the array after current index, compare them
        if (array[index+1]) {
          // compare both titles and split based on the difference in the strings.
          let test = getDifference(order.title, array[index + 1].title)
          // save the common part of the title as title.
          const title = array[index + 1].title.split(test)[0].trim()
          // assign the title to the new object title value
          newOrder.title = title
          // if this is the first item in the array, create the subtitle for [0] index and [1] index simultaneously.
          if (index === 0) {
            // use order quantity and difference in titles to create the order subtitles
            newOrder.subtitle.push(`${order.quantity}x ${getDifference(title, array[0].title)}`)
            // test is equal to index + 1 so this is the next comparison at the same time.
            newOrder.subtitle.push(`${order.quantity}x ${test}`)
          } else {
            // continue comparing items in the array at index + 1 so we don't error on last item.
            newOrder.subtitle.push(`${order.quantity}x ${test}`)
          }
        }
        // convert prices of the new objects price and the order price to number and add them together to get the final price of the order.
        const price = Number(newOrder.price) + Number(order.price)
        newOrder.price = `${price.toFixed(2)}`
        

        return newOrder
        // directly save image from the first item in the array.
        // NOTE: realised too late that there was a _type control property, this should have been the default data.
      }, {title: '', subtitle: [], price: '', image: _order[0].image})
      // save the new objects back to the card data map
      _order = mappedOrder
      // if the order isn't an array, i.e single item, then get the card data from the object and save back to the map
    } else {
      // if there are variants, use title, if not use name.
      const title = _order.variant_title ? _order.title : _order.name
      // if there are variants, use the variant title for subtitle.
      const subtitle = _order.variant_title ? _order.variant_title : _order.name
      _order = {
        title,
        subtitle: `${_order.quantity}x ${subtitle}`,
        price: _order.price,
        image: _order.image
      }
    }
    // if the subtitle is an array, i.e multiple items, join them by a comma.
    if (Array.isArray(_order.subtitle)) {
      _order.subtitle = _order.subtitle.join(', ')
    }
    return _order
  })

  return cardData
}

export default mapOrderData