import React from 'react';
import { observer } from 'mobx-react';

// Icons
import * as icons from '../ui/Icons';

const Cursor = observer(class Cursor extends React.Component {
  constructor() {
    super();

    // Set the initial state
    this.state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }

  componentDidMount() {
    const speed = 10;
    const { direction, position } = this.props.store.CursorStore;

    // document.addEventListener('mousemove', (e) => this.handleMouse(e));

    this.moveInterval = setInterval(() => {
      if(direction.x) {
        let newX = this.state.x += direction.x * speed;

        if(newX < 0) {
          newX = 0;
        } else if(newX > window.innerWidth - 20) {
          newX = window.innerWidth - 20;
        }

        this.setState({
          x: newX
        });
      }

      if(direction.y) {
        let newY = this.state.y += direction.y * speed;

        if(newY < 0) {
          newY = 0;
        } else if(newY > window.innerHeight - 32) {
          newY = window.innerHeight - 32;
        }

        this.setState({
          y: newY
        });
      }
      
      position.x = this.state.x;
      position.y = this.state.y;
    }, 100);
  }

  handleMouse(e) {
    this.setState({
      x: e.pageX,
      y: e.pageY
    })
  }

  render() {
    const { direction } = this.props.store.CursorStore;
    const { x, y } = this.state;

    return (
      <span
        className="cursor"
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        <icons.cursor />
        <span className="meta">{direction.y}</span>
      </span>
    )
  }
});

export default Cursor;