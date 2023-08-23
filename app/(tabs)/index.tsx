import { Animated, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MapView from 'react-native-maps';

import { HEADERHEIGHT } from '../../constants/Sizes';
import { Card } from '../../components/Card';
import {Screen} from '../../components/Screen';
import AnimatedListHeader from '../../components/AnimatedListHeader';
import { Map } from '../../components/Map';
import { getPropertiesInArea } from '../../assets/data/properties';
import { Property } from '../../types/property';
import { Text } from '../../components/Themed';

export default function SearchScreen() {
  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown, setMapShown] = useState<boolean>(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [location, setLocation] = useState<string | undefined>(undefined)
 
  const route = useRoute();
 
  const mapRef = useRef<MapView | null>(null);
  
  
  useEffect(() => {
    if(route.params){
      const numBoundingBox = [
        Number(route.params.boundingBox[0]),
        Number(route.params.boundingBox[1]),
        Number(route.params.boundingBox[2]),
        Number(route.params.boundingBox[3]),
      ];
      setLocation(route.params.location)
      setProperties(getPropertiesInArea(numBoundingBox))
      
      mapRef?.current?.animateCamera({
        center:{
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon),
        }
      })
    }
  
  }, [route])
  
  return (
    <Screen>
      <AnimatedListHeader 
        mapShown={mapShown} 
        setMapShown={setMapShown} 
        scrollAnimation={scrollAnimation}
        location={route.params? route.params.location: "Find a Location"}
        availableProperties ={properties ? properties.length : 0}
      />
      
      {mapShown ?
       <Map 
        properties={properties} 
        mapRef={mapRef} 
        initialRegion={
          route.params?{
            latitude: Number(route.params.lat),
            longitude: Number(route.params.lon),
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          }
          : undefined
        } 
       />
      :
        <>
        {properties.length > 0 ?
        
          <Animated.FlatList 
            onScroll={Animated.event(
              [{
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnimation,
                  }}
              }],{useNativeDriver: true}
            )}
            contentContainerStyle={{paddingTop: HEADERHEIGHT - 20}}
            bounces={false}
            scrollEventThrottle={16}
            data={properties}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator= {false}
            renderItem={({item}) =>(
              <Card property={item} style={styles.card}/>
            )}
          />
          :
          <Text style={{marginTop: 300}}>Tester</Text>
        }
        </>
      }
    </Screen>
  );
};


const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
  },
});
