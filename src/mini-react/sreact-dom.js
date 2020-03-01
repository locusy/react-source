/*
 * @Author: tianzhi
 * @Date: 2020-02-29 18:21:08
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-02-29 18:55:53
 */
function render(vdom, container) {
    container.innerHtml = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`
}

export default { render }