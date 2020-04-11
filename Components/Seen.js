// Components/Seen.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import FilmList from './FilmList'

class Seen extends React.Component {
 
    render() {
        return (
            <View style={styles.main_container}> 
                <FilmList 
                    films={this.props.seenFilm}
                    navigation={this.props.navigation}
                    modeView="SEEN_VIEW"/>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1
    },
    avatar_container:{
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        seenFilm: state.toggleSeen.seenFilm
    }
}
export default connect(mapStateToProps)(Seen)