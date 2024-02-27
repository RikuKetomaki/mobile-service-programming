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
    const [turn, setTurn] = useState (0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [throwDicesButtonText, setThrowDicesButtonText] = useState('Start game')

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

    useEffect(() => {
        if (turn >= 6) {
            setThrowDicesButtonText("New game")
            setStatus("Game Over")
        }
    }, [turn])

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
        if (nbrOfThrowsLeft <= 0 && selectedSpots[i] == false) {
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

            let pointsAmount = spotValue * instancesInBoard
            let points = [...spotPoints];
            points[i] = pointsAmount;
            setSpotPoints(points);
            setTurn(turn + 1);
            setTotalPoints(totalPoints + pointsAmount);
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            selectedDices.fill(false);

        } else {
            setStatus("You have to throw dices 3 times first")
        }
    }

    const throwDices = () => {
        if (nbrOfThrowsLeft <= 0) {
            setStatus("Please, add points first")
            return
        } else if (turn >= 6) {
            setGameEndStatus(false);
            setStatus("Throw Dices");
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            selectedDices.fill(false);
            setTurn(0);
            spotPoints.fill(0);
            setTotalPoints(0);
            selectedSpots.fill(false);
            setThrowDicesButtonText("Star Game")
            return
        }
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    boardValues[i] = randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
            setThrowDicesButtonText("Throw Dices")
    }
    
    return (
        <>
            <Header />
            <View style={Style.gameboard}>
                <Text>Turn: {turn}</Text>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={Style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={Style.gameinfo}>{status}</Text>
                <Text style={Style.gameinfo}> Total points: {totalPoints}</Text>
                <Pressable style={Style.button}
                    onPress={() => throwDices()}>
                        <Text style={Style.buttonText}>{throwDicesButtonText}</Text>
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