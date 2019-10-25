import React, { Component } from 'react';
import './main.css';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  footerStyle: {
    backgroundColor: '#00BCD4',
    fontSize: '20px',
    color: 'white',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    height: '60px',
    width: '100%'
  },
  phantomStyle: {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%'
  }
};

class Footer extends Component {

  render() {
    let hide = false;
    if (window.location.pathname === '/facturation'){
      hide = true;
    }

    return (
      <div className="footer" style={{display: hide === true ? 'none' : ''}}>
        <div className="container">
          <div className="ine">
            <h3>Support</h3>
            <a href='/contact'>Nous contacter</a>
          </div>
          <div className="in">
            <h3>Droits</h3>
            <a href="/cgu">Condition générales d'utilisation</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
