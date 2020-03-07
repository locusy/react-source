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
  * applyMiddleware的核心作用是强化dispatch 让他执行中间件
  */
export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        console.log('args', args)
        const store = createStore(...args)
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const middlewareChain = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs) {
    if(funcs.length) {
        return args => args
    }
    if(funcs.length == 1) {
        return funcs[0]
    }
    // 先执行left，再执行right，最后返回一个函数
    return reduce((left, right) => (...args) => right(left(...args)))
}   

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
} 

export function bindActionCreators(creators, dispatch) {
    return Object.keys(creators).reduce((ret, item) => {
        ret[item] = bindActionCreator(creators[item], dispatch)
        return ret
    }, {})
}   


