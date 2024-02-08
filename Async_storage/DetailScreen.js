import { AntDesign } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function DetailScreen({navigation}) {
    const [todo, setTodo] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <AntDesign 
                    style={styles.navButton}
                    name="save"
                    size={24}
                    color="balck"
                    onPress={() => navigation.navigate('Home', {todo: todo})}
                />
            ),
        })
    })

    return (
        <View>
            <TextInput 
                style={styles.newTask} onChangeText={text => setTodo(text)}
                value={todo}
                placeholder="add new task"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    netTask: {
        width: '100%',
        margin: 20,
        fontSize: 18
    },
    navButton: {
        marginRight: 5,
        fontSize: 24,
        padding:4
    }
})