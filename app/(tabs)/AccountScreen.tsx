import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import { Screen } from '../../components/Screen';
import { useAuth } from '../../hooks/useAuth';
import SignInAndSignUpBtn from '../../components/SignInAndSignUpBtn';
import ButtonList from '../../components/ButtonList';
import Colors from '../../constants/Colors';

export default function AccountScreen() {
  const {user, logout} = useAuth()
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const fistSignedOutButtons = [
    {label: "Add a Property", onPress: ()=> console.log("navigate to Add Property")},
    {label: "View My Property", onPress: ()=> console.log("navigate to View myProperty")},
  ];
  const supportButtons = [
    {label: "Help Center", onPress: ()=> console.log("navigate to Help Center")},
    {label: "Terms and Conditions", onPress: ()=> console.log("navigate to Terms and Conditions")},
  ]
  const rentingButtons = [
    {label: "Favorite Properties", onPress: ()=> navigation.navigate("SavedScreen")},
    {label: "Rental Applications", onPress: ()=> console.log("navigate to Rental Applications")},
    {label: "Rent Payments", onPress: ()=> console.log("navigate to Rent Payments")},
  ]
  const accountButtons = [
    {label: "Account Settings", onPress: ()=> console.log("navigate to Account Settings")},
    {label: "Billing History", onPress: ()=> console.log("navigate to Billing History")},
    {label: "Banks and Cards", onPress: ()=> console.log("navigate to Banks and Cards")},
  ]
  const rentalManagementButtons = [
    {label: "Add a Property", onPress: ()=> console.log("navigate to Add a Property")},
    {label: "Add Apartment Property", onPress: ()=> console.log("navigate to My Properties")},
    {label: "View My Properties", onPress: ()=> console.log("navigate to My Properties")},
  ]

  return (
    <Screen >
      <ScrollView style={styles.container}>
        <View style={{marginHorizontal: 10}}>
          {user ?
            <>
              <Text style={styles.userName}>
                Welcome, {user.first_name? `${user.first_name}`: ""}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
            </>
            :
            <>
              <Text style={styles.header}>
                Renting has never been easier
              </Text>
              <SignInAndSignUpBtn />
              <View style={styles.middleContainer}>
                <Text style={styles.subHeader}>
                  Are you a property owner or manager
                </Text>
                <Text style={styles.bodyText}>
                  Visit our website to access our full suite of rental management tools and start receiving applications in minutes
                </Text>
              </View>
            </>
          }
        </View>
        {user ?
        <>
          <ButtonList  data={rentingButtons} header={'Renting Made Easy'} />
          <ButtonList  data={accountButtons} header={'My Account'} />
          <ButtonList  data={rentalManagementButtons} header={'Rental Manager Tools'} />
          <ButtonList  data={supportButtons} header={'Support'} />
          <View style={[styles.specialMarginVertical, {marginHorizontal: 10}]}>
            <TouchableOpacity style={[styles.button, {borderColor: Colors[colorScheme ?? 'light'].deepColorTint}]} onPress={logout}>
              <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].deepColorTint}]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </>
        :
        <> 
          <ButtonList  data={fistSignedOutButtons} borderTop /> 
          <ButtonList  data={supportButtons} header={'Support'} marginTop />
          <Text style={[styles.brandText, { color: Colors[colorScheme ?? 'light'].deepColorTint}]}>
            bigyusuflateef.com Version 1.0.0
          </Text>
        </>
        }
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userName:{
    fontSize: 24,
    textAlign:"center",
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  email:{
    fontSize: 20,
    textAlign:"center",
    fontWeight: "500",
    marginBottom:20,
  },
  header:{
    fontSize: 24,
    textAlign:"center",
    fontWeight: "600",
    marginVertical: 25,
    marginHorizontal: 70,
  },
  middleContainer:{
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    paddingTop: 30,
    paddingBottom: 50,
    borderTopColor: '#ccc'
  },
  subHeader:{
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  bodyText:{
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 15,
    marginTop: 10,
  },
  specialMarginVertical:{
    marginTop: 30,
    marginBottom: 20,
  },
  button:{
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
  buttonText:{
    width: "100%",
    padding: 10,
    fontWeight:"bold",
    textAlign: 'center'
  },
  brandText:{
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    color: "#ccc"
  },
});
