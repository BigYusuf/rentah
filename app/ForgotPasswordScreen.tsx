import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useMutation } from 'react-query'

import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed'
import { Screen } from '../components/Screen'
import { ModalHeader } from '../components/ModalHeader'
import InputField from '../components/InputField'
import { forgotPassword } from '@/services/user'
import { Loading } from '@/components/Loading'

const ForgotPasswordScreen = () => {  
    const colorScheme = useColorScheme();
    const [emailSent, setEmailSent] = useState<boolean>(false)

    const nativeForgotPass = useMutation(
      async (values: { email: string; })=> {
          const data = await forgotPassword(values.email);
          if(data){
              setEmailSent(true);
          }
      } 
  );

  if(nativeForgotPass.isLoading) return <Loading />


  return (
    <KeyboardAwareScrollView bounces={false} >
      <Screen style={styles.container}>
        <ModalHeader text="Renta" xShown />
        {emailSent ? 
        <>
          <Text style={styles.header}>Email Sent!</Text>
          <Text style={styles.subHeader}>An email containing instructions about how to your password has been sent to you. Please check your junk mail or spam section if you do not see an email.  </Text>
        </>
        :
        <>
          <Text style={styles.header}>Forgot your password?  </Text>
          <Text style={styles.subHeader}>Please enter your email and we'll send you a link to change your password.  </Text>
          <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={yup.object().shape({
                email: yup.string().email().required("Your email is required"),
              })}
            onSubmit={(values) => {
              nativeForgotPass.mutate(values)
            }}>
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
                <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].deepColorTint }]} onPress={() => handleSubmit()}>
                  <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white}]}>Continue</Text>
                </TouchableOpacity>
              </>
              )
            }}
          </Formik>
        </>
        }
      </Screen>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPasswordScreen

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
    subHeader:{
        textAlign: "center",
        fontSize: 16,
        marginBottom: 30,
    },
    input:{
        marginVertical: 10,
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
})