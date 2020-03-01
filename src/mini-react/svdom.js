/*
 * @Author: tianzhi
 * @Date: 2020-03-01 21:56:11
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-03-01 22:54:35
 */
function initVdom(vnode) {
    let { vtype } = vnode

    // 文本节点
    if(!vtype) {
        return document.createTextNode(vnode)
    }

    if(vtype === 1) {
        // 原生标签
        return createNativeElement(vnode)
    } else if (vtype === 2) {
        // 函数
        return createFuncElement(vnode)
    } else {
        // 类
        return createClassElement(vnode)
    }
}

function createNativeElement(vnode) {
    const { type, props } = vnode
    const node = document.createElement(type)
    const { key, children, ...rests } = props
    Object.keys(rests).forEach(k => {
        if(k === 'className') {
            node.setAttribute('class', rests[k])
        } else if(k === 'htmlfor') {
            node.setAttribute('for', rests[k])
        } else {
            node.setAttribute(k, rests[k])
        }
    })

    // 子元素递归调用
    children.forEach(v => {
        if(Array.isArray(v)) {
            v.map(n => node.appendChild(initVdom(n)))
        } else {
            node.appendChild(initVdom(v))
        }
    })

    return node
}

function createFuncElement(vnode) {
    const { type, props }  = vnode
    const vdom = type(props)
    return initVdom(vdom)
}

function createClassElement(vnode) {
    const { type, props }  = vnode
    const component = new type(props)
    const vdom = component.render()
    return initVdom(vdom)
}

export default initVdom