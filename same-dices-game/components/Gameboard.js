import React, {useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import style from '../styles/Style'

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;


export default Gameboard = () => {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

    const throwDices = () => {
        let sum = 0;
        for ( let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            sum += randomNumber;
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setSum(sum);
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if (nbrOfThrowsLeft == 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS);
        }
    }


    useEffect(() => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started')
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
            setNbrOfWins(0);
        }
    }, [nbrOfThrowsLeft])

    //useEffect not working because asynchronous befaviour, code added to trowDice() function instead
    // useEffect(() => {
    //     checkWinner();
    //     if (nbrOfThrowsLeft === NBR_OF_THROWS) {
    //         setStatus('Game has not started');
    //     }
    //     if (nbrOfThrowsLeft < 0) {
    //         setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    //         setNbrOfWins(0);
    //     }
    // }, [nbrOfThrowsLeft])

    // not sure where to put this
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <MaterialCommunityIcons
                name={board[i]}
                key={"row" + i}
                size={50}
                color={"steelblue"}
            >
            </MaterialCommunityIcons> 
        )
    }

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = setSelectedDices={i} ? false : true;
        setSelectedDices(dices)
    }

    return (
        <View style={style.gameboard}>
                <View style={style.flex}>{row}</View>
                <Text style={style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={style.gameinfo}>{status}</Text>
                <Pressable style={style.button} onPress={() => throwDices()}>
                    <Text style={style.buttonText}>
                        Throw dices
                    </Text>
                </Pressable>

        </View>
    )

}
