import React from "react";
import { RouterContext } from "./BrowserRouter";
import { createLocation } from "history";

class Link extends React.Component {
  handleClick(event, history) {
    event.preventDefault();
    history.push(this.props.to);
  }
  render() {
    const { to, ...rest } = this.props; // eslint-disable-line no-unused-vars
    return (
      <RouterContext.Consumer>
      {
        context => {
          const location =
            typeof to === "string"
              ? createLocation(to, null, null, context.location)
              : to;
          const href = location ? context.history.createHref(location) : "";
          return (
            <a
              {...rest}
              onClick={event => this.handleClick(event, context.history)}
              href={href}>
              {this.props.children}
            </a>
          )
        }
      }
      </RouterContext.Consumer>
    );
  } 
}
export default Link;