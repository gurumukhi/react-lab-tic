import React, { Component } from 'react';
import './App.css';

/// ToDo : Add winner logic
///      : Add jump logic

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewingStepNumber: 0,
      playersEntries: []
    }
    this.playerEntryAdded = this.playerEntryAdded.bind(this);
  };

  playerEntryAdded (newEntry) {
    if(newEntry) {
      this.setState(function (prevState) {
        let newPlayerEntry = prevState.playersEntries;
        newPlayerEntry.push(newEntry);
        console.log(newPlayerEntry);
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
        playerEntryAddedCallback = {this.playerEntryAdded} />
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
      <GameMessage entries = {this.props.entries} viewingStepNumber = {this.props.viewingStepNumber}/>
    </div>;
  }
}

const getEntryAt = function (x, y, entries) {
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
    if(getEntryAt(this.props.posX, this.props.posY, this.props.entries) !== '.') {
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
      {getEntryAt(this.props.posX, this.props.posY, this.props.entries)}
      </span>;
  }
}

const getNextPlayer = function (step) {
  return step % 2 ? 'X' : 'O'
}

class GameMessage extends React.Component {
  render () {
    let currentMessage = 'Next player: ' + getNextPlayer(this.props.viewingStepNumber);
    return <div>
        {currentMessage}
        <br/>
        <br/>
        <LogEntries entries = {this.props.entries}/>
      </div>;
  }
}

class LogEntries extends React.Component {
  render () {
    return (<div>
              <div>
                <button>Goto step 0</button>
                <span> Game Start </span>
                <br/><br/>
              </div>
        {
          this.props.entries.map((entry, index) => {
            return <LogEntry key={index} entryIndex = {index}/>
          })
        }
      </div>);
  }
}

class LogEntry extends React.Component {
  render () {
    return <div>
      <button>Goto step {this.props.entryIndex + 1}</button>
      <span> move # {this.props.entryIndex + 1} </span>
      <br/><br/>
    </div>;
  }
}

export default App;
