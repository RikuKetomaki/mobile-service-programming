import { View, Text } from 'react-native';
import style from '../styles/Style';

export default function Footer () {
    
    return (
        <View style={style.footer}>
            <Text style=
            {style.author}>Riku Ketomäki</Text> 
            {/* Name in footer for assignment */}
        </View>
    )
}