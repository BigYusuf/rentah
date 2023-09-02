import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const MapMarker = ({
    lat, long, onPress, color
}:{
    lat: number;
    long: number;
    onPress?: () => void;
    color: string;
}) => {
  return (
    <Marker coordinate={{ latitude: lat, longitude: long }} onPress={onPress}>
      <MaterialCommunityIcons name='map-marker' size={24} color={color} />
    </Marker>
  )
}

const styles = StyleSheet.create({})