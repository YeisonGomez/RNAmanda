
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

  oauthService = new OauthService();
  activityService = new ActivityService();
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
    this.props.indexState({ loading: true, headerApp: { show: true, title: 'Actividades' } });
  }

  getActivitys(user){
    this.activityService.getActivitys()
    .then(data => {
      this.props.indexState({ loading: false });
      console.log(data);
      if(data && data.length > 0){
        this.setState({ activitys: data });
      } else {
        //Modal obteniendo materias
        this.activityService.getActivitysChaira(this.user, this.oauthService)
        .then(data => {
           console.log(data);
        });
      }
    });
    //Consultar api Amanda
    //Si existen:
        //Mostrarlas y guardar en local
    //Si no existe:
      //consultar chaira horario segun ROLES, 
      //Si existe: Guardan en local, en Amanda y renderizar
      //else: "No tiene materias"
      //catch: "Error en la api"
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
