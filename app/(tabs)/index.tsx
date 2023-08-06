import { Animated, StyleSheet } from 'react-native';
import {Screen} from '@/components/Screen';
import { HEADERHEIGHT, LISTMARGIN } from '@/constants/Sizes';
import { Card } from '@/components/Card';
import { useState } from 'react';
import AnimatedListHeader from '@/components/AnimatedListHeader';

export default function SearchScreen() {
  const [scrollAnimation] = useState(new Animated.Value(0))
 

  const properties = [
  {
    id:1,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house6.jpg?alt=media&token=6ad3535e-cdca-4aa0-9d18-577a0e4ee714",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house5.jpg?alt=media&token=9f25c776-3041-4e60-9670-25312e5237f9",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house4.jpg?alt=media&token=b0911d57-9572-44f2-bc86-f7b10fcdaf22",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house2.jpg?alt=media&token=1b41c6bb-97dc-44a9-9143-c2d04ecea015",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house1.jpg?alt=media&token=d58c248c-9e7b-48aa-b85e-b8ca4c2537d1",
  ],
    rentLow: 3750,
    rentHigh: 31050,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 112344,
    tags: [
      "Parking",
      "Value1",
      "Value2",
      "Value3",
      "Value4",
      "Value5",
      "Value6",
    ],
  },
  {
    id: 2,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house1.jpg?alt=media&token=d58c248c-9e7b-48aa-b85e-b8ca4c2537d1",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house2.jpg?alt=media&token=1b41c6bb-97dc-44a9-9143-c2d04ecea015",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house4.jpg?alt=media&token=b0911d57-9572-44f2-bc86-f7b10fcdaf22",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house5.jpg?alt=media&token=9f25c776-3041-4e60-9670-25312e5237f9",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house6.jpg?alt=media&token=6ad3535e-cdca-4aa0-9d18-577a0e4ee714",
  ],
    rentLow: 3750,
    rentHigh: 31050,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 112344,
    tags: [
      "Parking",
      "Value1",
    ],
  },
  {
    id: 3,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house3.jpg?alt=media&token=bf8b259d-df8e-4c73-ab19-b643fddbfe92",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house2.jpg?alt=media&token=1b41c6bb-97dc-44a9-9143-c2d04ecea015",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house6.jpg?alt=media&token=6ad3535e-cdca-4aa0-9d18-577a0e4ee714",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house4.jpg?alt=media&token=b0911d57-9572-44f2-bc86-f7b10fcdaf22"
  ],
    rentLow: 3750,
    rentHigh: 31050,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 112344,
    tags: [
      "Parking",
      "Value1",
      "Value2",
      "Value3",
      "Value4",
      "Value5",
      "Value6",
    ],
  },
  {
    id:4,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house6.jpg?alt=media&token=6ad3535e-cdca-4aa0-9d18-577a0e4ee714",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house5.jpg?alt=media&token=9f25c776-3041-4e60-9670-25312e5237f9",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house4.jpg?alt=media&token=b0911d57-9572-44f2-bc86-f7b10fcdaf22",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house2.jpg?alt=media&token=1b41c6bb-97dc-44a9-9143-c2d04ecea015",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house1.jpg?alt=media&token=d58c248c-9e7b-48aa-b85e-b8ca4c2537d1",
  ],
    rentLow: 3750,
    rentHigh: 31050,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 112344,
    tags: [
      "Parking",
      "Value1",
      "Value2",
      "Value3",
      "Value4",
      "Value5",
      "Value6",
    ],
  },
  {
    id: 5,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house1.jpg?alt=media&token=d58c248c-9e7b-48aa-b85e-b8ca4c2537d1",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house2.jpg?alt=media&token=1b41c6bb-97dc-44a9-9143-c2d04ecea015",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house4.jpg?alt=media&token=b0911d57-9572-44f2-bc86-f7b10fcdaf22",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house5.jpg?alt=media&token=9f25c776-3041-4e60-9670-25312e5237f9",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house6.jpg?alt=media&token=6ad3535e-cdca-4aa0-9d18-577a0e4ee714",
  ],
    rentLow: 3750,
    rentHigh: 31050,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 112344,
    tags: [
      "Parking",
      "Value1",
    ],
  },
  {
    id: 6,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house3.jpg?alt=media&token=bf8b259d-df8e-4c73-ab19-b643fddbfe92",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house2.jpg?alt=media&token=1b41c6bb-97dc-44a9-9143-c2d04ecea015",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house6.jpg?alt=media&token=6ad3535e-cdca-4aa0-9d18-577a0e4ee714",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4a10d.appspot.com/o/house4.jpg?alt=media&token=b0911d57-9572-44f2-bc86-f7b10fcdaf22"
  ],
    rentLow: 3750,
    rentHigh: 31050,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 112344,
    tags: [
      "Parking",
      "Value1",
      "Value2",
      "Value3",
      "Value4",
      "Value5",
      "Value6",
    ],
  },
];
  return (
    <Screen>
      <AnimatedListHeader scrollAnimation={scrollAnimation}/>
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
        style={styles.cards}
        renderItem={({item}) =>(
          <Card property={item} style={styles.card}/>
        )}
      />
    </Screen>
  );
};


const styles = StyleSheet.create({
  cards: {
    marginHorizontal: LISTMARGIN,
  },
  card: {
    marginVertical: 5,
  },
});
