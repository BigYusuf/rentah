import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useRef, useState } from 'react'
import { View } from '@/components/Themed';
import MapView from 'react-native-maps';
import { Property } from '@/types/property';
import { MapMaker } from './MapMaker';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Card } from './Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Map = ({ properties }:{properties: Property[]}) => {
    const [activeIndex, setActiveIndex] = useState(-1)
    const colorScheme = useColorScheme();
    const mapRef = useRef<MapView | null>(null);
    const navigation = useNavigation();

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({tabBarStyle: {display: "flex"}});
    }

    const handleMapPress = () => {
        if(Platform.OS === "android") unFocusProperty()
    }
    const handleMarkerPress = (index: number) => {
        if(Platform.OS === "ios"){
            setTimeout(()=>{
                mapRef.current?.animateCamera({
                    center:{
                        latitude: properties[index].lat,
                        longitude: properties[index].long,
                    }
                })
            }, 100);
        }
        setActiveIndex(index)
        navigation.setOptions({tabBarStyle: {display: "none"}});
    }

  return (
    <View style={styles.container}>
        <MapView style={styles.map} userInterfaceStyle='light' ref={mapRef} onPress={handleMapPress} >
            {properties.map((i, index) => (
                <MapMaker
                    key={index}
                    lat={i.lat}
                    long={i.long}
                    color={
                        activeIndex === index ? 
                        Colors[colorScheme ?? 'light'].lightblue 
                        : 
                        Colors[colorScheme ?? 'light'].tint
                    }
                    onPress={() => handleMarkerPress(index)}
                />
            ))}
        </MapView>
        {activeIndex > -1 &&
            <>
                {
                Platform.OS === 'ios' && 
                    <TouchableOpacity onPress={unFocusProperty} style={[styles.exit, {backgroundColor:Colors[colorScheme ?? 'light'].white}]}>
                        <MaterialCommunityIcons name='close'
                         color={Colors[colorScheme ?? 'light'].tint} size={24} />
                    </TouchableOpacity> 
                }
                <Card  style={styles.card} property={properties[activeIndex]} />
            </> 
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        overflow: "hidden"
    },
    map:{
        height: "100%", 
        width: "100%",
        position: "relative",
    },
    exit:{
        padding: 10,
        position: "absolute",
        top: 170, 
        left: 15,
        borderRadius:30,
    },
    card:{
        position: "absolute",
        bottom: 10,
        height: 360,
    }
})