import React, { Component } from 'react'


class Tree extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: props.data
        }
    }

    render(){
        let { data } = this.state
        let treeItem = data.map((item) => {
                return (
                    <li><Tree data={item.children} /></li>
                )
            })
        return(
            <ul>
                {treeItem}
            </ul>
        )
    }
}

export default Tree