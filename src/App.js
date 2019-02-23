import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router";
import { ROUTES } from "./constants/constants";
import RockabillyPullScreen from "./containers/RockabillyPullScreen/RockabillyPullScreen";

class App extends React.Component {
  static propTypes = {
    resetDelay: PropTypes.number
  };
  static defaultProps = {
    resetDelay: 60000
  };
  componentDidMount() {
    this.touchListener = document.body.addEventListener(
      "touchstart",
      this.resetTimer
    );
    this.clickListener = document.body.addEventListener(
      "click",
      this.resetTimer
    );
  }
  resetTimer = () => {
    const { resetDelay } = this.props;
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(this.reset, resetDelay);
  };
  reset = () => {
    const { history } = this.props;
    history.push(ROUTES.PULLSCREEN);
    window.location.reload(); // reload the whole page
  };
  handleCloseSite = () => {
    const { location } = this.props;
    if (location.pathname !== ROUTES.MAINSCREEN) {
      const { history } = this.props;
      history.goBack();
    }
  };
  render() {
    const { location } = this.props;
    return (
      <div>
        <Switch>
          <Route
            exact
            path={ROUTES.PULLSCREEN}
            component={RockabillyPullScreen}
          />
          {/*<Route path={ROUTES.MAINSCREEN} component={SpyingMainScreen} />*/}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
