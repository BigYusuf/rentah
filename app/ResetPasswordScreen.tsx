import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text } from '../components/Themed'
import { Screen } from '../components/Screen'
import { ModalHeader } from '../components/ModalHeader'
import InputField from '../components/InputField'

const ResetPasswordScreen = () => {  
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true)

    const handlePasswordVisibility = () =>{
        setPasswordHidden(!passwordHidden)
    }

  return (
    <KeyboardAwareScrollView bounces={false} >
        <Screen style={styles.container}>
            <ModalHeader text="Renta" xShown />
            <Text style={styles.header}>Reset Password </Text>
            <Formik
              initialValues={{
                  password: "",
                  confirmPassword: "",
              }}
              validationSchema={yup.object().shape({
                password: yup
                  .string()
                  .required("Your password is required")
                  .matches(
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                    "Your password must have 8 characters, 1 upperCase, 1 lowerCase letter, 1 Number and 1 special character"),
                confirmPassword: yup
                  .string()
                  .oneOf([yup.ref("password")], "Passwords don't match")
                  .required("Required")
              })}
              onSubmit={(values) => {
                console.log("password reset", values)
                navigation.navigate("SignInScreen")
              }}
          >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldTouched,
              }) => {
              return(
                <>
                  <InputField 
                      label={"Password"}
                      inputType={"Password"}
                      style={styles.input}
                      value={values.password}
                      icon={true}
                      onChangeText={handleChange("password")}
                      placeholder="Password"
                      onBlur={() => setFieldTouched("password")}
                      passwordHidden={passwordHidden}
                      PasswordFunction={handlePasswordVisibility}
                      error={touched.password && errors.password ? errors.password : undefined}
                  />
                  <InputField 
                      label={"Confirm Password"}
                      inputType={"Password"}
                      style={styles.input}
                      value={values.confirmPassword}
                      icon={true}
                      onChangeText={handleChange("confirmPassword")}
                      placeholder="Type Password again"
                      onBlur={() => setFieldTouched("confirmPassword")}
                      passwordHidden={passwordHidden}
                      PasswordFunction={handlePasswordVisibility}
                      error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  />
                
                  <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].deepColorTint }]} onPress={() => handleSubmit()}>
                      <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white}]}>Reset Password</Text>
                  </TouchableOpacity>

                </>
              )
            }}
            </Formik>
        </Screen>

    </KeyboardAwareScrollView>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    header:{
        textAlign: "center",
        marginVertical: 20,
        fontSize: 24,
        fontWeight: "bold"
    },
    input:{
        marginTop: 15,
    },
    button:{
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    buttonText:{
      width: "100%",
      padding: 10,
      fontWeight:"bold",
      textAlign: 'center'
    },
})