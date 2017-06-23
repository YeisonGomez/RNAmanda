
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body, List, ListItem } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import OauthService from '../../services/chaira_api';
import ActivityService from '../../services/activity.service';

import UserStorage from '../../storages/user.storage';
import ActivityStorage from '../../storages/activity.storage';

import Util from '../../providers/util';
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
      activitys: [],
      downloadSchedule: false
    }

    let context = this;
    UserStorage.getUser().then((data) => {
      console.log(data);
      context.user = data;
      context.getActivitys();
    });
  }

  componentDidMount(){ 
    this.props.indexState({ loading: true, headerApp: { show: true, title: 'Actividades' } });
  }

  getActivitys(user){
    //Consultar api Amanda
    this.activityService.getActivitys()
    .then(data => {
      if(data && data.length > 0){
        //Mostrarlas y guardar en local
        this.setState({ activitys: data });
        this.props.indexState({ loading: false });
      } else {
        //consultar chaira horario segun ROLES, 
        //Guardan en local, en Amanda y renderizar
        this.setState({ downloadSchedule: true });
        this.activityService.getActivitysChaira(this.user, this.oauthService)
        .then(data => {
          if(data.state == 'OK'){
            this.setState({ activitys: data.description });
          } else {
            //No tiene materias
            Util.notification('No tienes asignaturas actualmente en Chairá', 'warning');
          }
          this.setState({ downloadSchedule: false });
          this.props.indexState({ loading: false });
        });
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Spinner visible={this.state.downloadSchedule} textContent={"Descargando asignaturas de Chairá"} textStyle={{color: '#FFF'}}/>
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
