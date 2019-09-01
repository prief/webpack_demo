

// import React from 'react';
// import './search.less';
// import '../../commons/index';
// import { a } from './tree-shaking';
// import largeNumber from 'large-number'
// import './search.css';
// import handshake from '../assets/imgs/handshake.png';
const React = require('react')
require('./search.less');
require('../../commons/index')
const largeNumber = require('large-number');
require('./search.css')
const handshake = require('../assets/imgs/handshake.png')


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
          res
        }
        <img src={handshake} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}


module.exports = <Search />
