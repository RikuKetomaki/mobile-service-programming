import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import style from './styles/Style';
import Game from './constants/Game';

export default function App() {

  return (
    <View style={style.container}>
      <Header />
      <Game />
      <Footer />
    </View>    
  )
}