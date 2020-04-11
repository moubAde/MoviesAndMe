// Components/FilmItem.js
import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions} from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'
import moment from 'moment'

//getImageFromApi(film.poster_path)
class FilmItem extends React.Component{

    constructor(props){
      super(props)
      this.state={
        code:0
      }
    }

    _displayFavoriteImage(isFilmFavorite){
      if(isFilmFavorite){
          var sourceImage = require('../Images/ic_favorite.png')
          return (
            <Image
                source={sourceImage}
                style={styles.favorite_image}/>
          )
      }
    }

    _diaplayView(film, displayDetailForFilm, isFilmFavorite, modeView){
      switch(modeView) {
        case "FIRST_VIEW":
          return (
              <TouchableOpacity 
                  onPress={() => displayDetailForFilm(film.id)}
                  style={styles.main_container}>
                  <Image
                      style={styles.image}
                      source={{uri: getImageFromApi(film.poster_path)}}/>
                  <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._displayFavoriteImage(isFilmFavorite)}
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
          )
        case "SEEN_VIEW":
          return (
            <TouchableOpacity 
                onPress={() => displayDetailForFilm(film.id)}
                onLongPress={()=> this._changeMessage()}
                style={styles.seen_main_container}>
                <Image 
                  style={styles.seen_image} 
                  source={{uri: getImageFromApi(film.poster_path)}} />
                <Text style={styles.seen_title_text}>{ (this.state.code===0) ? film.title : 'Sorti le '+moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
        )
      }
    } 

    _changeMessage(){
      this.setState({code: (this.state.code===0)? 1 : 0})
    }

    render(){
        const {film, displayDetailForFilm, isFilmFavorite, modeView} = this.props
        return (
          <FadeIn>
            {this._diaplayView(film, displayDetailForFilm, isFilmFavorite, modeView)}
          </FadeIn>  
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row'
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row',
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    vote_text: {
      fontWeight: 'bold',
      fontSize: 26,
      color: '#666666'
    },
    description_container: {
      flex: 7
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container: {
      flex: 1
    },
    date_text: {
      textAlign: 'right',
      fontSize: 14
    },
    favorite_image:{
      width:20,
      height:20,
      marginTop:5
    },
    seen_image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: '#9B9B9B',
      borderWidth: 2
    },
    seen_title_text:{
      fontSize: 20,
      flex:1,
      flexWrap: 'wrap',
      paddingLeft: 5,
    },
    seen_main_container: {
      height: 110,
      flexDirection: 'row',
      alignItems:'center',
    },
})

export default FilmItem