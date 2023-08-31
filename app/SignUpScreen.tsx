import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useMutation } from 'react-query'
import { useNavigation } from '@react-navigation/native';
import * as Facebook from 'expo-auth-session/providers/facebook';


import Colors from '../constants/Colors';
import { Text } from '../components/Themed'
import { Screen } from '../components/Screen'
import { ModalHeader } from '../components/ModalHeader'
import InputField from '../components/InputField'
import OrDivider from '../components/OrDivider'
import { AppleButton, FacebookButton, GoogleButton } from '../components/LogoButton'
import { useAuth } from '../hooks/useAuth'
import { registerUser } from '../services/user'
import { Loading } from '../components/Loading'

const SignUpScreen = () => {  
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true)
    const {login} = useAuth();

    const handlePasswordVisibility = () =>{
        setPasswordHidden(!passwordHidden)
    }

    const [_, __, fbPromptAsync] = Facebook.useAuthRequest({
        clientId: "1432198667560061",
      //  redirectUri: "https://auth.expo.io/@bigyusufff/renta",
       // scopes:['email']
    })

    const facebookRegister = useMutation(
        async () => {
            const response = await fbPromptAsync();
            console.log("fb",response)
            if(response.type === "success"){
                const {access_token} = response.params;
                console.log(response.params)
            }
        }
    )

    const nativeRegister = useMutation(
        async (values: { first_name: string; last_name: string,  email: string; password: string })=> {
            const user = await registerUser(values.first_name, values.last_name, values.email, values.password);
           
            if(user){
                login(user);
                navigation.goBack();
            }
        } 
    );

    if(nativeRegister.isLoading) return <Loading />

  return (
    <KeyboardAwareScrollView bounces={false} >
        <Screen style={styles.container}>
            <ModalHeader text="Renta" xShown />
            <Text style={styles.header}>Sign Up </Text>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                }}
                validationSchema={yup.object().shape({
                    first_name: yup.string().required("First name is required"),
                    last_name: yup.string().required("Last name  is required"),
                    email: yup.string().email().required("Your email is required"),
                    password: yup
                      .string()
                      .required("Your password is required")
                      .matches(
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                        "Your password must have 8 characters, 1 upperCase, 1 lowerCase letter, 1 Number and 1 special character"),
                })}
                onSubmit={(values) => {
                    nativeRegister.mutate(values)
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
                                value={values.first_name}
                                icon={false}
                                onChangeText={handleChange("first_name")}
                                placeholder="Your First Name"
                                keyboardType= "default"
                                onBlur={() => setFieldTouched("first_name")}
                                error={touched.first_name && errors.first_name ? errors.first_name : undefined}
                            />
                            <InputField 
                                label={"Last Name"}
                                inputType={"Name"}
                                style={styles.input}
                                value={values.last_name}
                                icon={false}
                                onChangeText={handleChange("last_name")}
                                placeholder="Your Last Name"
                                keyboardType= "default"
                                onBlur={() => setFieldTouched("last_name")}
                                error={touched.last_name && errors.last_name ? errors.last_name : undefined}
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
                                onPress={()=> facebookRegister.mutate()}
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