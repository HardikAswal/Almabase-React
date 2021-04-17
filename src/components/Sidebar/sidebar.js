import React from "react";
import "./sidebar.css";
import Modal from "../Modal/modal";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFilterModal: false,
      cX: 0,
      sX: 0,
      cY: 0,
      sY: 0,
      type: "",
      selected: null,
      num: 0,
      currentlySelectedElement: null,
      currentElementText: "",
      elements: [],
      isBeingDragged: false,
    };
  }

  getValuesFromModal = (data) => {
    const { text, x, y, fontSize, fontWeight } = data;
    console.log(text, x, y, fontSize, fontWeight);

    const { type } = this.state;
    console.log(type);

    var parent = document.getElementById("dropzone");
    // var node = document.createTextNode("Hello world");

    var Y;
    if (type === "Label") {
      Y = document.createElement("LABEL");
      Y.innerHTML = text;
    } else if (type === "Input") {
      Y = document.createElement("INPUT");
      Y.setAttribute("type", "text");
      Y.value = text;
    } else {
      Y = document.createElement("BUTTON");
      Y.innerHTML = text;
    }
    Y.setAttribute("draggable", true);
    Y.setAttribute("id", this.state.num);

    this.setState({
      ...this.state,
      num: this.state.num + 1,
    });
    // var YV = prompt("Enter Caption value:", "");
    // Y.style.cssText = `
    //     position:absolute;
    //     top:${y}px;
    //     left:${x}px;
    //     width:fit-content;
    //     height:fit-content;
    //     font-size: ${fontSize}px;
    //     font-weight: ${fontWeight};
    //     -moz-border-radius:100px;
    //     -moz-box-shadow: 0px 0px 8px #fff;
    //     `;
    Y.style.position = "absolute";
    Y.style.top = `${y}px`;
    Y.style.left = `${x}px`;
    Y.style.width = "fit-content";
    Y.style.height = "fit-content";
    Y.style.fontSize = `${fontSize}px`;
    Y.style.fontWeight = fontWeight;

    let e = this.state.elements;
    e.push(Y);
    console.log("before pushing: ", e);
    localStorage.setItem("elements", JSON.stringify(e));
    this.setState({
      elements: e,
    });
    // parent.appendChild(Y);
  };

  handleDragEnter = (e) => {
    console.log("onDragEnter");
    e.preventDefault();
    e.stopPropagation();
    var cX = e.clientX;
    var sX = e.screenX;
    var cY = e.clientY;
    var sY = e.screenY;
    console.log("Drag Enter: ", cX, sX, cY, sY);
  };

  handleDragLeave = (e) => {
    console.log("onDragLeave");
    e.preventDefault();
    e.stopPropagation();

    var cX = e.clientX;
    var sX = e.screenX;
    var cY = e.clientY;
    var sY = e.screenY;
    console.log("Drag Leave: ", cX, sX, cY, sY);
  };

  handleDragOver = (e) => {
    console.log("onDragOver");
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e) => {
    console.log("onDragDrop");
    e.preventDefault();
    e.stopPropagation();

    // if(this.state.isBeingDragged) return;

    var cX = e.clientX,
      sX = e.screenX,
      cY = e.clientY,
      sY = e.screenY;
    console.log("Handle drop: ", cX, sX, cY, sY);

    var type = e.dataTransfer.getData("Type");
    console.log(type);

    if (this.state.isBeingDragged) {
      var element = this.state.currentlySelectedElement;

      var Y;
      if (type === "Label") {
        Y = document.createElement("LABEL");
        Y.innerHTML = element.innerHTML;
      } else if (type === "Input") {
        Y = document.createElement("INPUT");
        Y.setAttribute("type", "text");
        Y.value = element.value;
      } else {
        Y = document.createElement("BUTTON");
        Y.innerHTML = element.innerHTML;
      }
      Y.setAttribute("draggable", true);
      Y.setAttribute("id", this.state.num);
      Y.style.position = "absolute";
      Y.style.top = `${cY}px`;
      Y.style.left = `${cX}px`;
      Y.style.width = "fit-content";
      Y.style.height = "fit-content";
      Y.style.fontSize = `${element.style.fontSize}`;
      Y.style.fontWeight = element.style.fontWeight;

      let list = this.state.elements;
      let idx = list.indexOf(element);
      list = list.splice(idx, 1);
      list.push(Y);

      localStorage.setItem("elements", JSON.stringify(list));

      this.setState({
        ...this.state,
        elements: list,
        isBeingDragged: false,
      });

      return;
    }

    this.setState({
      ...this.state,
      cX: cX,
      sX: sX,
      cY: cY,
      sY: sY,
      type: type,
      displayFilterModal: !this.state.displayFilterModal,
      selected: type,
    });

    setTimeout(() => {
      console.log(this.state);
    }, 10000);
    // this.setState({displayFilterModal: true});
    // this.handleDisplayFilterModal();
  };

  handleDisplayFilterModal = () => {
    this.setState({
      ...this.state,
      displayFilterModal: !this.state.displayFilterModal,
    });
  };

  changePosition = (e, element) => {
    console.log("change posn");
    var cX = e.clientX,
      sX = e.screenX,
      cY = e.clientY,
      sY = e.screenY;
    let t = element;
    t.style.top = cY;
    t.style.left = cX;

    let v = this.state.elements,
      w = [];
    v.push(t);

    for (let i = 0; i < v.length; i++) {
      if (v[i] == element) continue;
      else {
        w.push(v[i]);
      }
    }
    console.log("t", t);
    this.setState({
      elements: w,
    });
  };

  render() {
    // if (localStorage.getItem("elements")) {
    //   this.setState({
    //     elements: localStorage.getItem("elements"),
    //   });
    // }
    return (
      <div className="wrapper">
        {this.state.displayFilterModal ? (
          <div className="filter-modal">
            <Modal
              getValuesFromModal={this.getValuesFromModal.bind(this)}
              displayFilterModal={this.handleDisplayFilterModal.bind(this)}
              x={this.state.cX}
              y={this.state.cY}
              selected={this.state.selected}
              currentElementText={this.state.currentElementText}
            />
          </div>
        ) : null}

        <div
          className="dropzone"
          id="dropzone"
          onDrop={(e) => this.handleDrop(e)}
          onDragOver={(e) => this.handleDragOver(e)}
        >
          {console.log(this.state.elements)}
          {this.state.elements.map((element, index) => {
            console.log("Style ", element.style);
            let style = {
              position: "absolute",
              top: element.style.top,
              left: element.style.left,
              width: "fit-content",
              height: "fit-content",
              fontSize: element.style.fontSize,
              fontWeight: element.style.fontWeight,
              border:
                this.state.currentlySelectedElement === element
                  ? "1px solid red"
                  : null,
              outline: "none",
              cursor: "pointer",
              "&:focus": {
                outline: "none",
              },
            };
            if (element.localName === "label") {
              return (
                <label
                  key={index}
                  id="Label"
                  draggable="true"
                  style={style}
                  onClick={(e) => {
                    this.setState({
                      currentlySelectedElement:
                        this.state.currentlySelectedElement === element
                          ? null
                          : element,
                      currentElementText: element.innerText,
                      cY: element.style.top.slice(0, 3),
                      cX: element.style.left.slice(0, 3),
                      // displayFilterModal: !this.state.displayFilterModal
                    });
                  }}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("Type", e.target.id);
                    this.setState({
                      isBeingDragged: true,
                      currentlySelectedElement: element,
                    });
                  }}
                  // onDragStart={e => this.setState({ isBeingDragged: true })}
                  onDragEnd={(e) => {
                    this.changePosition(e, element);
                  }}
                >
                  {element.innerText}
                </label>
              );
            } else if (element.localName === "input") {
              return (
                <input
                  key={index}
                  draggable="true"
                  type="text"
                  id="Input"
                  style={style}
                  value={element.value}
                  onClick={(e) => {
                    this.setState({
                      currentlySelectedElement:
                        this.state.currentlySelectedElement === element
                          ? null
                          : element,
                      currentElementText: element.value,
                      cY: element.style.top.slice(0, 3),
                      cX: element.style.left.slice(0, 3),
                      // displayFilterModal: !this.state.displayFilterModal
                    });
                  }}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("Type", e.target.id);
                    this.setState({
                      isBeingDragged: true,
                      currentlySelectedElement: element,
                    });
                  }}
                  // onDragStart={e => this.setState({ isBeingDragged: true })}
                  onDragEnd={(e) => {
                    this.changePosition(e, element);
                  }}
                />
              );
            } else if (element.localName === "button") {
              return (
                <button
                  key={index}
                  draggable="true"
                  id="Button"
                  style={style}
                  onClick={(e) => {
                    this.setState({
                      currentlySelectedElement:
                        this.state.currentlySelectedElement === element
                          ? null
                          : element,
                      currentElementText: element.value,
                      cY: element.style.top.slice(0, 3),
                      cX: element.style.left.slice(0, 3),
                      // displayFilterModal: !this.state.displayFilterModal
                    });
                  }}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("Type", e.target.id);
                    this.setState({
                      isBeingDragged: true,
                      currentlySelectedElement: element,
                    });
                  }}
                  // onDragStart={e => this.setState({ isBeingDragged: true })}
                  onDragEnd={(e) => {
                    this.changePosition(e, element);
                  }}
                >
                  {element.innerText}
                </button>
              );
            }
          })}
        </div>
        <div className="sidebar-wrapper">
          <div className="sidebar-heading">Blocks</div>

          <div className="sidebar-selector">
            <button
              className="sidebar-selector-btn"
              draggable="true"
              id="Label"
              onDrop={(e) => this.handleDrop(e)}
              onDragOver={(e) => this.handleDragOver(e)}
              onDragEnter={(e) => this.handleDragEnter(e)}
              onDragLeave={(e) => this.handleDragLeave(e)}
              onDragStart={(e) => e.dataTransfer.setData("Type", e.target.id)}
            >
              Label
            </button>

            <button
              className="sidebar-selector-btn"
              draggable="true"
              id="Input"
              onDrop={(e) => this.handleDrop(e)}
              onDragOver={(e) => this.handleDragOver(e)}
              onDragEnter={(e) => this.handleDragEnter(e)}
              onDragLeave={(e) => this.handleDragLeave(e)}
              onDragStart={(e) => e.dataTransfer.setData("Type", e.target.id)}
            >
              Input
            </button>

            <button
              className="sidebar-selector-btn"
              draggable="true"
              id="Button"
              onDrop={(e) => this.handleDrop(e)}
              onDragOver={(e) => this.handleDragOver(e)}
              onDragEnter={(e) => this.handleDragEnter(e)}
              onDragLeave={(e) => this.handleDragLeave(e)}
              onDragStart={(e) => e.dataTransfer.setData("Type", e.target.id)}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    );
  }
}