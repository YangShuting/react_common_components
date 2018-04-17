import React, { Component } from 'react'
import './CountDownTimer.css'

class CountDownTimer extends Component{
    constructor(props){
        super(props)
        this.state = {
            duration: props.duration,
            onStart: props.onStart,
            initialOffset: '440',
            i: 0,
            strokeDashoffset: 440,
            time: props.duration
        }
    }
    componentDidMount(){
        let {initialOffset, time} = this.state
        this.setState({strokeDashoffset: `${initialOffset - initialOffset/time}`})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.onStart && this.props.onStart !== nextProps.onStart){
            this.setState({
                duration: nextProps.duration,
                onStart: nextProps.onStart,
            })
            this.onStart()
        }
    }

    onStart(){
        let {duration, i, time} = this.state
        this.timeID = setInterval(() => {
            duration = duration - 1
            while(duration < 0){
                duration = 0
            }
            this.setState({ duration })
            if(duration === 0){
                clearInterval(this.timeID)
                this.props.done(true)
            }
        }, 1000)

        this.circleTimer = setInterval(() => {
            this.setState({i})
            if(parseInt(time, 10) === parseInt(i, 10)){
                clearInterval(this.circleTimer)
                return
            }
            this.startCircle(i)
            i++
        }, 1000)
    }

    startCircle(val){
        let {initialOffset, time} = this.state
        this.setState({strokeDashoffset: `${initialOffset-(( val + 1 )*(initialOffset/time))}`})
    }

    render(){
        let {duration} = this.state
        return (
            <div>倒计时：{duration}
                <div className="item html">
                    <div className="fontWrapper">
                        <div style={{fontWeight: 300, color: '#ff8e87', fontSize: '50px'}}>{duration}
                        <span style={{fontSize: '15px'}}>秒</span></div>
                    </div>
                    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <title>Layer 1</title>
                            <circle id="circle"  className="circle_animation" r="69.85699" cy="81" cx="81" strokeDashoffset={this.state.strokeDashoffset} strokeWidth="4" stroke="#ff8e87" fill="none"/>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default CountDownTimer