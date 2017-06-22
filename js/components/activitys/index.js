
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body, List, ListItem } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import OauthService from '../../services/chaira_api';
import ActivityService from '../../services/activity.service';

import UserStorage from '../../storages/user.storage';
import ActivityStorage from '../../storages/activity.storage';

import User from '../../providers/user';
import Activity from '../../providers/activity';

class Activitys extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  oauthService = new OauthService(this);
  activityService = new ActivityService(this);
  user = new User();
  activitys = [];

  constructor(props){
    super(props);

    this.state = { 
      activitys: []
    }

    let context = this;
    UserStorage.getUser().then((data) => {
      console.log(data);
      context.user = data;
      context.getActivitys();
    });
  }

  componentWillMount(){ 
    this.props.indexState({ headerApp: { show: true, title: 'Actividades' } });
  }

  getActivitys(user){
    this.activityService.getActivitys()
    .then(data => {
      this.setState({ activitys: data });
      //this.activitys = data;
      console.log(data);

    });
    //Consultar api Amanda
    //Si existen:
        //Mostrarlas y guardar en local
    //Si no existe:
      //consultar chaira horario segun ROLES, 
      //Si existe: Guardan en local, en Amanda y renderizar
      //else: "No tiene materias"
      //catch: "Error en la api"
      /*if(this.user.indexOfRol("ESTUDIANTE") != -1){
        this.oauthService.getScope('schedule')
        .then((data) => {
          if(false && data.state == 'OK'){
            this.activitys = Activity.parserScheduleToActivity(data.description, this.user);
            this.activityService.addActivitysAll(this.activitys, 0)
            .then(data =>{
              console.log(data);
            });
          } else {
            //Validar si no tiene materias
            console.log(data);
          }
        });
      }
      if(this.user.indexOfRol("FUNCIONARIO") != -1){
        console.log("docente");
      }*/
  }

  render() {
    return (
      <Container style={styles.container}>

        <List
            dataArray={this.state.activitys} renderRow={data =>
              <ListItem button noBorder>
                <Left>
                  <Text>{data.nombre}</Text>
                </Left>
              </ListItem>}
          />

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
