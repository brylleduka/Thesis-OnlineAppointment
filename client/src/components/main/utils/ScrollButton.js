import React from "react";
import { Icon } from "semantic-ui-react";
import "./scroll.css";

class ScrollButton extends React.Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(
      0,
      window.pageYOffset - (this.props.scrollPx ? this.props.scrollPx : "100")
    );
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delay ? this.props.delay : "16.66"
    );
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <button
        title="Back to top"
        className="scroll"
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <Icon
          name="chevron circle up"
          size="large"
          circular
          className="arrow-up"
        />
      </button>
    );
  }
}
export default ScrollButton;
