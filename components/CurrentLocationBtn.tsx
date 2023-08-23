import { StyleSheet, TouchableOpacity, ViewStyle, useColorScheme } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from './Themed'
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons'
import * as Location from "expo-location"

const CurrentLocationBtn = ({ style }:{ style?: ViewStyle }) => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if( status !== "granted"){
            alert("Permission to acess location was denied")
            return;
        }
        let location = await Location.getCurrentPositionAsync();
        handleNavigate(location);
    }

    const handleNavigate = (location: Location.LocationObject) => {
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;
        let boundingBox = [
            (lat - 0.048).toString(),
            (lat + 0.048).toString(),
            (lon - 0.041).toString(),
            (lon + 0.041).toString(),
        ];
        navigation.navigate('index', 
            { location: "Your Current Location",
                lat: lat.toString(),
                lon: lon.toString(),
                boundingBox
            },
        )
    }
  return (
    <View style={[styles.container, style as ViewStyle]}>
      <FontAwesome 
        name='location-arrow'
        size={30}
        style={styles.icon}
        color={Colors[colorScheme ?? 'light'].tint}
      />
      <TouchableOpacity onPress={async () => getLocation()}>
        <Text style={[styles.text, {color: Colors[colorScheme ?? 'light'].lightblue}]}>Use My Current Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CurrentLocationBtn

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
    },
    icon: { 
        marginLeft: 5,
    },
    text: {
        marginLeft: 10,
        fontWeight: "600",
    },
})