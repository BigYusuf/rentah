import { StyleSheet, TouchableOpacity, ViewStyle, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Location } from '../types/locationIQ'
import { Text, View } from './Themed';
import RecentSearchBtn from './RecentSearchBtn';
import { getFormattedLocationText } from '../utils/getFormattedLocationText';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const RecentSearchList = ({
    recentSearches,
    style,
}:{
    recentSearches?: Location[];
    style?: ViewStyle

}) => {
    const [showMore, setShowMore] = useState(false)
    const colorScheme = useColorScheme();
    const navigation = useNavigation()

    const handleButtonPress = () => setShowMore(!showMore);

    const ShowButton = ({text}:{text: string}) => {
        return(
            <TouchableOpacity onPress={handleButtonPress}
                style={styles.showButton}>
                <Text style={[styles.showButtonText, { color: Colors[colorScheme ?? 'light'].lightblue }]}>{text}</Text>
            </TouchableOpacity>
        )
    }
    const handleRecentSearchBtnPress = (location: Location) => {
       
        navigation.navigate('index', 
        { location: getFormattedLocationText(location),
            lat: location.lat,
            lon: location.lon,
            boundingBox: location.boundingbox
        },
    )
   
    }

    const getList = () => {
        if(!recentSearches || recentSearches.length === 0) return
        if( recentSearches.length > 2 && !showMore) 
            return(
                <>
                    {recentSearches.map((i, index) => 
                    index < 2 ? (
                        <RecentSearchBtn 
                            key={i.display_name + index}
                            name={getFormattedLocationText(i)}
                            style={styles.RecentSearchBtn}
                            onPress={() => handleRecentSearchBtnPress(i)}
                        />
                    ) : null
                    )}
                    <ShowButton text="See More"/>
                </>
            );
            return(
                <>
                    {recentSearches.map((i, index) =>  (
                        <RecentSearchBtn 
                            key={i.display_name + index}
                            name={getFormattedLocationText(i)}
                            style={styles.RecentSearchBtn}
                            onPress={() => handleRecentSearchBtnPress(i)}
                        />
                    ))}
                    {recentSearches.length > 2 ? <ShowButton text="See Less"/> : null}
                </>
            )
        
    }
  return (
    <View style={style}> 
      {getList()}
    </View>
  )
}

export default RecentSearchList

const styles = StyleSheet.create({
    container:{},
    RecentSearchBtn:{
        marginVertical: 5,
    },
    showButton:{
        alignSelf: "flex-start",
    },
    showButtonText:{
        width: "100%",
        padding: 10,
        fontWeight:"bold",
        textAlign: 'center'
    },
})