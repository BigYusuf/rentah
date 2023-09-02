import { StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Property } from '../../types/property'
import { Text, View } from '../Themed'
import Colors from '@/constants/Colors'
import { callPhoneNumber } from '@/utils/callPhoneNumber'
import { Row } from '../Row'
import { openURL } from '@/utils/openUrl'
import AllButtons from '../AllButtons'

const ContactSection = ({property}: {property: Property}) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    
    const formatPhoneNumber= (phone: string) =>{
        let cleaned = ("" + phone).replace(/\D/g, "");
        let match = cleaned.match(/^(1|)?(\d{3})(\d{4})$/);
        if(match){
            //Remove the matched extension code
            //change this to format for any country code.
            let intlCode = match[1] ? "+1 " : "";
            return[intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return "Give Us A Call"
    }
    
  return (
    <>
        <Text style={[styles.defaultMarginVertical, styles.header]}>Contact</Text>
        <TouchableOpacity onPress={() => callPhoneNumber(property.phoneNumber)}>
           <View style={styles.row}>
            <MaterialIcons 
                name='smartphone'
                size={16}
                color={Colors[colorScheme ?? 'dark'].lightblue}
            />
            <Text style={ [styles.rowText, { color: Colors[colorScheme ?? 'dark'].lightblue}] }>
                {formatPhoneNumber(property.phoneNumber)}
            </Text>
           </View>  
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL(property.website)}>
           <View style={styles.row}>
            <MaterialCommunityIcons 
                name='web'
                size={16}
                color={Colors[colorScheme ?? 'dark'].lightblue}
            />
            <Text style={ [styles.rowText, { color: Colors[colorScheme ?? 'dark'].lightblue}] }>
                View Property Website
            </Text>
           </View>  
        </TouchableOpacity>
        <Row>
            <AllButtons 
                textStyle={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].tint}]}
                title='Tour'
                style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].white, borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                onPress={() =>  navigation.navigate('MessageScreen', 
                { property_id: property.id,
                    tour: true
                },
            )}
            />
            <AllButtons 
                textStyle={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].tint}]}
                title='Message'
                style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].white, borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                onPress={() =>  navigation.navigate('MessageScreen', 
                { property_id: property.id
                },
            )}
            />
        </Row>
    </>
  )
}

export default ContactSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    row:{
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 5,
    },
    rowText:{
        marginLeft: 10
    },
    button: {
      width: "45%",
      borderWidth: 1,
    },
    buttonText: {
      padding: 10,
      fontWeight: "bold",
      textAlign: 'center',
      width: "100%",
    },
})