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
let boardValues=[];

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

    const [spotPoints, setSpotPoints] =
        useState(new Array(MAX_SPOT).fill(0));

    const [selectedSpots, setSelectedSpots] =
        useState(new Array(MAX_SPOT).fill(false));

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
                    onPress={() => selectDice(dice)}                 
                    >
                <MaterialCommunityIcons
                    name={board[dice]}
                    key={"dice" + dice}
                    size={50}
                    color={getDiceColor(dice)}
                >
                </MaterialCommunityIcons>
                </Pressable> 
            </Col>
        );
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "purple";
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices)
         } else {
             setStatus("You have to throw dices first");
         }
    }
    
    const spotRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        let iconNumber = spot+1
        spotRow.push(
            <Col key={"spot" + spot}>
                <Text style={Style.spottext}>{spotPoints[spot]}</Text>
                <Pressable
                    key={"spot" + spot}
                     onPress={() => selectSpot(spot)}                 
                    >
                <MaterialCommunityIcons
                    name={"numeric-" + iconNumber + "-box"}
                    key={"spot" + spot}
                    size={35}
                    color={getSpotColor(spot)}
                >
                </MaterialCommunityIcons>
                </Pressable> 
            </Col>
        );
    }

    function getSpotColor(i) {
        return selectedSpots[i] ? "black" : "purple";
    }

    const selectSpot = (i) => {
        if (nbrOfThrowsLeft == 0 && selectedSpots[i] == false) {
            let spots = [...selectedSpots];
            spots[i] = selectedSpots[i] ? false : true;
            setSelectedSpots(spots)

            let instancesInBoard = 0;
            const spotValue = i + 1 
            for (let j = 0; j < boardValues.length; j++) {
                if (boardValues[j] == spotValue) {
                    instancesInBoard = instancesInBoard+1
                }
            }

            let points = [...spotPoints];
            points[i] = spotValue * instancesInBoard;
            setSpotPoints(points)
        } else {
            setStatus("You have to throw dices 3 times first")
        }
    }

    //CHECK RECORDING FOR FUNCTION
    const throwDices = () => {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                boardValues[i] = randomNumber;
            }
        }
        //CHECK THIS IS CORRECT!!!
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
    }
    
    return (
        <>
            <Header />
            <View style={Style.gameboard}>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={Style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={Style.gameinfo}>{status}</Text>
                <Pressable style={Style.button}
                    onPress={() => throwDices()}>
                        <Text style={Style.buttonText}>Throw dices</Text>
                </Pressable>
                <Text>Player: {playerName}</Text>
                <Container fluid>
                    <Row>{spotRow}</Row>
                </Container>
            </View>
            <Footer />
        </>
    )
}