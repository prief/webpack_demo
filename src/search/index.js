'use strict';

import React from "react"
import ReactDom from "react-dom";
import './search.less';
import "../../commons/index"
import { a } from "./tree-shaking";
import './search.css';
import handshake from '../assets/imgs/handshake.png'

if(false){
    a();
}
class Search extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        };
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }
    render(){
        const { Text } = this.state;
        return <div className="search-text">SearchTextContentHMR
          {
                Text ? <Text /> : null
            }
          <img src={ handshake } onClick={ this.loadComponent.bind(this)} />
        </div>
    }
}
ReactDom.render(
    <Search />,
        document.getElementById('root')
)