import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Progress.css'

class Progress extends Component{
    constructor(props){
        super(props)
        this.state = {
            width: props.width,
            color: props.color,
            unFinishedStatus: props.unFinishedStatus,
            currentValue: props.currentValue,
            animate: props.animate,
            height: props.height
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            width: nextProps.width,
            height: nextProps.height,
            color: nextProps.color,
            unFinishedStatus: nextProps.unFinishedStatus,
            currentValue: nextProps.currentValue,
            animate: nextProps.animate
        })
    }

    componentDidMount(){
        this.setState({currentValue: 0})
        let progressPer = [0.1, 0.3, 0.6, 1]

        this.timeID = setInterval(() => {
            let t = 5, j = 0
            while(t > 0){
                this.setState({currentValue: `${this.props.currentValue * progressPer[j]}`})
                j++
                t--
            }
            if(t === 0){
                clearInterval(this.timeID)
            }
        }, 1000)
    }


    render(){
        let {width, height, color, unFinishedStatus, total, currentValue, animate} = this.state
        const style = {
            backgroundColor: color,
            width: currentValue + '%',
            transition: `width ${animate}ms`,
            height: height
        }
        return (
            <div className="progress">
                <div className="inner_bar" style={style}></div>
            </div>
        )
    }
}

Progress.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    unFinishedStatus: PropTypes.string.isRequired,
    currentValue: PropTypes.number.isRequired,
    animate: PropTypes.number.isRequired
}

Progress.defaultProps = {
    width: '400px',
    height: '20px',
    color: '#0086ff',
    unFinishedStatus: 'active',
    currentValue: 0,
    animate: 0
}

export default Progress