import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Style from '../styles/Style';
import {
    NBR_OF_THROWS,
    NBR_OF_DICES,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Col, Container, Row } from 'react-native-flex-grid';

let board =[];

export default function Gameboard ({navigation, route}) {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] =useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);

    //Are dices selected or not
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));

    //Dice spots (1, 2, 3, 4, 5, 6) for each dice
    const [diceSpots, setDiceSpots] =
        useState(new Array(NBR_OF_DICES).fill(0));

    //Are dice points selected or not?
    const [selectedDicePoints, setSelectedDicePoints] = 
        useState(new Array(MAX_SPOT).fill(false));

    const [dicePointsTotal, setDicePointsTotal] =
        useState(new Array(MAX_SPOT).fill(0));

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                    key={"dice" + dice}
                    // onPress{() => selectedDicePoints(dice)}
                    >
                <MaterialCommunityIcons
                    name={board[dice]}
                    key={"dice" + dice}
                    size={50}
                    color={"steelblue"}
                >
                </MaterialCommunityIcons>
                </Pressable> 
            </Col>
        );
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "steelblue";
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft > NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices)
        } else {
            setStatus("You have to throw dices first");
        }
    }

    //CHECK RECORDING FOR FUNCTION
    const throwDices = () => {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber
            }
        }
        setNbrOfThrowsLeft('jotain')
    }
    
    return (
        <>
            <Header />
            <View>
                <Text>Gameboard here</Text>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text>Player: {playerName}</Text>
            </View>
            <Footer />
        </>
    )
}