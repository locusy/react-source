import initVdom from './svdom'

function render(vdom, container) {
    // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
    
    const node = initVdom(vdom)
    container.appendChild(node)
}


export default { render }