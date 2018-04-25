// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Button } from 'react-bootstrap'
import './App.css';
import Time from './components/Time'
import Time1 from './components/Time1'
import CountDownTimer from './components/CountDownTimer'
import Tree from './components/Tree'
import Progress from './components/Progress'

class App extends Component {
    constructor(){
        super()
        this.state = {
            onStart: false,
            done: false
        }}

    done(value){
        this.setState({done: value})
    }

  render() {
        let treeData = [
            {name: 'node1', collapsed: true},
            {name: 'node2', collapsed: true, children: [{name: 'node2-1', collapsed: true}, {name: 'node2-2', collapsed: true}, {name: 'node2-3', collapsed: true, children: [{name: 'node3-1', collapsed: true, children: [{name: 'node4-1', collapsed: true}]}]}]}
        ]

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Button>测试引入Bootstrap </Button>
          时间组件：
          <Time />
          <Time1 date={new Date().toLocaleTimeString()} onStart= {this.state.onStart} />
          <Button onClick={() => this.setState({onStart: !this.state.onStart})}>{(this.state.onStart && <span>停止</span> )|| (!this.state.onStart && <span>开始</span>)}</Button>
          <CountDownTimer duration='10' onStart={this.state.onStart} done={value => this.done(value)} />
          <div>计时器的状态：{this.state.done ? <span>停止了</span> : <span>还在继续</span>}</div>
            <div className="treeView">
                <p>树形组件</p>
                <Tree data={treeData} />
            </div>
            <div className="progress">
                <Progress width="400px" animate="true" unFinishedStatus="active" total="10" currentValue="50" />
            </div>
      </div>
    );
  }
}

export default App;
