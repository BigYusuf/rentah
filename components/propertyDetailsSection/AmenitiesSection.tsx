import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import BulletedList from '../BulletedList'
import { Property } from '@/types/property'

const AmenitiesSection = ({property}: {property: Property}) => {
   //later add amenities to db and remove the hardcoded amenities
    return (
    <> 
        <Text style={[styles.defaultMarginVertical, styles.header]}>Amenities</Text>
        <View style={styles.row}>
            <MaterialCommunityIcons
                name='google-circles-communities'
                xolor='black'
                size={24}
            />
            <Text style={styles.text}>Community Amenities</Text>
        </View>
        <BulletedList data={['Controlled Access']} heading='Services' />
        <BulletedList data={['Clubhouse', 'Lounge']} heading='Interior' />
        <BulletedList data={['Picnic Area', 'Gated', 'Grill']} heading='Outdoor Space' />
        <BulletedList data={['Fitness Center', 'Pool', 'Spa', 'Walking/ Biking Trails']} heading='Fitness & Recreation' />
        <View style={styles.row}>
            <MaterialCommunityIcons
                name='toy-brick-outline'
                xolor='black'
                size={24}
            />
            <Text style={styles.text}>Apartment Features</Text>
        </View>
        <BulletedList data={['Dishwasher', 'Disposer', 'Microwave', 'Kitchen','Refrigerator']} heading='Kitchen' />
        <BulletedList data={['Bay Window', 'Crown Molding', 'Walk In Closet', 'Linen Closet']} heading='Living Space' />
        <BulletedList data={['Balcony', 'Patio']} heading='Outdoor Space' />
        
    </>
  )
}

export default AmenitiesSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    row:{
        alignItems: "center",
        paddingVertical: 10,
        flexDirection: 'row'
    },
    text:{
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    text1:{},
})