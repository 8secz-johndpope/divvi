import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { CharityStack } from '../navigationConfiguration'
import { Icon, View } from 'react-native-elements'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    navigationState: state.cards
  }
}
class CardNavigation extends React.Component {
  static navigationOptions = {
    title: 'Browse',
    tabBarLabel: 'Browse',
    tabBarIcon: ({ tintColor }) => <Icon name= {'ios-heart-outline'} type={'ionicon'} size={45} color={tintColor}/>
  }
  render () {
    const { navigationState, dispatch } = this.props
    return (
      <CharityStack
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(CardNavigation)