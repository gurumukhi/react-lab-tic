import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <GameScreen />
    );
  }
}

class GameScreen extends React.Component {
  render () {
    return <div>
      <GridTable />
      <br/>
      <GameMessage />
    </div>;
  }
}

class GridTable extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div className="grid-table">
      <GridCell />
      <GridCell />
      <GridCell /> <br/>
      <GridCell />
      <GridCell />
      <GridCell /> <br/>
      <GridCell />
      <GridCell />
      <GridCell />
      </div>;
  }
}

class GridCell extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <span className='grid-cell'>
      O
      </span>;
  }
}

class GameMessage extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let currentMessage = 'Next player: X';
    return <div>
        currentMessage
        <br/>
        <br/>
        <LogEntry />
      </div>;
  }
}

class LogEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
        <button>Goto step 1</button>: Game start.
      </div>;
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
