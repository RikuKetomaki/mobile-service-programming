import { Pressable, Text, TextInput, View, Keyboard } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "./Header";
import Footer from "./Footer";
import {
    NBR_OF_THROWS,
    NBR_OF_DICES,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game';
import { useState } from "react";
import Style from "../styles/Style";


export default function Home ({navigation}) {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <>
            <Header/>
            <View style={Style.gameboard}>
                <MaterialCommunityIcons 
                    name="information"
                    size={90}
                    color="purple"
                />
                {!hasPlayerName ?
                <>
                <Text>For scoreboard enter your name...</Text>
                    <TextInput onChangeText={setPlayerName} autoFocus={true} />
                    <Pressable style={Style.button}
                    onPress={() => handlePlayerName(playerName)} >
                        <Text style={Style.buttonText}>Ok</Text>
                    </Pressable>
                </>
                :
                <>
                    <Text>Rules of the game...</Text>
                    <Text multiline="true">
                        THE GAME: Upper section of the classic Yahtzee
                        dice game. You have {NBR_OF_DICES} dices and
                        for the every dice you have {NBR_OF_THROWS}
                        throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as
                        possible. In the end of the turn you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}.
                        Game ends when all points have been selected.
                        The order for selecting those is free.
                        POINTS: After each turn game calculates the sum
                        for the dices you selected. Only the dices having
                        the same spot count are calculated. Inside the
                        game you can not select same points from
                        {MIN_SPOT} to {MAX_SPOT} again.
                        GOAL: To get points as much as possible.
                        {BONUS_POINTS_LIMIT} points is the limit of
                        getting bonus which gives you {BONUS_POINTS}
                        points more.
                    </Text>
                    <Text multiline="true">Copy more text here....</Text>
                    <Text>Good luck, {playerName}</Text>
                    <Pressable  style={Style.button}
                        onPress={() => navigation.navigate(
                            'Gameboard', {player:playerName})}
                    >
                        <Text style={Style.buttonText}>PLAY</Text>
                    </Pressable>
                </>
            }
            </View>
            <Footer/>
        </>
    )
}