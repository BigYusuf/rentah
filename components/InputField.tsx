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
    multiline,
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
    multiline?: boolean;
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
                <Text style={{ color:Colors[colorScheme ?? 'light'].text }}>{label}</Text>
                <View style={styles.inputField}>
                    <TextInput
                        keyboardType={keyboardType}  
                        placeholder={placeholder}
                        placeholderTextColor={ Colors[colorScheme ?? 'light'].gray }
                        style={[style, styles.input, { height:multiline ? 120 : 50, color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].gray}]}
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
      if (inputType=== "Email")
        return (
            <View style={styles.container}>
                <Text style={{ color:Colors[colorScheme ?? 'light'].text }}>{label}</Text>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={ Colors[colorScheme ?? 'light'].gray }
                        keyboardType={keyboardType}
                        style={[style, styles.input, { height:multiline ? 120 : 50, color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].gray }]}
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
  return (
    <View style={styles.container}>
        <Text style={{ color:Colors[colorScheme ?? 'light'].text }}>{label}</Text>
        <View style={styles.inputField}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={ Colors[colorScheme ?? 'light'].gray }
                keyboardType={keyboardType}
                style={[style, styles.input, { height:multiline ? 120 : 50, color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].gray }]}
                value= {value}
                multiline={multiline}
                onBlur={onBlur}
                autoComplete='name'
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
    input:{
        borderWidth: 1, 
        borderRadius: 10, 
        paddingLeft: 10,
        width: "100%",
    },
    error:{
        color: "red",
        marginTop: 4,
    },
})

