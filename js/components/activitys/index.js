
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import OauthService from '../../services/chaira_api';

import UserStorage from '../../storages/user.storage';
import ActivityStorage from '../../storages/activity.storage';

import User from '../../providers/user';

class Activitys extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  oauthService = new OauthService(this);
  user = new User();

  constructor(props){
    super(props);

    let context = this;
    UserStorage.getUser().then(function(data){
      console.log(data);
      context.user = data;
      context.getActivitys();
    });
  }

  componentWillMount(){ 
    this.props.indexState({ headerApp: { show: true, title: 'Actividades' } });
  }

  getActivitys(user){
    //Consultar api Amanda
    //Si existen: 
        //Mostrarlas y guardar en local
    //Si no existe:
      //consultar chaira horario segun ROLES, 
      //Si existe: Guardan en local, en Amanda y renderizar
      //else: "No tiene materias"
      //catch: "Error en la api"

      if(this.user.indexOfRol("ESTUDIANTE") != -1){
        this.oauthService.getScope('schedule')
        .then((data) => {
          if(data.state == 'OK'){
            ActivityStorage.setActivity(data.description);
            ActivityStorage.getActivityAll().then((data) => {
              console.log(data);
            });
          } else {
            console.log(data);
          }
        });
      }
      if(this.user.indexOfRol("FUNCIONARIO") != -1){
        console.log("docente");
      }
  }

  render() {
    return (
      <Container style={styles.container}>

        <Content padder>
          <Text>
            Content Goes Here
          </Text>

        </Content>


        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Activitys);
