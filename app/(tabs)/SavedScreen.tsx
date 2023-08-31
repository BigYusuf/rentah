import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import { Screen } from '../../components/Screen';
import { Row } from '../../components/Row';
import Colors from '../../constants/Colors';
import { useState } from 'react';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import SignInAndSignUpBtn from '../../components/SignInAndSignUpBtn';
import { properties } from '../../assets/data/properties';
import { Card } from '../../components/Card';
import { Property } from '../../types/property';
import { useAuth } from '../../hooks/useAuth';

export default function SavedScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  
  const {user} = useAuth()
  const likedProperties = properties // will removed this ehen integrated with backend
  const contactedProperties = properties // will removed this ehen integrated with backend
  const applicationProperties = undefined // will removed this ehen integrated with backend

  const activeButton = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return Colors[colorScheme ?? 'light'].deepColorTint
    return "transparent"
  }
  const activeText = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return Colors[colorScheme ?? 'light'].white
    return Colors[colorScheme ?? 'light'].deepColorTint
  }
  const handleActiveButton = (index: number) => {
    setActiveIndex(index)
  }

  const getBodyText = (heading: string, subHeading: string) => {
    return( 
      <View style={styles.textContainer}>
        <Text style={[styles.text, {color: Colors[colorScheme ?? 'light'].tint}]}>{heading}</Text>
        <Text style={styles.subText}>{subHeading}</Text>
      </View>
    )
  }
  const getPropertiesFlatList = (properties: Property[]) => {
    return(
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={properties}
        style={{marginTop: 10}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => 
          <Card 
          onPress={()=> navigation.navigate('PropertyDetailsScreen', {property_id: item.id})}
          style={styles.card}
          property={item}
          />
        }  
      />
    )
  }
  const getBody = () => {
    if (activeIndex === 0) {
      if (likedProperties) return getPropertiesFlatList(likedProperties);
      return (
        <>
            <LottieView 
              autoPlay
              style={styles.lottie}
              source={require("../../assets/lottiesAnimation/favorite.json")}
            />
            {getBodyText(
              "Yo do not have any favourite saved",
              "Tap the heart icon on rentals to add favorites",
            )}
            {!user && <SignInAndSignUpBtn style={styles.signInAndSignUpContainer} />}
          </>
      );
    }
      if (activeIndex === 1) {
        if (contactedProperties) return getPropertiesFlatList(contactedProperties);

        return (
            <>
              <AnimatedLottieView 
                autoPlay
                style={styles.lottie}
                source={require("../../assets/lottiesAnimation/nodata.json")}
              />
              {getBodyText(
                "You have not contacted any properties yet",
                "Your contacted proprties will show here",
              )}
              {!user && <SignInAndSignUpBtn style={styles.signInAndSignUpContainer} />}
            </>
        );
      }
      if(applicationProperties)
      return getPropertiesFlatList(applicationProperties);
     return (
      <>
        <AnimatedLottieView 
          autoPlay
          style={styles.lottie}
          source={require("../../assets/lottiesAnimation/application.json")}
        />
        {getBodyText(
          "Check the status of your rental application here",
          "Any properties that you have applied to will show up here",
        )}
        {!user && <SignInAndSignUpBtn style={styles.signInAndSignUpContainer} />}
      </>
  );

  }

  return (
    <Screen style={styles.container}>
      <Row style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleActiveButton(0)} style={[styles.button, { backgroundColor: activeButton(0), borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}>
          <Text style={[styles.buttonText, { color: activeText(0)}]}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleActiveButton(1)} style={[styles.button, { backgroundColor: activeButton(1), borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderLeftWidth: 0, borderRightWidth: 0}]}>
          <Text style={[styles.buttonText, { color: activeText(1)}]}>Contacted</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleActiveButton(2)} style={[styles.button, { backgroundColor: activeButton(2), borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderTopRightRadius: 5, borderBottomRightRadius: 5}]}>
          <Text style={[styles.buttonText, { color: activeText(2)}]}>Applications</Text>
        </TouchableOpacity>
      </Row>
      <View style={styles.body}>{getBody()}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    width: "33.2%",
    borderRadius: 0,
    borderWidth: 1,
  },
  buttonText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: 'center',
    width: "100%",
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    marginBottom: 20,
    height: 180,
    width: 180,
    alignSelf: "center",
  },
  textContainer: {
    marginVertical: 15,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "bold",
  },
  subText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#ccc'
  },
  signInAndSignUpContainer: {
    marginTop: 15,
  },
  card:{
    marginHorizontal: 0,
    marginVertical: 5,
  },
});
