import React, { Component } from 'react';
import { Image, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, H3, Text } from 'native-base';

import { openDrawer } from '../../../actions/drawer';
import styles from './styles';

class LoginComponent extends Component { // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func
  }

  render() {
  	const probando = false;
    return ( 
      <Container>
            <Button
              style={{ backgroundColor: '#6FAF98', alignSelf: 'center' }}
              onPress={this.props.openDrawer}
            >
              <Text>{probando ? 'Funciono' : 'B'}</Text>
            </Button>
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
  
export default connect(mapStateToProps, bindActions)(LoginComponent);
