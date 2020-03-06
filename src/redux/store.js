export function createStore(reducer, enhancer) {
    if(enhancer) {
        return enhancer(createStore)(reducer)
    }
    let currentState = []
    let currentListensers = []

    function getState() {
        return currentState
    }

    /**
     * 订阅监听 一旦state出现变化将会更新所有
     */
    function subscribe(listenser) {
        currentListensers.push(listenser)
    }
    function dispatch(action) {
        currentState = reducer(action, currentState)
        currentListensers.forEach(v => v())
        return action
    }
    dispatch({type: 'yogget'})
    return { getState, subscribe, dispatch }
}

 /**
  * 对中间件进行处理
  */
export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        console.log('args', args)
    }
}


