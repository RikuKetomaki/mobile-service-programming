import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, StatusBar } from 'react-native';
import * as Location from 'expo-location';


  export default function App() {
    // const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setIsLoading(false);
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest
        });
        setLongitude(Location.coords.latitude);
        setLatitude(Location.coord.longitude);
        setIsLoading(false);
        setLocation(location);
      })();
    }, []);

    // let text = 'Waiting...';
    // if (errorMsg) {
    //     text = errorMsg
    // }

    if (isLoading) {
      return ( 
        <View>
          <Text>Retrieving location...</Text>
        </View>
      )
    } else {
      return(
      <View>
        <Text>Location:</Text>
        <Text>{latitude.toFixed(3)}</Text>
        <Text>{longitude.toFixed(3)}</Text>
        <Text>{errorMsg}</Text>
      </View>
      )
    }

}
