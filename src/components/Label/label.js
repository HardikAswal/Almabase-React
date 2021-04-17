import React from "react";

export default class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      x: "",
      y: "",
      fontSize: 0,
      fontWeight: 0,
    };
  }

  getStyle = () => {
    const { x, y, fontSize, fontWeight } = this.state;

    let style = {
      position: "absolute",
      top: x,
      left: y,
      fontSize,
      fontWeight,
    };

    return style;
  };

  render() {
    const { text, x, y, fontSize, fontWeight } = this.state;

    return (
      <label
        style={{
          position: "absolute",
          top: x,
          left: y,
          fontSize,
          fontWeight,
        }}
      >
        {text}
      </label>
    );
  }
}
