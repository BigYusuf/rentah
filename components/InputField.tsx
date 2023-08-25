import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View, Text,StyleSheet,useColorScheme, TouchableOpacity, TextInput, TextStyle} from 'react-native';

import Colors from '../constants/Colors';

export default function InputField({
    label,
    value,
    error,
    passwordHidden,
    icon,
    placeholder,
    style,
    inputType,
    onBlur,
    keyboardType,
    PasswordFunction,
    onChangeText,
}:{
    label: string;
    value: string;
    error?: string;
    passwordHidden?: boolean;
    icon: boolean;
    placeholder: string;
    style?: TextStyle;
    inputType: string;
    onBlur?: () => void
    keyboardType?: any;
    PasswordFunction?: () => void;
    onChangeText: (text: string) => void;
}) {
    const colorScheme = useColorScheme();
    const getEyeIcon = () => {
        if(passwordHidden)
            return(
                <MaterialCommunityIcons size={24} name='eye-off-outline' color={'black'} />
            )
        return(
            <MaterialCommunityIcons size={24} name='eye-outline' color={'black'} />
        )
      }
      if(inputType === "Password")
        return(
            <View style={styles.container}>
                    <Text >{label}</Text>
                <View style={styles.inputField}>
                    <TextInput
                        keyboardType={keyboardType}  
                        style={[style, { borderWidth:1, borderRadius: 10, height: 50, paddingLeft: 10, borderColor:"#ccc", width: "100%"}]}
                       // style={[style, {flex: 1, paddingVertical: 0}]}
                        placeholder={placeholder}
                        autoComplete='password'
                        autoCapitalize='none'
                        secureTextEntry={passwordHidden}
                        textContentType='password'
                        value= {value}
                        onBlur={onBlur}
                        onChangeText ={onChangeText}
                    />
                    {icon && 
                        <TouchableOpacity style={styles.eyeContainer} onPress={PasswordFunction}>
                            {getEyeIcon()}
                        </TouchableOpacity>
                        }
                </View>
            {error && <Text style={styles.error}>{error}</Text>}
            </View>
        )
  return (
    <View style={styles.container}>
        <View style={styles.inputField}>
            <Text>{label}</Text>
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                //style={[style, {flex: 1, paddingVertical: 0, marginHorizontal:10}]}
                style={[style, { borderWidth:1, borderRadius: 10, height: 50, paddingLeft: 10, borderColor:"#ccc", width: "100%"}]}
                value= {value}
                onBlur={onBlur}
                autoComplete={"email"}
                autoCapitalize="none"
                onChangeText ={onChangeText}
            />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 2,
    },
    eyeContainer:{
        paddingHorizontal: 10,
        position: "absolute",
        right: 10,
        top: 20,
    },
    inputField:{
        position: "relative",
        paddingBottom: 8,
    },
    error:{
        color: "red",
        marginTop: 4,
    },
})

