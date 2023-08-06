import { Animated, StyleSheet } from 'react-native';
import {Screen} from '@/components/Screen';
import { HEADERHEIGHT, LISTMARGIN } from '@/constants/Sizes';
import { Card } from '@/components/Card';
import { useState } from 'react';
import AnimatedListHeader from '@/components/AnimatedListHeader';
import { Map } from '@/components/Map';
import { properties } from '@/assets/data/properties';


export default function SearchScreen() {
  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown, setMapShown] = useState<boolean>(false)
 
  return (
    <Screen>
      <AnimatedListHeader mapShown={mapShown} setMapShown={setMapShown} scrollAnimation={scrollAnimation}/>
      
      {mapShown ?
       <Map properties={properties} />
      :
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
      }
    </Screen>
  );
};


const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
  },
});
