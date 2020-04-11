// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import LastFilms from '../Components/LastFilms'
import Seen from '../Components/Seen'

const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: Search,
      navigationOptions: {
        title: 'Rechercher'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
  })

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Favoris'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
  }) 

const LastFilmsStackNavigator = createStackNavigator({
    LastFilms: {
      screen: LastFilms,
      navigationOptions: {
        title: 'Les Derniers Films'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
  })

const SeenStackNavigator = createStackNavigator({
    Seen: {
      screen: Seen,
      navigationOptions: {
        title: 'Les Films Vus'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
  })

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
          return <Image
            source={require('../Images/ic_search.png')}
            style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
        }
      }
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_favorite.png')}
            style={styles.icon}/>
        }
      }
    },
    LastFilms: {
      screen: LastFilmsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_fiber_new.png')}
            style={styles.icon}/>
        }
      }
    }, 
    Seen: {
      screen: SeenStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_seen.png')}
            style={styles.icon}/>
        }
      }
    }  
  },{
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  })

const styles = StyleSheet.create({
  icon:{
      width:30,
      height:30
  }
})


export default createAppContainer(MoviesTabNavigator)