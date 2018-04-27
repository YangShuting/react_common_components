import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProgressV2.css'

class ProgressV2 extends Component{
    render(){
        let {
           color, currentValue, height, data, width
        } = this.props
        let currrentWidth = ( data.findIndex(item => item.value === currentValue) + 1 ) / data.length * width
        let text = data.map( (item, index) => <span key={item.value} style={{position: 'absolute', left: `${((index+1)/data.length * 100 - 5)}%`}}>{item.label}</span> )
        const style = {
            backgroundColor: color,
            width: `${currrentWidth}px`,
            height
        }
      return(
          <div className="bar_wrapper" style={{width: `${width}px`}}>
              <div className="progressV2" style={{width: `${width}px`}}>
                  <div className="inner_bar" style={style}>
                      <span className="circle"></span>
                  </div>
              </div>
              <div className="bar_text">
                  {text}
              </div>
          </div>

      )
    }
}

ProgressV2.propTypes = {
    data: PropTypes.array.isRequired,
    currentValue: PropTypes.number.isRequired
}

ProgressV2.defaultProps = {
    data: [],
    currentValue: ''
}

export default ProgressV2