import React from 'react';
import { colors } from './colors';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      colors: colors
    }
  }

  onDragStart(e, r, c, draggedColor){
    e.dataTransfer.setData('c', c);
    e.dataTransfer.setData('r', r);
    e.dataTransfer.setData('color', draggedColor);
  }

  onDragOver(e){
    e.preventDefault();
  }

  onDrop(e, row, col, color){
    const draggedRow = e.dataTransfer.getData('r');
    const draggedCol = e.dataTransfer.getData('c');
    const draggedColor = e.dataTransfer.getData('color');
    const { colors } = this.state;
    console.log('row', row, 'col', col)
    console.log('draggedRow', draggedRow, 'draggedCol', draggedCol)
    colors[row][col] = draggedColor;
    colors[draggedRow][draggedCol] = color;
    this.setState({colors: colors})
    e.dataTransfer.clearData();
  }

  render(){
    const { colors } = this.state;

    return (
      <div style={{ paddingLeft: '100px', paddingTop: '100px'}}>
        <div>
          {colors.map((colorArr,r) => 
            <div style={{display: 'flex'}}>
              {colorArr.map((color,c) => <div
                                          style={{
                                            top: 100+ r*40 + 'px',
                                            left:  100+ c*40 + 'px',
                                            backgroundColor: color,
                                          }}
                                          className="each-color"
                                          draggable
                                          onDragStart={e => this.onDragStart(e, r, c, color)}
                                          onDragOver={this.onDragOver}
                                          onDrop={e => this.onDrop(e, r, c, color)}
                                      >
                                      </div>)}
            </div>)}
          </div>
      </div>
    );
  }
}

export default App;
