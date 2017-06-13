import React, { Component } from 'react';
import { Image, StatusBar, WebView, View, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Content, Form, Button, Text, Header, Body, Title, Right, Toast } from 'native-base';

import styles from './styles';
import OauthService from '../../../services/chaira_api'; 
import Util from '../../../providers/util';

class LoginComponent extends Component { // eslint-disable-line
 	  

    constructor(){
      super();
      this.state = { 
        modalVisible: false,
        text: ""
      }
      this.setText();
      this.getText();
    }

    async getText(){
      try {
        this.setState({text: await AsyncStorage.getItem('@MySuperStore:key')}); 
        if (this.state.text !== null){
          // We have data!!
          console.log(this.state.text);
        }
      } catch (error) {
        // Error retrieving data
      }
    }
   
    async setText(){
      try {
        await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
      } catch (error) {
        // Error saving data
      }
    }

    setModalVisible(visible) {  
      this.setState({modalVisible: visible}); 
    }

    callbackAPI(code){
      OauthService.getAccessToken(code).then(data => {
        if(data && data.state != 'error'){
          console.log(data);
        } else {
          Util.notification(data.description, 'danger');
        }
      })
    }
 
    onNavigationStateChange(e){ 
      if(e.url.indexOf(this.redirect_uri) != -1 && e.url.indexOf("http://chaira.udla.edu.co") == -1){
        let code = "";
        let vars = e.url.split("?")[1].split("&");
        for (let i = 0; i < vars.length; i++) {
          let pair = vars[i].split("=");
          if (pair[0] == "code") {
            code = pair[1];
          }
        }
        this.setModalVisible(false); 
        this.callbackAPI(code);
      }
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
              onNavigationStateChange={this.onNavigationStateChange}
              setModalVisible={this.setModalVisible.bind(this)}
              callbackAPI={this.callbackAPI.bind(this)}
              redirect_uri={OauthService.redirect_uri}
              source={{uri: OauthService.chaira_api + '/oauth2/authorize.asmx/auth?response_type=code&client_id=' + OauthService.client_id + '&redirect_uri=' + OauthService.redirect_uri + '&state=x'}}
            />
          </Modal>

  			  <Header>
            <Body>
              <Title>{this.state.text}!</Title>
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
