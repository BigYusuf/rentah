import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed'
import { Screen } from '../components/Screen'
import { ModalHeader } from '../components/ModalHeader'
import InputField from '../components/InputField'
import OrDivider from '../components/OrDivider'
import { AppleButton, FacebookButton, GoogleButton } from '../components/LogoButton'

const SignInScreen = () => {  
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
            <Text style={styles.header}>Sign In </Text>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={yup.object().shape({
                    email: yup.string().email().required("Your email is required"),
                    password: yup.string().required("Your password is required"),
                })}
                onSubmit={(values) => {
                    console.log("login passing values to server", values)
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
                                label={"Email"}
                                inputType={"Email"}
                                style={styles.input}
                                value={values.email}
                                icon={false}
                                onChangeText={handleChange("email")}
                                placeholder="Enter Email Address"
                                keyboardType= "email-address"
                                onBlur={() => setFieldTouched("email")}
                                error={touched.email && errors.email ? errors.email : undefined}
                            />
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
                         
                            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate("ForgotPasswordScreen")} >
                                <Text  style={[styles.text, {color: Colors[colorScheme ?? 'light'].lightblue}]}>Forgot password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].deepColorTint }]} onPress={() => handleSubmit()}>
                                <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white}]}>Sign In</Text>
                            </TouchableOpacity>

                            <OrDivider style={styles.orContainer}/>

                            <GoogleButton 
                                text='Continue with Google'
                                onPress={()=> console.log("google sign in")}
                                style={styles.signinButtons}
                            />
                            <FacebookButton 
                                text='Continue with Facebook'
                                onPress={()=> console.log("facebook sign in")}
                                style={styles.signinButtons}
                            />
                            <AppleButton 
                                type='sign-in'
                                onPress={()=> console.log("apple sign in")}
                            />
                        </>
                    )
                }}
            </Formik>
        </Screen>

    </KeyboardAwareScrollView>
  )
}

export default SignInScreen

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
    forgotPasswordContainer:{
        alignItems: "flex-end",
        marginTop: 1,
        marginBottom: 25
    },
    text:{
        fontSize: 16,
        fontWeight:"bold",
    },
    button:{
      borderRadius: 10,
      padding: 10,
    },
    buttonText:{
      width: "100%",
      padding: 10,
      fontWeight:"bold",
      textAlign: 'center'
    },
    orContainer:{
        marginVertical: 30,
    },
    signinButtons:{
        marginBottom: 10,
    },
})