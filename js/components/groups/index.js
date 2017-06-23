
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body, List, ListItem } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import GroupService from '../../services/group.service';

import UserStorage from '../../storages/user.storage';

import Util from '../../providers/util';
import User from '../../providers/user';

class Groups extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  groupService = new GroupService();
  user = new User();

  constructor(props){
    super(props);

    this.state = { 
      groups: [],
      downloadSchedule: false
    }

    let context = this;
    UserStorage.getUser().then((data) => {
      context.user = data;
      context.getGroups();
    });
  }

  componentDidMount(){ 
    this.props.indexState({ loading: true, headerApp: { show: true, title: 'Grupos' } });
  }

  getGroups(user){
    this.groupService.getGroups()
    .then(data => {
      console.log(data);
      this.props.indexState({ loading: false });
      if(data && data.length > 0){
        //Mostrarlas y guardar en local
        this.setState({ groups: data });
      } else {
        Util.notification('No tienes grupos actualmente');
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <List
            dataArray={this.state.groups} renderRow={data =>
              <ListItem button noBorder>
                <Left>
                  <Text>{data.nombre}</Text>
                </Left>
                <Left>
                  <Text>{data.ultimo_mensaje}</Text>
                </Left>
              </ListItem>
            }
          />

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Grupos</Text>
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

export default connect(mapStateToProps, bindAction)(Groups);
