import { Animated, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MapView from 'react-native-maps';
import LottieView from 'lottie-react-native';

import { HEADERHEIGHT } from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import { Card } from '../../components/Card';
import {Screen} from '../../components/Screen';
import AnimatedListHeader from '../../components/AnimatedListHeader';
import { Map } from '../../components/Map';
import { getPropertiesInArea } from '../../assets/data/properties';
import { Property } from '../../types/property';
import { Text, View } from '../../components/Themed';

type SearchScreenParams = {
  key: string,
  name: string,
  path: string,
  params:{
    location: string;
    boundingBox: string[];
    lat: string;
    lon: string;
  }
}

export default function SearchScreen() {
  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown, setMapShown] = useState<boolean>(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [location, setLocation] = useState<string | undefined>(undefined)
  const colorScheme = useColorScheme();
 
  const route = useRoute<SearchScreenParams>();
  //console.log(route)
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
          <>
          {route.params?
            <View style={[styles.lottieContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
              
              <Text style={[styles.searchText, {color: Colors[colorScheme ?? 'light'].tint} ]} >
                No Properties Found
              </Text>
              <Text style={[styles.searchHint, {color: Colors[colorScheme ?? 'light'].gray} ]} >
                Please Search a different location
              </Text>
            </View>
            :
            <View style={[styles.lottieContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
              <LottieView 
                autoPlay
                loop
                style={styles.lottie}
                source={require("../../assets/lottiesAnimation/animation1.json")}
              />
              <Text style={[styles.searchText, {color: Colors[colorScheme ?? 'light'].tint} ]} >Begin Your Search</Text>
              <Text style={[styles.searchHint, {color: Colors[colorScheme ?? 'light'].gray} ]} >
                Find apartments anytime and anywhere
              </Text>
            </View>
          }
          </>
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
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 200,
    width: 200,
  },
  searchText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  searchHint: {
    fontWeight: "400",
    fontSize: 14,
  },
});
