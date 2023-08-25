import { StyleSheet, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';

const SignInAndSignUpBtn = ({style}:{style?: ViewStyle}) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

  return (
    <View style={style}>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")} 
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].deepColorTint, borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderTopRightRadius: 5, borderBottomRightRadius: 5}]}>
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white,}]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")} 
            style={[styles.button, {marginVertical:10, backgroundColor: "transparent", borderColor: Colors[colorScheme ?? 'light'].deepColorTint, borderTopRightRadius: 5, borderBottomRightRadius: 5}]}>
            <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].deepColorTint,}]}>Create Account</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SignInAndSignUpBtn

const styles = StyleSheet.create({
    button: {
      width: "100%",
      borderRadius: 0,
      borderWidth: 1,
    },
    buttonText: {
      padding: 10,
      fontWeight: "bold",
      textAlign: 'center',
      width: "100%",
    },
})