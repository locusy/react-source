import React, { Component } from "react";
import { createBrowserHistory as createHistory } from "history";

export const RouterContext = React.createContext();

export default class BrowserRouter extends Component {
    static computeRootMatch(pathname) {
      return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }

    constructor(props) {
        super(props);
        this.history = createHistory(this.props);
        this.state = {
          location: this.history.location
        };
        this._isMounted = false;
        this._pendingLocation = null;
        this.unlisten = this.history.listen(location => {
          if (this._isMounted) {
            this.setState({ location });
          } else {
            this._pendingLocation = location;
          }
        }); 
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._pendingLocation) {
          this.setState({ location: this._pendingLocation });
        } 
    }

    componentWillUnmount() {
        if (this.unlisten) this.unlisten();
    }

    render() {
        return (
          <RouterContext.Provider
            children={this.props.children || null}
            value={{
              history: this.props.history,
              location: this.state.location,
              match: BrowserRouter.computeRootMatch(this.state.location.pathname)
            }}/>
        );
    }
}