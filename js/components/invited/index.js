import React, { Component } from 'react';
import { Image, View, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, H3, Text, Alert } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import LoginComponent from './login';
import styles from './styles';

import Oauth from '../../providers/auth.storage';

class InvitedComponent extends Component { // eslint-disable-line

  constructor(){
    super();
    console.log(this);
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
