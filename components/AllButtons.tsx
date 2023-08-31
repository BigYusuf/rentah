import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'

import { Text } from './Themed';


const AllButtons = ({
    title,
    style,
    textStyle,
    onPress
}:{
    title?: string; 
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    onPress: () => void
}) => {
    
  return (
    <TouchableOpacity style={style} onPress={onPress}>
        <Text style={[textStyle, styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AllButtons

const styles = StyleSheet.create({ 
  buttonText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: 'center',
    width: "100%",
  },
})