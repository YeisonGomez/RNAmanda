import React, { Component } from 'react';
import { Image, View, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, H3, Text, Alert, Header, Body, Title, Right } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import LoginComponent from './login';
import styles from './styles';

import Oauth from '../../providers/auth.storage';

class InvitedComponent extends Component { // eslint-disable-line

  render() {
    return ( 
      <Container> 
        <View>
          <LoginComponent/>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes
});

export default connect(mapStateToProps)(InvitedComponent);
