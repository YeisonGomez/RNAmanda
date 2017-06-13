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

  render() {
    return ( 
      <Container> 
        <StatusBar barStyle='light-content'/>
        <LoginComponent/>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
});

export default connect(mapStateToProps)(InvitedComponent);
