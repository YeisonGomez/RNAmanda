import React, { Component } from 'react';
import { Image, StatusBar, WebView, View, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Content, Form, Button, Text, Header, Body, Title, Right } from 'native-base';

import styles from './styles';

class LoginComponent extends Component { // eslint-disable-line
 	 
    constructor(){
      super();
      this.state = { 
        modalVisible: false
      }
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    render() {
    	let webview = this.state.webview;

      return ( 
          <View>
            <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false)}}
            >
           <WebView
              source={{uri: 'http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/auth?response_type=code&client_id=800167840216&redirect_uri=http://localhost/callback&state=x'}}
            />
          </Modal>

  			  <Header>
            <Body>
              <Title>¡Hola!</Title>
            </Body>
            <Right />
          </Header>
          <Button block style={ styles.text } onPress={() => {
            this.setModalVisible(true)
          }}>
              <Text>Iniciar sesión con Chairá</Text>
          </Button>
  	    </View>
      );
    }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
});
  
export default connect(mapStateToProps)(LoginComponent);
