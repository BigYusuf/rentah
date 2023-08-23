import { StyleSheet, Platform, TextInput, useColorScheme, FlatList, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { Screen } from '../components/Screen';
import { ModalHeader } from '../components/ModalHeader';
import { useState } from 'react';
import { useQueryClient }  from 'react-query'
import { Row } from '../components/Row';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Location } from '@/types/locationIQ';
import { getSuggestedLocations } from '../services/location';
import CurrentLocationBtn from '../components/CurrentLocationBtn';
import { getFormattedLocationText } from '../utils/getFormattedLocationText';
import RecentSearchList from '../components/RecentSearchList';

export default function FindLocationScreen () {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const recentSearches: Location[] | undefined =  queryClient.getQueryData("recentSearches")
  
  const setRecentSearch = (location: Location) => {
      
    queryClient.setQueryData("recentSearches", () => {
      if(recentSearches){
        let included = false;
        for(let i of recentSearches){
          if(
            i.display_name === location.display_name &&
            i.lon === location.lon &&
            i.lat === location.lat
          ){
            included = true;
            break;
          }
        }
        if(!included) return [location, ...recentSearches];
        return recentSearches
      }
      return [location]
    })
    
};

  const handleChange = async (val: string) => {
   setValue(val);
    if(val.length > 3){
      const locations = await getSuggestedLocations(val);
      if(locations.length > 0) setSuggestions(locations);
    }else if(val.length === 0) setSuggestions([]);
  };

  const handleSubmitEditing = async () => {
    const locations = await getSuggestedLocations(value);
   
    if(locations.length > 0){
      handleNavigate( locations[0])
    }
  };

  const handleNavigate = (location: Location) => {
    setRecentSearch(location)
   navigation.navigate('index', 
      { location: getFormattedLocationText(location),
        lat: location.lat,
        lon: location.lon,
        boundingBox: location.boundingbox
      },
    )
  };

  const getInput = () => {
    if (Platform.OS === "ios") return(
        <TextInput
          placeholder={"Enter Location"}
          autoFocus
          selectionColor={Colors[colorScheme ?? 'light'].tint}
          keyboardType={"default"}
          value= {value}
          onSubmitEditing= {handleSubmitEditing}
          onChangeText= {handleChange} 
          style={styles.defaultMarginTop}
        />
        )
    return (
      <Row style={{ alignItems: "center"}}>
        <TextInput
          placeholder={"Enter Location"}
          autoFocus
          selectionColor={Colors[colorScheme ?? 'light'].tint}
          keyboardType={"default"}
          style={[styles.defaultMarginTop, {color: Colors[colorScheme ?? 'light'].tint, borderWidth:1, borderRadius: 10, paddingLeft: 10, height: 40, borderColor:"#ccc", width: "80%"}]}
          value= {value}
          onSubmitEditing= {handleSubmitEditing}
          onChangeText= {handleChange}
        />
        <TouchableOpacity style={[styles.button, { padding: 10 }]} onPress={navigation.goBack}>
            <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].tint}]}>Cancel</Text>
        </TouchableOpacity>
      </Row>
    );
  };

  const SuggestedText = ({locationItem}:{ locationItem: Location}) => {
    const location = getFormattedLocationText(locationItem);
    return(
      <Row style={[styles.suggestionContainer, {borderBottomColor: Colors[colorScheme ?? 'light'].gray}]} >
        <Text>{location}</Text>
      </Row>
    )
  };

  return (
    <Screen style={styles.container}>
      {Platform.OS === "ios" && <ModalHeader/> }
      <View style={styles.screenContent}>
        {getInput()}
        {suggestions.length > 0 ?
          <FlatList 
          data = {suggestions}
          keyExtractor={(item, index) => item.place_id + index}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} 
              onPress={()=> handleNavigate(item)}>
              <SuggestedText locationItem={item} />
            </TouchableOpacity>
          )}
          />
            
        : <ScrollView bounces={false} >
            <CurrentLocationBtn style={styles.currentLocationBtn} />
            <RecentSearchList style={styles.recentSearchContainer} recentSearches={recentSearches} />
        </ScrollView> }
      </View>
        
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{},
  defaultMarginTop: {
    marginTop: 10,
  },
  button:{
    borderRadius: 10,
    
    //width:"20%",
  },
  buttonText:{
    width: "100%",
    padding: 10,
    fontWeight:"bold",
    textAlign: 'center'
  },
  screenContent:{
    marginHorizontal:10
  },
  suggestionContainer:{
    alignItems:"center",
    padding: 15,
    borderBottomWidth: 1,
  },
  currentLocationBtn: {
    marginTop: 40,
  },
  recentSearchContainer: {
    marginTop: 30,
  },
});
