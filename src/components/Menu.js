import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Menu extends Component{
    static propTypes = {
        children: PropTypes.any,
        onClick: PropTypes.func,
        onSelect: PropTypes.func,
        subMenuOpenDelay: PropTypes.number,
        triggerSubMenuAction: PropTypes.string,
        selectable: PropTypes.bool
    }

    static defaultProps = {
        selectable: true,
        onClick: PropTypes.func,
        onSelect: PropTypes.func,
        style: {}
    }

    constructor(props){
        super(props)
        //selectedKey ? 有何用？
        // openKeys ? 有何用？
    }

    onSelecte = (selectInfo) => {
        const props = this.props
    }

    onClick = (e) => {
        this.props.onClick(e)
    }

    onKeyDown = (e, callback) => {
        this.innerMenu.getWrappedInstance().onKeyDown(e, callback)
    }

    //onKeyDown 的作用 ?




    render(){
        return (
            <div>

            </div>
        )
    }
}