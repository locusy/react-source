/*
 * @Author: tianzhi
 * @Date: 2020-02-29 18:21:08
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-03-01 22:42:35
 */
import initVdom from './svdom'

function render(vdom, container) {
    // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
    const node = initVdom(vdom)
    container.appendChild(node)
}

export default { render }