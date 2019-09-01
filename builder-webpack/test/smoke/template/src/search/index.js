

import React from 'react';
import ReactDom from 'react-dom';
import './search.less';
import '../../commons/index';
import { a } from './tree-shaking';
import largeNumber from 'large-number'
import './search.css';
import handshake from '../assets/imgs/handshake.png';



class Search extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
        import('./text.js').then((Text) => {
          this.setState({
            Text: Text.default,
          });
        });
  }

  render() {
    const { Text } = this.state;
    const res = largeNumber('999','2');
    return (
      <div className="search-text">
SearchTextContentHMR
        {
          Text ? <Text /> : null
        }{
          a() 
        }{
          res
        }
        <img src={handshake} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}
ReactDom.render(
  <Search />,
  document.getElementById('root'),
);
