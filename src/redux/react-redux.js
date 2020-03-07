import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './redux'

/**
 * react-redux的作用是在react中简化使用redux
 * 1、提供Provider组件，注入store实例
 * 2、connect方式注入参数
 */

// connect返回一个高阶组件
export const connect = (mapStateToProps = state=>state, mapDispatchToProps={}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context) {
            super(props, context)
            this.state = {
                props: {}
            }
        }
        componentDidMount() {
            const {store} = this.context
            // 任何状态的变化执行回调函数
            store.subscribe(() => this.update())
            this.update()
        }
        update() {
            const {store} = this.context
            // 键值对映射
            const stateProps = mapStateToProps(store.getState())
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
            // 属性合并到组件上
            this.state = {
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            }
        }
        render() {
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

export class Provider extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return {store: this.store}
    }
    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }
    render() {
        return this.props.children
    }
}