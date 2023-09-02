import { Image, Platform, StyleSheet, useColorScheme, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import * as yup from 'yup'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';

import { properties } from '@/assets/data/properties';
import { useAuth } from '@/hooks/useAuth';
import { Screen } from '@/components/Screen';
import { ModalHeader } from '@/components/ModalHeader';
import { Text, View } from '@/components/Themed';
import { getStateAbbreviation } from '@/utils/getStateAbbreviation';
import InputField from '@/components/InputField';
import AllButtons from '@/components/AllButtons';
import Colors from '@/constants/Colors';

type MessageScreenParams = {
    key: string,
    name: string,
    path: string,
    params:{
      property_id: number;//change to string when database is introduced
      tour?: boolean;//change to string when database is introduced
    }
  }

const MessageScreen = () => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const route = useRoute<MessageScreenParams>();
    const {tour, property_id} = route.params;
    const index = properties.findIndex((i) => i.id === property_id)
    const property = properties[index]
    const [pickedDate, setPickedDate] = useState<Date>(new Date())
    const [showCalendar, setShowCalendar] = useState<boolean>(false)
    const {user} = useAuth()
    
    return (
    <KeyboardAwareScrollView bounces={false} >
      <Screen style={styles.container}>
        {Platform.OS ==="ios" ? <ModalHeader /> : null}
        <View style={styles.row}>
            <Image style={styles.image} source={{uri: property.images[0]}} />
            <View style={styles.address}>
                <Text style={styles.name}>{property.name}</Text>
                <Text style={styles.others}>
                 {property.street}, {property.city}, {" "}
                 {getStateAbbreviation(property.state)} {property.zip}
                </Text>
                <Text style={styles.others}>
                 ${property.rentLow.toLocaleString()} - {" "}
                 {property.rentHigh.toLocaleString()} | {property.bedroomLow} - {" "}
                {property.bedroomHigh} Beds
                </Text>
            </View>
        </View> 
        <Formik
        initialValues={{
            first_name: user ? user.first_name : "",
            last_name: user ? user.last_name : "",
            phone_number: "",
            email: user ? user.email : "",
            message: tour? "I would like to schedule a tour." : "",
        }}
        validationSchema={yup.object().shape({
            first_name: yup.string().required("Required"),
            last_name: yup.string().required("Required"),
            phone_number: yup.string(),
            email: yup.string().email().required("Your email is required"),
            message: yup.string().required("Required"),
        })}
        onSubmit={(values) => {
           console.log(values)
           navigation.goBack();
        }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldTouched,
                setFieldValue,
            }) => {
                return(
                    <>
                    <InputField 
                        label={"First Name*"}
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
                        label={"Last Name*"}
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
                            label={"Email*"}
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
                            label={"Phone Number"}
                            inputType={"Phone"}
                            style={styles.input}
                            value={values.phone_number}
                            icon={false}
                            onChangeText={handleChange("phone_number")}
                            placeholder="Your Last Name"
                            keyboardType= "number-pad"
                            onBlur={() => setFieldTouched("phone_number")}
                            error={touched.phone_number && errors.phone_number ? errors.phone_number : undefined}
                        />
                        
                        <View style={[styles.input, {backgroundColor: "transparent"}]}>
                            <Text style={[styles.moveInLabel, { color: Colors[colorScheme ?? 'light'].text}]}>
                                Move-In Date
                            </Text>
                            <Pressable style={styles.pickedDate} onPress={() => setShowCalendar(true)}>
                            <Text style={[styles.pickedDateText, { color: Colors[colorScheme ?? 'light'].text}]}>
                                {pickedDate?.toDateString()}
                            </Text>
                            </Pressable>
                        </View>
                        
                        {showCalendar && 
                        <DateTimePicker
                            value={pickedDate}
                            mode='date'
                            onChange={(event: any, selectedDate?: Date) => {
                                if (selectedDate){
                                    setShowCalendar(false);
                                    setPickedDate(selectedDate)
                                }
                            }}
                        />
                        }
                        <InputField 
                            label={"Message*"}
                            inputType={"Message"}
                            style={styles.input}
                            value={values.message}
                            icon={false}
                            multiline={true}
                            onChangeText={handleChange("message")}
                            placeholder="Input your message here"
                            keyboardType= "default"
                            onBlur={() => setFieldTouched("message")}
                            error={touched.message && errors.message ? errors.message : undefined}
                        />

                        <AllButtons
                         title='Submit'
                         onPress={() => handleSubmit()}
                         textStyle={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white}]}
                         style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].deepColorTint }]}
                        />

                    </>
                )
            }}

        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        backgroundColor: "transparent",
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20
    },
    image:{
        height: 50,
        width: 70,
    },
    address:{
        marginLeft: 10
    },
    name:{
        fontSize: 24,
        fontWeight: "500"
    },
    others:{},
    
    input:{
        marginTop: 10,
    },
    moveInLabel:{
        paddingVertical: 5
    },
    pickedDate:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        height: 50, 
        paddingLeft: 10,
        width: "100%",
    },
    pickedDateText:{
        marginTop: 13,
    },
    button:{
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
      },
      buttonText:{
        width: "100%",
        padding: 10,
        fontWeight:"bold",
        textAlign: 'center'
      },
})