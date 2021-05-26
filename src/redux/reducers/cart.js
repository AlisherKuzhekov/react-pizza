const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTotalPrice = arr => arr.reduce((sum, pizza) => pizza.price + sum, 0)

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_CART': {
            const currentPizzaItems = !state.items[action.payload.id]
            ? [action.payload]
            : [...state.items[action.payload.id].items, action.payload]
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            }

            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            };
        }
        case 'CLEAR_CART':
            return {items: {}, totalCount: 0, totalPrice: 0} 

        case 'REMOVE_CART_ITEM': {
            const newItems = {
                ...state.items
            }
            const itemTotalPrice = newItems[action.payload].totalPrice
            const itemTotalCount = newItems[action.payload].items.length
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount - itemTotalCount,
                totalPrice: state.totalPrice - itemTotalPrice
            }
        }

        case 'PLUS_CART_ITEM': {
            const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]]
            // const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            // const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            }
            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }

        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[action.payload].items
            const newObjItems = oldItems.length > 1 ? [...oldItems.slice(1)] : oldItems
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            }
            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        default:
            return state
    }
}

export default cart;