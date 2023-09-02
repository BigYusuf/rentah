import { FlatList, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'

import { Property } from '@/types/property'
import { View, Text } from '../Themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getStateAbbreviation } from '@/utils/getStateAbbreviation'
import MapView from 'react-native-maps'
import Colors from '@/constants/Colors'
import { MapMarker } from '../MapMarker'
import ScoreCard from '../ScoreCard'

const LocationSection = ({property}: {property: Property}) => {
    const colorScheme = useColorScheme();

    return (
      <>
        <Text style={[styles.defaultMarginVertical, styles.header]}>Location</Text>
         <View style={styles.row}>
            <MaterialCommunityIcons
                name='map-outline'
                color={'black'}
                size={24}
            />
            <Text style={styles.mapText}>Map</Text>
         </View>
        <Text style={styles.location}>
            {property.street}, {property.city}, {" "}{getStateAbbreviation(property.state)} 
            {property.zip}

        </Text>
        <View style={styles.mapContainer}>
            <MapView
            provider='google'
            style={styles.map}
            initialRegion={{
                latitude:property.lat,
                longitude:property.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
                <MapMarker
                 color={Colors[colorScheme ?? 'light'].lightblue}
                 lat={property.lat}
                 long={property.long}
                 onPress={()=> console.log("View Property")}
                />
            </MapView>
        </View>
        {property.scores? 
          <FlatList
            horizontal
            style={styles.defaultMarginVertical}
            showsHorizontalScrollIndicator={false}
            data={property.scores}
            keyExtractor={(item)=> item.type}
            renderItem={({ item }) =>
                <ScoreCard score={item} style={styles.scoreCard}/>
            }
          />
        : null}
      </>
  )
}

export default LocationSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    mapText:{
        marginLeft: 15,
        fontSize: 20,
        fontWeight: "bold"
    },
    row:{
        alignItems: "center",
        paddingVertical: 15,
        flexDirection: 'row'
    },
    location:{},
    mapContainer:{
        width: "100%",
        overflow: "hidden",
        height: 250,
        marginVertical: 10,
        borderRadius: 5,
    },
    map:{
        width: "100%",
        height: "100%",
    },
    scoreCard:{
        marginRight: 10,
    },
})