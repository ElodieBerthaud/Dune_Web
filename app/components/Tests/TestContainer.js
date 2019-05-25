import React, { Component } from 'react';
import Test from '../Viewer/test.js';

class Follow extends Component {
  render() {
    return (
      <div>
        <Test mode={'tableau'} url={'http://176.31.252.134:9001/files/fm/GameDesignFinal.pdf'} />
      </div>
    );
  }
}

export default Follow;
