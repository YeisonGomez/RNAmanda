import React, { Component } from 'react';
import { Image, View, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, H3, Text, Alert } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import LoginComponent from './login';
import styles from './styles';

const launchscreenBg = require('../../../img/launchscreen-bg.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class InvitedComponent extends Component { // eslint-disable-line

  constructor(){
    super();
    setTimeout(async function(){
      try {
        await AsyncStorage.setItem('@MySuperStore:key', 'Cambiado');
        console.log(await AsyncStorage.getItem('@MySuperStore:key'));
      } catch (error) {
        // Error saving data
      }
    }, 2000);
  }

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
