import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Text } from './Themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Row } from './Row'
import Colors from '../constants/Colors'


export const HeaderInput = ({ location }:{ location: string }) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('FindLocationScreen')}>
        <Row style={{alignItems: "center"}}>
            <MaterialCommunityIcons name='magnify' color={Colors[colorScheme ?? 'light'].tint} size={28} />
            <Text style={styles.text}>{location}</Text>
        </Row>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container:{ 
        padding: 10, 
        marginTop: Platform.OS === "ios" ? 50 : 40, 
        borderWidth: 1, 
        borderColor: "#d3d3d3", 
        borderRadius: 30 
    },
    text: {
        marginLeft: 10, 
        textAlign: "left", 
        width: "100%",
    },
})