// Screens
import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  ScrollView,
  Text,
  Modal,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import Label from '../common/label'
import Button from '../common/button'
import * as actions from '../../actions'
import Container from '../common/container'

const { width, height } = Dimensions.get('window')

export default class SignIn extends Component {
  render () {
    return (
      <ScrollView style={styles.scroll}>
        <Container>
          <Text style={styles.header2}>
        D I V V I
          </Text>
        </Container>
        <Container >
          <TextInput placeholder={'password'} placeholderTextColor={'grey'} secureTextEntry={true} style={styles.textInput2}/>
        </Container>
        <Container>
          <Button label='Submit' styles={{
            label: styles.buttonWhiteText
          }} onPress={() => {
            this.props.onSubmit()
          }}/>
        </Container>
        <Container>
          <Button label='Create Account' styles={{
            label: styles.buttonBlackText
          }} onPress={() => {
            this.props.onSignUp()
          }}/>
        </Container>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#283940',
    padding: 30,
    flexDirection: 'column'
  },
  label: {
    color: '#99e6e6',
    fontSize: 13
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: 'white',
    color:'white'
  },
  textInput2: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: 'white',
    color:'white',
    marginBottom: 50
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#283940'
  },
  footer: {
    marginTop: 0
  },
  header: {
    fontSize: 40,
    color: '#99e6e6',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
    fontWeight:'100'
  },
  header2: {
    fontSize: 40,
    color: '#99e6e6',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70
  },
  noBorder: {
    backgroundColor: 'transparent',
    marginTop: 40
  }
})
