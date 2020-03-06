import React, {Component} from './react-mini/sreact';
import ReactDOM from './react-mini/sreact-dom';

// 函数类型组件
function Comp(props) {
    return (
        <h2>
            {props.name}
        </h2>
    )
}

// class类型组件
class Comp1 extends Component {
    render() {
        return (
            <div>
                类组件
            </div>
        )
    }
}

const sports = [
    {
        name: 'basketball',
        feature: 'jumper'
    },
    {
        name: 'basketball',
        feature: 'jumper'
    }
]
// jsx就是js对象，就是vdom
const jsx = (
    <div id="yeah" className="bingo">
        <h1>什么是</h1>
        <Comp name="函数组件" />
        <Comp1 name="类组件" />
        {sports.map(elem => (`${elem.name}:${elem.feature}`))}
    </div>
)

// 在官网https://reactjs.org/首页下面查看实时效果
// 上面的jsx代码等价于
// const jsx = (
    // React.createElement(
    //     "div",
    //     {id: "yeah", className: "bingo"},
    //     "什么是",
    //      React.createElement(Comp, { name: "你的名字" })
    // )
// )

console.log('jsx', jsx)

// import * as serviceWorker from './serviceWorker';

// react会检测jsx文件中的模版代码 它的createElement方法将jsx转化成虚拟dom => 
// ReactDOM的render方法再将vdom挂载到真实dom上
ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
