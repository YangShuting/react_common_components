import React, { Component } from 'react'

class Time extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: new Date()
        }
    }
    componentWillMount(){
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000)
    }

    tick(){
        this.setState({
            date: new Date()
        })
    }

    componentWillUnmount(){
        clearInterval(this.timeID)
    }

    render(){
        return (
            <div style={{fontSize: '25px'}}>时间是： {this.state.date.toLocaleTimeString()}</div>
        )
    }
}
export default Time