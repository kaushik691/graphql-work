import React from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore"



let _getAppState = () => {
  return { links: LinkStore.getAll() };
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}


export default class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }


  componentDidMount() {
    API.fetchLinks()
    LinkStore.on("change", this.onChange)
  };

  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange)
  }

  onChange() {
    console.log("4. On Change event for links.")
    this.setState(_getAppState())
  }

  render() {

    let content = this.state.links.map(link => {
      return <li className="list-group-item" key={link.id}>
        <a className="list-group-item list-group-item-action" href={link.url}>{link.title}</a>
      </li>
    })
    return (
      <ErrorBoundary>
        <div className="container">
          <h2>Hello React-Webpack component!</h2>
          <div className="row">
            <div className="col">
              <small className="text-muted"></small>
              <div className="card" style={{ width: 18 + "rem" }}>
                <div className="card-body">
                  <h5 className="card-title">LINKS</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {content}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}