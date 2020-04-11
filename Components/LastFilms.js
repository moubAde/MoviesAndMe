// Components/LastFilms.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import FilmList from './FilmList'
import {getNewFilmFromApi} from '../API/TMDBApi'

class LastFilms extends React.Component {
 
    constructor(props){
        super(props)
        this.state = { 
            films : [],
            isLoading: true
        }
        this.page=0
        this.totalPage=0
        this._loadFilms = this._loadFilms.bind(this)
    }


    _loadFilms(){
        getNewFilmFromApi(this.page+1)
            .then(data => {
                this.page=data.page
                this.totalPage=data.total_pages
                this.setState({ 
                    films: [...this.state.films, ...data.results], 
                    isLoading: false 
                })
            }) 
    }

    _displayLoading(){
        if(this.state.isLoading){
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    componentDidMount(){
        this._loadFilms()
    }

    render() {
        return (
            <View style={styles.main_container}> 
              <FilmList 
                  films={this.state.films}
                  navigation={this.props.navigation}
                  loadFilms={this._loadFilms}
                  page={this.page}
                  totalPage={this.totalPage}
                  modeView="FIRST_VIEW"/>
              {this._displayLoading()}
            </View>
          )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LastFilms