import { Share, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'

import { Property } from '../../types/property'
import { getStateAbbreviation } from '@/utils/getStateAbbreviation'
import { Row } from '../Row'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Text, View } from '../Themed'
import Colors from '@/constants/Colors'

const PropertyHeaderSection = ({property}: {property: Property}) => {
    const colorScheme = useColorScheme();
    const [heartIconName, setHeartIconName] = useState<"heart" | "heart-outline">("heart-outline")    
    
    const handleHeartPress = () => {
        if(heartIconName === " heart"){
            return setHeartIconName("heart-outline")
        }
        setHeartIconName("heart-outline")
    };

    const shareItem = async () => {
        try {
            await Share.share({
                message: "Check out this sweet apartment I found on Renta.com"
            })
        } catch (error: unknown) {
            alert("Sorry, we're unable to share")
        };
    }  
    return (
    <>
      <Text style={[styles.defaultMarginVertical, styles.header]}>{property.name}</Text>
      <Row style={styles.containerRow}>
        <View>
            <Text style={ styles.other}>{property.street}</Text>
            <Text style={ styles.other}>{`${property.city}, ${getStateAbbreviation(property.state)} ${property.zip}`}</Text>
        </View>
        <Row style={styles.iconRow}>
            <MaterialIcons 
                onPress={async() => {await shareItem()}}
                name='ios-share'
                size={30}
                style={styles.shareIcon}
                color={Colors[colorScheme ?? 'dark'].tint}
            />
            <MaterialCommunityIcons 
                onPress={handleHeartPress}
                name={heartIconName}
                size={30}
                color={Colors[colorScheme ?? 'dark'].tint}
            />
        </Row>
      </Row>
    </>
  )
}

export default PropertyHeaderSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    other:{
        fontSize: 16,
    },
    containerRow:{
        justifyContent: "space-between"
    },
    iconRow:{
        paddingRight: 5,
    },
    shareIcon:{
        marginRight: 20,
        marginTop: -4,
    },
})