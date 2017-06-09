import React, { Component } from 'react';
import { Image, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, H3, Text, Alert } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import LoginComponent from './login';
import styles from './styles';

const launchscreenBg = require('../../../img/launchscreen-bg.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class InvitedComponent extends Component { // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render() {
  	let probando = false; 
  	let button = () => {
  		console.log(probando); 
  		probando = true;
  	}
    return ( 
      <Container> 
        <StatusBar barStyle='light-content'/>
        <LoginComponent/>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
});

export default connect(mapStateToProps, bindActions)(InvitedComponent);
