import { View, Text } from 'react-native';
import style from '../styles/Style';

export default function Header () {
    
    return (
        <View style={style.header}>
            <Text style={style.title}>Dices Game</Text>
        </View>
    )
}