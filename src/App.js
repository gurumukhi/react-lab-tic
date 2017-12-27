import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewingStepNumber: 0,
      playersEntries: []
    }
    this.playerEntryAdded = this.playerEntryAdded.bind(this);
    this.jumpStepCallback = this.jumpStepCallback.bind(this);
  };

  jumpStepCallback (index) {
    this.setState({
      viewingStepNumber: index
    })
  }

  playerEntryAdded (newEntry) {
    if(!newEntry) {
      return;
    }

    if(this.state.viewingStepNumber !== this.state.playersEntries.length) {
      this.setState(function (prevState) {
        return {
          playersEntries: prevState.playersEntries.slice(0, prevState.viewingStepNumber),
          viewingStepNumber: Number(prevState.viewingStepNumber)
        }
      });
    }
    if(!findWinner(this.state.viewingStepNumber, this.state.playersEntries)) {
      this.setState(function (prevState) {
        let newPlayerEntry = prevState.playersEntries;
        newPlayerEntry.push(newEntry);
        return {
          playersEntries: newPlayerEntry,
          viewingStepNumber : prevState.viewingStepNumber + 1
        }
      });
    }
  }

  render() {
    return (
      <GameScreen 
        entries = {this.state.playersEntries} 
        viewingStepNumber = {this.state.viewingStepNumber}
        playerEntryAddedCallback = {this.playerEntryAdded} 
        jumpStepCallback = {this.jumpStepCallback}/>
    );
  }
}

class GameScreen extends React.Component {
  render () {
    return <div>
      <GridTable
       entries = {this.props.entries}
       playerEntryAddedCallback = {this.props.playerEntryAddedCallback}
       viewingStepNumber = {this.props.viewingStepNumber} />
      <br/>
      <GameMessage entries = {this.props.entries} viewingStepNumber = {this.props.viewingStepNumber} jumpStepCallback = {this.props.jumpStepCallback}/>
    </div>;
  }
}

const getEntryAt = function (x, y, entries, viewingStepNumber) {
  if (!entries) {
    return '.';
  }
  const useful = entries.slice(0, viewingStepNumber).filter(entry => entry.x === x && entry.y === y);
  if(useful && useful.length){
    return useful[0].player;
  }
  return '.';
}

class GridTable extends React.Component {
  render () {
    return <div className="grid-table">
      <GridCell entries = {this.props.entries} posX = '0' posY = '0' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      <GridCell entries = {this.props.entries} posX = '0' posY = '1' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      <GridCell entries = {this.props.entries} posX = '0' posY = '2' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} /> <br/>
      <GridCell entries = {this.props.entries} posX = '1' posY = '0' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      <GridCell entries = {this.props.entries} posX = '1' posY = '1' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      <GridCell entries = {this.props.entries} posX = '1' posY = '2' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} /> <br/>
      <GridCell entries = {this.props.entries} posX = '2' posY = '0' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      <GridCell entries = {this.props.entries} posX = '2' posY = '1' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      <GridCell entries = {this.props.entries} posX = '2' posY = '2' viewingStepNumber = {this.props.viewingStepNumber} playerEntryAddedCallback = {this.props.playerEntryAddedCallback} />
      </div>;
  }
}

class GridCell extends React.Component {
  createNewEntry () {
    if(getEntryAt(this.props.posX, this.props.posY, this.props.entries, this.props.viewingStepNumber) !== '.') {
      return null;
    }
    return {
      player: this.props.viewingStepNumber % 2 ? 'X' : 'O',
      x: this.props.posX,
      y: this.props.posY
    }
  }

  render () {
    return <span className='grid-cell' onClick={() => this.props.playerEntryAddedCallback(this.createNewEntry())}>
      {getEntryAt(this.props.posX, this.props.posY, this.props.entries, this.props.viewingStepNumber)}
      </span>;
  }
}

const winningCombination = function (entries) {
  let equalCase, plusCase, x0Case, x1Case, x2Case, y0Case, y1Case, y2Case;
  equalCase = plusCase = x0Case = x1Case = x2Case = y0Case = y1Case = y2Case = 0;
  entries.map(entry => {
    const x = entry.x;
    const y = entry.y;
    if (x === y) { equalCase++; }
    if (Number(x)+Number(y) === 2) { plusCase++; }
    if (x === "0") { x0Case++; }
    if (x === "1") { x1Case++; }
    if (x === "2") { x2Case++; }
    if (y === "0") { y0Case++; }
    if (y === "1") { y1Case++; }
    if (y === "2") { y2Case++; }
    return true;
  });
  if( equalCase === 3 || plusCase === 3 || x0Case === 3 || x1Case === 3 || x2Case === 3 || y0Case === 3 || y1Case === 3 || y2Case === 3) {
    return true;
  }
  return false;
}

const findWinner = function (step, entries) {
  const oEntries = entries.filter(entry => entry.player === 'O').slice(0, step/2 + step%2);
  const xEntries = entries.filter(entry => entry.player === 'X').slice(0, step/2);
  return winningCombination(oEntries) ? 'O' : winningCombination(xEntries) ? 'X' : null;
}

const findMessageToShow = function (step, entries) {
  const winner = findWinner(step, entries);
  return winner ? ('Winner is ' + winner) : ('Next player: ' + ((step % 2) ? 'X' : 'O'));
}

class GameMessage extends React.Component {
  render () {
    let currentMessage = findMessageToShow(this.props.viewingStepNumber, this.props.entries);
    return <div>
        {currentMessage}
        <br/>
        <br/>
        <LogEntries entries = {this.props.entries} jumpStepCallback = {this.props.jumpStepCallback}/>
      </div>;
  }
}

class LogEntries extends React.Component {
  render () {
    return (<div>
              <div>
                <button onClick = {() => this.props.jumpStepCallback(0)}>Goto step 0</button>
                <span> Game Start </span>
                <br/>
              </div>
        {
          this.props.entries.map((entry, index) => {
            return <LogEntry key={index} entryIndex = {index} jumpStepCallback = {this.props.jumpStepCallback} />
          })
        }
      </div>);
  }
}

class LogEntry extends React.Component {
  render () {
    return <div>
      <button onClick = {() => this.props.jumpStepCallback(this.props.entryIndex + 1)}>Goto step {this.props.entryIndex + 1}</button>
      <span> move # {this.props.entryIndex + 1} </span>
      <br/>
    </div>;
  }
}

export default App;
