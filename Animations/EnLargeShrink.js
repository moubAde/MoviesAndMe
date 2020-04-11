// Animations/EnLargeShrinks.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class EnLargeShrinks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        viewSize: (this.props.shouldEnlarge) ? new Animated.Value(80) : new Animated.Value(40)
    }
  }

  componentDidUpdate() {
    Animated.spring(
      this.state.viewSize,
      {
        toValue: (this.props.shouldEnlarge) ? 80 : 40
      }
    ).start()
  }

  render() {
    return (
        <Animated.View
          style={{ width: this.state.viewSize, height: this.state.viewSize }}>
          {this.props.children}
        </Animated.View>
    )
  }
}

export default EnLargeShrinks