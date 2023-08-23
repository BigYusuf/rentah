import { StyleSheet, TouchableOpacity, ViewStyle, useColorScheme } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from './Themed'
import Colors from '../constants/Colors';

const RecentSearchBtn = ({
    name,
    onPress,
    style,
}:{
    name: string;
    onPress?: ()=> void;
    style?: ViewStyle; 
}) => {
    const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} >
      <MaterialCommunityIcons 
        name='clock-time-three-outline'
        size={24}
        color={Colors[colorScheme ?? 'light'].tint}
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  )
}

export default RecentSearchBtn

const styles = StyleSheet.create({
    container:{
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderColor:"#ccc",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection:"row",
        alignItems:"center",
    },
    text:{
        marginLeft: 10,
    },
})