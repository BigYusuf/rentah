import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Row } from './Row'
import { LISTMARGIN } from '../constants/Sizes'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'

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

export const HeaderLogistics = ({
  mapShown,
  setMapShown,
  availableProperties,
}:
{
  mapShown: boolean;
  setMapShown: (bool: boolean) => void;
  availableProperties: number;
}) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleMapPress = () => {
    navigation.setOptions({tabBarStyle: {display: "flex"}});
    
    if(mapShown) return setMapShown(false)
    setMapShown(true)
  }

  return (
    <Row style={styles.container}>
    <Row style={styles.row}>
        <MaterialCommunityIcons name="map-marker" size={18} color={Colors[colorScheme ?? 'light'].tint} />
        <Text style={[styles.buttonText,{ color: Colors[colorScheme ?? 'light'].gray}]}>
          {availableProperties ? `${availableProperties} Spaces Available` : `Search Spaces`}
        </Text>
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
      {mapShown ?
      <HeaderLogisticsButton 
        onPress={handleMapPress}
        label="List"
        iconName={"format-list-bulleted"}
        style={{marginLeft: 10}}
      />
      :
      <HeaderLogisticsButton 
        onPress={handleMapPress}
        label="Map"
        iconName={"map-outline"}
        style={{marginLeft: 10}}
      />
      }  
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