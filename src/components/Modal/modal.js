import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      x: 0,
      y: 0,
      fontSize: 12,
      fontWeight: 100,
    };
  }

  componentDidMount() {
    const { x, y, selected, currentElementText } = this.props;
    let text = !currentElementText
      ? `This is a ${selected}`
      : currentElementText;
    this.setState({
      ...this.state,
      x,
      y,
      text,
    });
  }

  handleInput = (e) => {
    this.setState(
      {
        ...this.state,
        [e.target.name]: e.target.value,
      },
      console.log(this.state)
    );
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const { text, x, y, fontSize, fontWeight } = this.state;
    const { cX, cY, selected } = this.props;

    return (
      <div className="modal-wrapper">
        <div>Edit {selected}</div>
        <br />
        <label>Text</label>
        <br />
        <input
          type="text"
          name="text"
          onChange={(e) => this.handleInput(e)}
          value={text}
        />
        <br />
        <label>x</label>
        <br />
        <input
          type="text"
          name="x"
          onChange={(e) => this.handleInput(e)}
          value={x}
        />
        <br />
        <label>y</label>
        <br />
        <input
          type="text"
          name="y"
          onChange={(e) => this.handleInput(e)}
          value={y}
        />
        <br />
        <label>Font Size</label>
        <br />
        <input
          type="text"
          name="fontSize"
          onChange={(e) => this.handleInput(e)}
          value={fontSize}
        />
        <br />
        <label>Font Weight</label>
        <br />
        <input
          type="text"
          name="fontWeight"
          onChange={(e) => this.handleInput(e)}
          value={fontWeight}
        />
        <br />
        <br />
        <button
          onClick={() => {
            this.props.getValuesFromModal({ text, x, y, fontSize, fontWeight });
            this.props.displayFilterModal();
          }}
        >
          Save Changes
        </button>
      </div>
    );
  }
}

export default Modal;
