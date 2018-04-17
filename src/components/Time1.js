import React, { Component } from 'react'

class Time extends Component{
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            onStart: props.onStart
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            onStart: nextProps.onStart
        })
        nextProps.onStart ? this.onStart() : this.onStop()
    }

    onStart(){
        this.timeID = setInterval(() => {
            this.tick()
        }, 1000)
    }

    onStop(){
        clearInterval(this.timeID)
    }

    tick(){
        this.setState({count: this.state.count + 1})
    }

    componentWillUnmount(){
        clearInterval(this.timeID)
    }

    render(){
        let {count} = this.state
        let second = count % 60, min = Math.floor( count / 60 ), hour = Math.floor( min / 60 )
        min = min > 60 ? Math.floor( min % 60 ) : min
        hour = hour < 10 ? "0" + hour : hour
        min = min < 10 ? "0" + min : min
        second = second < 10 ? (second === 0 ? 0 : "0" + second) : second
        return (
            <div style={{fontSize: '25px'}}>时间是： { min === "00" ? <span>{second}</span> : (hour === "00" ? <span>{min}:{second}</span> : <span>{hour}:{min}:{second}</span>)}</div>
        )
    }
}
export default Time