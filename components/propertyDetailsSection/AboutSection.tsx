import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Text, View } from '../Themed';
import { Property } from '../../types/property';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BulletedList from '../BulletedList';

const AboutSection = ({property}: {property: Property}) => {
    const colorScheme = useColorScheme();  
    
    return (
    <>
        <Text style={[styles.defaultMarginVertical, styles.header]}>About</Text>
        <View style={styles.subHeader}>
            <MaterialIcons
                name='apartment'
                size={24}
                color={"#36454f"}
            />
            <Text style={styles.apartmentText}>{property.name}</Text>
        </View>
            <Text style={styles.aboutText}>{property.about}</Text>
        <>
            <View style={[styles.row, styles.subHeader]}>
                <MaterialCommunityIcons
                    name='star-outline'
                    size={26}
                    color={"black"}
                />
                <Text style={styles.featuresText}>Unique Features</Text>
            </View>
        <View style={styles.bulletListContainer}>
            {property.features ? 
            <BulletedList data= {[...property.tags, ...property.features]} />
            :
            <BulletedList data= {property.tags} />
            }
        </View>
        </>
    </>
  )
}

export default AboutSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginTop: 10,
        marginBottom: 15,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    subHeader:{
        flexDirection: "row",
    },
    aboutText:{
        padding: 10,
    },
    row:{
        alignItems: "center",
        marginTop: 10,
    },
    bulletListContainer:{
        paddingHorizontal: 5,
    },
    apartmentText:{
        paddingLeft: 10,
        marginBottom: 10,
        fontSize:20,
        fontWeight: "600"
    },
    featuresText:{
        paddingLeft: 10,
        fontSize:20,
        fontWeight: "600"
    },
})