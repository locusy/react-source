import React, { Component } from "react";
import { RouterContext } from "./BrowserRouter";
import matchPath from "./matchPath";

export default class Route extends Component {
    render() {
      return (
        <RouterContext.Consumer>
            {context => {
            const location = this.props.location || context.location;
            const match = this.props.computedMatch
                ? this.props.computedMatch // <Switch> already computed the match for us
                : this.props.path
                ? matchPath(location.pathname, this.props)
                : context.match;
            const props = { ...context, location, match };
            let { children, component, render } = this.props;
            // 若未传递children属性，则默认为null
            if (Array.isArray(children) && children.length === 0) {
                children = null;
          }
          if (typeof children === "function") {
            children = children(props);
            }
        return (
            <RouterContext.Provider value={props}>
            {children && React.Children.count(children) > 0
                ? children
                : props.match
                ? component
                ? React.createElement(component, props)
                : render
                ? render(props)
                : null
                : null}
            </RouterContext.Provider>
        ); 
        }}
</RouterContext.Consumer>
);
} 
}