import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Row } from './Row'
import { LISTMARGIN } from '@/constants/Sizes'
import Colors from '@/constants/Colors'

const HeaderLogisticsButton = ({label, onPress, iconName, style}:{label: string, onPress:()=> void, iconName?: any, style?: any}) => {
  const colorScheme = useColorScheme();
  return(
    <TouchableOpacity onPress={onPress}>
      <Row style={[styles.row, style]}>
       {iconName && <MaterialCommunityIcons name={iconName} size={18} color={Colors[colorScheme ?? 'light'].lightblue} />}
        <Text style={[styles.buttonText,{ fontWeight:"bold", color: Colors[colorScheme ?? 'light'].lightblue, marginLeft: 5}]}>{label}</Text>
      </Row>
    </TouchableOpacity>
  )
}

export const HeaderLogistics = () => {
  const colorScheme = useColorScheme();
  return (
    <Row style={styles.container}>
    <Row style={styles.row}>
        <MaterialCommunityIcons name="map-marker" size={18} color={Colors[colorScheme ?? 'light'].tint} />
        <Text style={[styles.buttonText,{ color: Colors[colorScheme ?? 'light'].gray}]}>12,345 Avaliable</Text>
        <HeaderLogisticsButton 
          onPress={() => console.log("save")}
          label={"Save"}
          style={{marginLeft: 10}}
        />
    </Row>

    <Row>
      <HeaderLogisticsButton 
        onPress={() => console.log("sort")}
        label="Sort"
        iconName={"sort"}
      />
      <HeaderLogisticsButton 
        onPress={() => console.log("map")}
        label="Map"
        iconName={"map-outline"}
        style={{marginLeft: 10}}
      />
        
    </Row>
</Row>
  )
}


const styles = StyleSheet.create({
  container:{
    alignItems: "center", 
    marginHorizontal: LISTMARGIN, 
    marginVertical: 5,
  },
  row:{
    alignItems: "center"
  },
  buttonText:{
    fontSize: 14,
  }
})