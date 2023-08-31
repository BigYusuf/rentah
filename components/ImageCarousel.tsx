import { Image, FlatList, Pressable, ImageStyle, useColorScheme, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useRef, useState } from 'react';
import { WIDTH } from '../constants/Sizes';
import { View, Text } from './Themed';

export const ImageCarousel = ({
  images,
  onImagePress,
  chevronShown,
  indexShown,
  imageStyle,
}: {
  images: string[];
  onImagePress?: () => void;
  chevronShown?: boolean;
  indexShown?: boolean;
  imageStyle?: ImageStyle;
 }) => {
    const colorScheme = useColorScheme();

    const [ activeIndex, setActiveIndex ] = useState(0)

    const flatlistRef = useRef<FlatList | null>(null);
    const viewConfig = {viewAreaCoveragePercentThreshold: 95} 
    
    const onViewRef = useRef(({changed}: { changed: any}) => {
        if(changed[0].isViewable){
        setActiveIndex(changed[0].index)
        }
    })
    const handlePressLeft = () => {
        if(activeIndex === images.length - 1)
        return flatlistRef.current?.scrollToIndex({animated:false, index: 0});
        flatlistRef.current?.scrollToIndex({index: activeIndex + 1});
    }
    
    const handlePressRight = () => {
        if(activeIndex === images.length - 1)
        return flatlistRef.current?.scrollToIndex({animated:false, index: 0});
        flatlistRef.current?.scrollToIndex({index: activeIndex + 1});
    }

     return (
    <>
        <FlatList 
              ref ={(ref) => (flatlistRef.current = ref)}
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment='center'
              pagingEnabled
              viewabilityConfig={viewConfig}
              keyExtractor={(property)=> property}
              onViewableItemsChanged={onViewRef.current}
              renderItem={({item, index}) =>(
                <Pressable key={index} onPress={onImagePress}>
                  <Image source={{uri: item}} style={[styles.image, imageStyle]} />
                </Pressable>
              )}
            /> 
            {chevronShown &&
            <>
              <Pressable  style={styles.leftIcon} onPress={handlePressLeft} >
                <MaterialCommunityIcons name='chevron-left' color={Colors[colorScheme ?? 'dark'].white} size={45} />
              </Pressable>
              <Pressable style={styles.rightIcon} onPress={handlePressRight}>
                <MaterialCommunityIcons name='chevron-right' color={Colors[colorScheme ?? 'dark'].white} size={45} />
              </Pressable>
            </>
            }
            {indexShown &&
              <View style={styles.index}>
                <Text style={styles.indexText}>
                  {activeIndex + 1} of {images.length} photos
                </Text>
              </View>
            }
          
    </>
  )
}

const styles = StyleSheet.create({
    image: {
        height: 225,
        width: WIDTH, 
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    leftIcon:{
        position:"absolute",
        top: 95, 
        left: 5
    },
    rightIcon:{
        position:"absolute", 
        top: 95, 
        right: 5
    },
    index:{
      position: "absolute",
      backgroundColor: "rgba(0, 0, 0, 0.7)",// use this to give black background
      paddingVertical: 3,
      top: 20,
      left: 15,
      paddingHorizontal: 10,
      borderRadius: 30,
    },
    indexText:{
      color: "white"
    },
  });