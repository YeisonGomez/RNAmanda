import React, { Component } from 'react';
import { Image, StatusBar, WebView, View, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Content, Form, Button, Text, Header, Body, Title, Right, Toast } from 'native-base';

import styles from './styles';
import OauthService from '../../../services/chaira_api';
import UserService from '../../../services/user.service';

import User from '../../../providers/user';
import Util from '../../../providers/util';

import UserStorage from '../../../storages/user.storage';
import OauthStorage from '../../../storages/auth.storage';

class LoginComponent extends Component { // eslint-disable-line

    oauthService = new OauthService(this);
    userService = new UserService(this);
    user = new User();

    constructor(props){
      super(props);
      this.state = { 
        modalVisible: false
      }
    }

    setModalVisible(visible) {  
      this.setState({modalVisible: visible}); 
    }

    callbackAPI(code){
      this.oauthService.getAccessToken(code).then(data => {
        if(data && data.state != 'error'){
          OauthStorage.setAuth(data);

          this.user.parseUserScope(data.scope);
          this.user.getProgram(this).then(data2 => {
            UserStorage.setUser(this.user);
            this.userService.login(this.user).then(data3 => {
              console.log(data3);
              //this.props.indexState({ module: 'app' });
            });
          });
        } else if(data != undefined){
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
              indexState={this.props.indexState.bind(this)}
              callbackAPI={this.callbackAPI.bind(this)}
              redirect_uri={this.oauthService.redirect_uri}
              source={{uri: this.oauthService.chaira_api + '/oauth2/authorize.asmx/auth?response_type=code&client_id=' + this.oauthService.client_id + '&redirect_uri=' + this.oauthService.redirect_uri + '&state=x'}}
            />
          </Modal>

          <Button block style={ styles.text } onPress={() => { this.setModalVisible(true) }}>
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
