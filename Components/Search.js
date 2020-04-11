// Components/Search.js
import React from 'react'
import { StyleSheet, View, Button, TextInput, ActivityIndicator} from 'react-native'
import FilmList from './FilmList'
import {getFilmFromApiWithSearchedText} from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component { 

    constructor(props){
        super(props)
        this.state = { 
            films : [],
            isLoading: false
            //searchedText: ""
        }
        this.page=0
        this.totalPage=0
        this.searchedText=""
        this._loadFilms = this._loadFilms.bind(this)
    }

    _loadFilms(){
        console.log('taille=>',this.searchedText.length)
        if(this.searchedText.length>0){
            this.setState({isLoading:true})
            getFilmFromApiWithSearchedText(this.searchedText, this.page+1)
                .then(data => {
                    this.page=data.page
                    this.totalPage=data.total_pages
                    this.setState({ 
                        films: [...this.state.films, ...data.results], 
                        isLoading: false 
                    })
                })    
        }
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

    _searchTextInputChanged(text){
        this.searchedText=text
        //getFilmFromApiWithSearchedText(text).then(data => this.setState({ films:data.results }))
    }

    _searchFilms(){
        this.page=0
        this.totalPage=0
        this.setState({
            films : []
        }, () => {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
        })
        
    }

    /*_displayDetailForFilm = (idFilm) =>{
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    _isFilmFavorite= (idFilm)=>{
        if(this.props.favoritesFilm.findIndex(item=> item.id === idFilm) !== -1 ){
            return true
        }else{
            return false
        }
    }*/

    componentDidUpdate(){
        //console.log('Search /', this.props.favoritesFilm)
    }

    render(){

        return (
          <View style={styles.main_container}>
            <View style= {styles.bar_search}>  
                <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={()=> this._searchFilms()} placeholder="Titre du film" style={styles.textInput}/>
                <Button style={styles.button} title="🔍" onPress={()=> this._searchFilms()}/>
            </View>    
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

const styles =StyleSheet.create({
    main_container:{
        flex: 1
    },
    textInput:{
        marginLeft: 5,
        marginRight:5,
        borderColor:'#000000',
        borderBottomWidth:1,
        paddingLeft:5,
        flex:1
    },
    button:{
        flex:1,
        marginRight: 10
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bar_search: {
        flexDirection:'row'
    },
    flatList:{}
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)