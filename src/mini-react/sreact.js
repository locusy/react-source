/*
 * @Author: tianzhi
 * @Date: 2020-02-29 13:59:22
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-02-29 19:01:14
 */
function createElement(type, props, ...children) {
    console.log('arguments', arguments)
    let vtype;
    
    return {vtype, type, props}
}

export class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props
        this.state = {}
    }
    setState() {}
}

export default { createElement }
