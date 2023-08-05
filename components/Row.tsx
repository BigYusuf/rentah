import { StyleSheet, ViewStyle } from 'react-native'
import { View } from './Themed';
import React from 'react'

export const Row = ({children, style}:{children: any, style?: ViewStyle}) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent:"space-between"
    }
})