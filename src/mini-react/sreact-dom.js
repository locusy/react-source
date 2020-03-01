/*
 * @Author: tianzhi
 * @Date: 2020-02-29 18:21:08
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-03-01 17:54:13
 */
function render(vdom, container) {
    container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
    // console.log('container', container)
}

export default {render}