import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text, View } from './Themed';
import { Property } from '../types/property';
import { MapMarker } from './MapMarker';
import Colors from '../constants/Colors';
import { Card } from './Card';
import { getPropertiesInArea } from '../assets/data/properties';

//used to persist the region if search area from the map
let mapRegion: Region | undefined = undefined;

export const Map = ({
     properties,
     mapRef,
     location,
     setLocation,
     setProperties,
     initialRegion
 }:{
     properties: Property[];
     mapRef: React.MutableRefObject<MapView | null>;
     location: string;
     setLocation: (Location: string) => void;
     setProperties: (properties: Property[]) => void; //get rid later in the future
     initialRegion?: Region | undefined
    }) => {
    const [activeIndex, setActiveIndex] = useState(-1)
    const [showSearchAreaBtn, setShowSearchAreaBtn] = useState(false)
    const [boundingBox, setBoundingBox] = useState<number[]>([]) //used for searching properties in a specific region
    const [region, setRegion] = useState<Region | undefined>(
        mapRegion ? mapRegion : undefined
    ) //used for searching properties in a specific region
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({tabBarStyle: {display: "flex"}});
    }

    const handleMapPress = () => {
        if(Platform.OS === "android") unFocusProperty()
    }
    const handleMarkerPress = (index: number) => {
            setTimeout(()=>{
                mapRef.current?.animateCamera({
                    center:{
                        latitude: properties[index].lat,
                        longitude: properties[index].long,
                    }
                })
            }, 100);

            setTimeout(()=>{
               const newRegion: Region = {
                latitude: properties[index].lat,
                latitudeDelta: region?.latitudeDelta ? region.latitudeDelta : 0.4,
                longitude: properties[index].long,
                longitudeDelta: region?.longitudeDelta ? region.longitudeDelta : 0.4,
               }
               setRegion(newRegion)
            }, 600);

        setActiveIndex(index)
        navigation.setOptions({tabBarStyle: {display: "none"}});
    }

    const handleSearchArea = () => {
        setProperties(getPropertiesInArea(boundingBox));
        setLocation("Map Area");
        mapRegion =region;
        setShowSearchAreaBtn(false)
    }
    useEffect(() => {
      if(location === "Map Area") return;
      if(initialRegion) {
        setShowSearchAreaBtn(false);
        setRegion(initialRegion);
      };
    
    }, [initialRegion])
    
  return (
    <View style={styles.container}>
        <MapView 
            provider={'google'}
            style={styles.map} 
            userInterfaceStyle={`light`}
            ref={mapRef} 
            onPress={handleMapPress}
            initialRegion={region}
            onRegionChangeComplete={(region, isGesture) => {
                if(isGesture?.isGesture){
                    if(!showSearchAreaBtn) setShowSearchAreaBtn(true)
                    const newBoundingBox = [
                        region.latitude - region.latitudeDelta / 2,
                        region.latitude + region.latitudeDelta / 2,
                        region.longitude - region.longitudeDelta / 2,
                        region.longitude + region.longitudeDelta / 2,
                    ];
                    setRegion(region)
                    setBoundingBox(newBoundingBox)
                }
            }}//isGesture on works when provider is google
            >
            {properties.map((i, index) => (
                <MapMarker
                    key={index}
                    lat={i.lat}
                    long={i.long}
                    color={
                        activeIndex === index ? 
                        Colors[colorScheme ?? 'light'].lightblue 
                        : 
                        Colors[colorScheme ?? 'light'].deepColorTint
                    }
                    onPress={() => handleMarkerPress(index)}
                />
            ))}
        </MapView>
        {activeIndex > -1 &&
            <>
                {
                Platform.OS === 'ios' && 
                    <TouchableOpacity onPress={unFocusProperty} style={[styles.exit, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
                        <MaterialCommunityIcons name='close'
                         color={Colors[colorScheme ?? 'light'].tint} size={24} />
                    </TouchableOpacity> 
                }
                <Card 
                    onPress={()=> navigation.navigate(
                        'PropertyDetailsScreen', {
                            property_id: properties[activeIndex].id
                        })
                    }
                    style={styles.card}
                    property={properties[activeIndex]}
                />
            </> 
        }
        {showSearchAreaBtn && activeIndex === -1 && 
            <TouchableOpacity 
                onPress={handleSearchArea}
                style={[styles.searchAreaBtn, {backgroundColor: Colors[colorScheme ?? 'light'].white, borderColor: Colors[colorScheme ?? 'light'].gray}]}>
                <Text style={[styles.searchAreaBtnTxt, {color: Colors[colorScheme ?? 'light'].deepColorTint}]} >Show Area</Text>
            </TouchableOpacity>
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
    },
    searchAreaBtn:{
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "center",
        borderWidth: 1,
    },
    searchAreaBtnTxt:{
        width: "100%",
        padding: 10,
        fontWeight:"bold",
        textAlign: 'center',
    },
})