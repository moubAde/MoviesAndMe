// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated } from 'react-native'
import HelloWord from './HelloWord'

class Test extends React.Component {

  constructor(props){
      super(props)
      this.state={
        topPosition: new Animated.Value(0)
      }
  }

  componentDidMount(){
    Animated.timing(
        this.state.topPosition,{
            toValue: 100,
            duration: 3000
        }
    ).start()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <HelloWord/>
        <Animated.View style={[styles.animation_view, {top: this.state.topPosition}]}></Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    //backgroundColor: Platform.OS === 'IOS' ? 'red' : 'blue',
    ...Platform.select({
        ios:{
            backgroundColor: 'red'
        },
        android: {
            backgroundColor: 'blue'
        }
    }),
    height: 50,
    width : 50
  },
  animation_view:{
    backgroundColor: 'red',
    height: 100,
    width : 100
  }
})

export default Test