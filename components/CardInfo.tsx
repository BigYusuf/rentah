import { StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Text, View } from './Themed';
import React from 'react'
import { Row } from './Row'
import Colors from '../constants/Colors';
import { Property } from '../types/property';
import AllButtons from './AllButtons';
import { callPhoneNumber } from '@/utils/callPhoneNumber';

export const CardInfo = (
    {property}:
    {property: Property}) => {
        const navigation = useNavigation();
        const colorScheme = useColorScheme();
  return (
    <View style={styles.cardInfo}>
        <Row>
        <Text style={styles.rent}>${property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()} </Text>
        <MaterialCommunityIcons name='heart-outline' size={24} color={Colors[colorScheme ?? 'dark'].tint}/>
        </Row>
        <Text style={styles.others} >{property.bedroomLow === 0 ? "Studio" : property.bedroomLow} - {property.bedroomHigh} Beds </Text>
        <Text style={[styles.others, {marginTop: 5}]}>{property.name}</Text>
        <Text style={styles.others}>{property.city}, {property.state} {property.zip}</Text>
        <Text style={styles.tags}>
        {property.tags.map((tag, index) => index === property.tags.length-1 ? tag : `${tag}, `)}
        </Text>
        <Row style={{ marginTop: 5}}>
       < AllButtons 
            style={[styles.button, { borderWidth:1, borderColor: Colors[colorScheme ?? 'dark'].specialText }]} 
            textStyle={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].specialText }]}
            title="Email"
            onPress={() => navigation.navigate('MessageScreen', {property_id: property.id})}           
       />
       < AllButtons 
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
            textStyle={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white }]}
            title="Call"
            onPress={()=> callPhoneNumber(property.phoneNumber)}
       />
        </Row>
    </View>
  )
}


const styles = StyleSheet.create({
    cardInfo:{ 
        paddingVertical: 10, 
        paddingHorizontal: 5, 
        borderColor:"#d3d3d3", 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        borderWidth: 1
    },
    rent:{
        fontSize: 24,
        fontWeight: "500"
    },
    others:{
        fontSize: 16,
        fontWeight: "400"
    },
    tags:{
        fontSize: 12,
        marginTop: 5
    },
    button:{
        width:"49%",
    },
    buttonText:{
        width: "100%",
        padding: 10,
        fontWeight:"bold",
        textAlign: 'center'
    }
})