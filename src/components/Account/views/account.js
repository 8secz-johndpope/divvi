import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Image,
  Slider
} from 'react-native'
import { Container, Content, Card, CardItem, Text, Icon, Right, Thumbnail, Left, Body, Tab, Tabs, TabHeading, StyleProvider } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import Button from '../../common/button'
import Header from '../../common/header'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import Expo, {Font} from 'expo'
import * as actions from '../../../actions'
import History from './history'

const { width, height } = Dimensions.get('window')

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

class Account extends Component {
  constructor () {
    super()
    this.state = {
      owner: null,
      balance: 0,
      donations: 0,
    }
  };

componentWillMount = () => {
    this.setState({account: this.props.user})
    this.refreshBalance()
}
refreshBalance = () => {
    let self = this
    let div
    DivviCoin.deployed().then((instance) => {
      div = instance
      return div.balanceOf.call(self.props.user)
    }).then(function (value) {
      self.setState({ balance: value.valueOf() })
      return div.balanceOfDonations.call(self.props.user)
    })
      .then((bal) => {
        self.setState({ donations: bal.valueOf() })
      })
      .catch(function (e) {
        console.log(e)
      })
  }

  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#283940',
      }}>
      <Header title={'Account'}/>
        <StyleProvider style={getTheme(material)}>
      <Tabs>
          <Tab style={{backgroundColor:'#283940'}} heading={ <TabHeading><Icon name="ios-analytics-outline" /><Text>Overview</Text></TabHeading>}>
          <Grid>
          <Row style={{backgroundColor:'#A2D5AC', borderWidth:0}}>
          <Col style={styles.center}>
          <Text style={{color: 'white'}}> Current Balance</Text>
          <Text style={{color: 'white', fontSize:35}}> {this.state.balance} DIV</Text>
          </Col>
          <Col>
          </Col>
          </Row>
          <Row style={{backgroundColor:'#3AAFA9', borderWidth:1, borderColor: '#3AAFA9'}}>
          <Col>
          </Col>
          <Col style={styles.center}>
          <Text style={{color: 'white'}}> Total Donations</Text>
          <Text style={{color: 'white', fontSize:35}}> {this.state.donations} DIV</Text>
          </Col>
          </Row>
          <Row style={{backgroundColor:'#557C83', borderWidth:0}}>
          <Col style={styles.center}>
          <Text style={{color: 'white'}}> Donation Amount</Text>
          <Text style={{color: 'white', fontSize:35}}> 1 DIV</Text>
          </Col>
          <Col>
          </Col>
          </Row>
          </Grid>
          </Tab>
          <Tab style={{backgroundColor:'#283940'}} heading={ <TabHeading><Icon name="ios-time-outline" /><Text>History</Text></TabHeading>}>
          <Container>
          <Content>
          <History/>
     </Content>
        </Container>
          </Tab>
        </Tabs>
          </StyleProvider>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, history: state.data.history}
}

export default connect(mapStateToProps, actions)(Account)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
