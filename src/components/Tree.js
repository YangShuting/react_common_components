import React, { Component } from 'react'
import './Tree.css'


class Tree extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: props.data,
        }
    }
    handleItemChange = (e, item) => {
        e.stopPropagation()
        let {data} = this.state
        for(let child of data){
            if(child.name === item.name){
                child.collapsed = !child.collapsed
            }
        }
        this.setState({data})
    }

    render(){
        let { data } = this.state
        if (!data) return null;
        let treeItem = data.map((item) => {
                return (
                    <li key={item.name} className="li" onClick={(e) => this.handleItemChange(e, item)}>
                        {item.collapsed && <span className="icon">▼</span>}
                        {!item.collapsed &&  <span className="icon">▲ </span>}
                        <span>{item.name}</span>
                        {!item.collapsed &&  <Tree data={item.children} />}
                    </li>
                )
            })
        return(
            <ul className="ul">
                {treeItem}
            </ul>
        )
    }
}

export default Tree