import { LayoutChangeEvent, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Animated } from 'react-native'
import { HEADERHEIGHT, LISTMARGIN } from '@/constants/Sizes'
import { View } from './Themed'
import Colors from '@/constants/Colors'
import { HeaderInput } from './HeaderInput'
import HeaderFilterButtons from './HeaderFilterButtons'
import { HeaderLogistics } from './HeaderLogistics'
``
const AnimatedListHeader = (
    {
        scrollAnimation,
        mapShown,
        setMapShown
    }:
    {
        scrollAnimation: Animated.Value,
        mapShown: boolean,
        setMapShown: (bool: boolean) => void
    }) => {
    const colorScheme = useColorScheme();
    const [offsetAnimation] = useState(new Animated.Value(0))
    const [clampedScroll, setClampedScroll] = useState(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnimation
        ),
        0,
        1
      )
    );
    
    const navbarTranslate =  clampedScroll.interpolate({
      inputRange: [0, HEADERHEIGHT],
      outputRange: [0, -HEADERHEIGHT],
      extrapolateLeft: "clamp",
    });
    const onLayout = (event: LayoutChangeEvent) => {
      let {height} = event.nativeEvent.layout
      setClampedScroll(
        Animated.diffClamp(
          Animated.add(
            scrollAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolateLeft: "clamp",
            }),
            offsetAnimation
          ),
          0,
          height
        )
      )
    }
  return (
    <Animated.View onLayout={onLayout} style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].white, transform: [{translateY: navbarTranslate}]}]}>
        <View style={styles.wrapper}>
            <HeaderInput />
            <HeaderFilterButtons/>
        </View>
        <HeaderLogistics mapShown={mapShown} setMapShown={setMapShown} />
    </Animated.View>
    
  )
}

export default AnimatedListHeader

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        height: HEADERHEIGHT,
    },
    wrapper:{
        marginHorizontal: LISTMARGIN
    },
})