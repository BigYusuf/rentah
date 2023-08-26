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
import OrDivider from '../components/OrDivider'
import { AppleButton, FacebookButton, GoogleButton } from '../components/LogoButton'

const SignUpScreen = () => {  
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
            <Text style={styles.header}>Sign Up </Text>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                }}
                validationSchema={yup.object().shape({
                    firstName: yup.string().required("First name is required"),
                    lastName: yup.string().required("Last name  is required"),
                    email: yup.string().email().required("Your email is required"),
                    password: yup
                      .string()
                      .required("Your password is required")
                      .matches(
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                        "Your password must have 8 characters, 1 upperCase, 1 lowerCase letter, 1 Number and 1 special character"),
                })}
                onSubmit={(values) => {
                    console.log("resgister new user", values)
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
                                label={"First Name"}
                                inputType={"Name"}
                                style={styles.input}
                                value={values.firstName}
                                icon={false}
                                onChangeText={handleChange("firstName")}
                                placeholder="Your First Name"
                                keyboardType= "default"
                                onBlur={() => setFieldTouched("firstName")}
                                error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                            />
                            <InputField 
                                label={"Last Name"}
                                inputType={"Name"}
                                style={styles.input}
                                value={values.lastName}
                                icon={false}
                                onChangeText={handleChange("lastName")}
                                placeholder="Your Last Name"
                                keyboardType= "default"
                                onBlur={() => setFieldTouched("lastName")}
                                error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                            />
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
                            
                            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate("SignInScreen")} >
                                <Text  style={[styles.text, {color: Colors[colorScheme ?? 'light'].lightblue}]}>Already have account, Sign in</Text>
                            </TouchableOpacity>
                         
                            <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].deepColorTint }]} onPress={() => handleSubmit()}>
                                <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white}]}>Sign Up</Text>
                            </TouchableOpacity>

                            <OrDivider style={styles.orContainer}/>

                            <GoogleButton 
                                text='Sign up with Google'
                                onPress={()=> console.log("google sign up")}
                                style={styles.signupButtons}
                            />
                            <FacebookButton 
                                text='Sign up with Facebook'
                                onPress={()=> console.log("facebook sign up")}
                                style={styles.signupButtons}
                            />
                            <AppleButton 
                                type='sign-up'
                                onPress={()=> console.log("apple sign up")}
                            />
                        </>
                    )
                }}
            </Formik>
        </Screen>

    </KeyboardAwareScrollView>
  )
}

export default SignUpScreen

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
    signupButtons:{
        marginBottom: 10,
    },
})