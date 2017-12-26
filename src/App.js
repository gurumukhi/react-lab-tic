import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const playerEntriesAtSomePoint = [{
  'player': 'X',
  'x': 1,
  'y': 2
}, {
  'player': 'O',
  'x': 1,
  'y': 0
}, {
  'player': 'X',
  'x': 0,
  'y': 0
}];

class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <GameScreen entries = {playerEntriesAtSomePoint}/>
    );
  }
}

class GameScreen extends React.Component {
  render () {
    return <div>
      <GridTable entries = {this.props.entries}/>
      <br/>
      <GameMessage entries = {this.props.entries}/>
    </div>;
  }
}

const getEntryAt = function (x, y, entries) {
  console.log(entries);
  if (!entries) {
    return '.';
  }
  const useful = entries.filter(entry => entry.x === x && entry.y === y);
  if(useful && useful.length){
    return useful[0].player;
  }
  return '.';
}

class GridTable extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div className="grid-table">
      <GridCell entry = {getEntryAt(0, 0, this.props.entries)} />
      <GridCell entry = {getEntryAt(0, 1, this.props.entries)} />
      <GridCell entry = {getEntryAt(0, 2, this.props.entries)} /> <br/>
      <GridCell entry = {getEntryAt(1, 0, this.props.entries)} />
      <GridCell entry = {getEntryAt(1, 1, this.props.entries)} />
      <GridCell entry = {getEntryAt(1, 2, this.props.entries)} /> <br/>
      <GridCell entry = {getEntryAt(2, 0, this.props.entries)} />
      <GridCell entry = {getEntryAt(2, 1, this.props.entries)} />
      <GridCell entry = {getEntryAt(2, 2, this.props.entries)} />
      </div>;
  }
}

class GridCell extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <span className='grid-cell'>
      {this.props.entry}
      </span>;
  }
}

const getNextPlayer = function (entries) {
  if(!entries || !entries.length) {
    return 'X';
  }
  const lastEntryPlayer = entries[entries.length - 1].player;
  return lastEntryPlayer === 'X' ? 'O' : 'X';
}

class GameMessage extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let currentMessage = 'Next player: ' + getNextPlayer(this.props.entries);
    return <div>
        {currentMessage}
        <br/>
        <br/>
        <LogEntry entries = {this.props.entries}/>
      </div>;
  }
}

class LogEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (<div>
              <div>
                <button>Goto step 0</button>
                <span> Game Start </span>
                <br/><br/>
              </div>
        {
          this.props.entries.map((entry, index) => {
            return <div key={index}>
              <button>Goto step {index}</button>
              <span> move # {index+1} </span>
              <br/><br/>
              </div>
          })
        }
      </div>);
  }
}

// class  extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return ;
//   }
// }

export default App;
