import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { Text, View } from './Themed';

const ButtonList = ({
    data,
    header,
    style,
    borderTop,
    marginTop,
}:{
    data: {label: string; onPress: ()=> void}[];
    header?: string;
    style?: ViewStyle | ViewStyle[];
    borderTop?: boolean;
    marginTop?: boolean;
}) => {

    const getListHeaderComponent = () => {
        if(header) return null;
        return (
            <View style={[styles.headerContainer, { marginTop: marginTop ? 35 : 0}]}>
                <Text style={styles.headerText}>{header}</Text>
            </View>
        )
    }
  return (
    <View style={[styles.container, style, {borderTopWidth: borderTop ? 1 : 0}]}>
      {getListHeaderComponent()}
      {data.map((item, index) => (
        <Pressable key={index} onPress={item.onPress}
            style={({pressed}) => {
                let arr: any[] = [styles.option,{backgroundColor: pressed ? "#ccc": "#f2f2f2"}]
                if(index !== data.length - 1) arr.push(styles.container)
                return arr;
            }}
        >
            <Text>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default ButtonList

const styles = StyleSheet.create({
    container:{
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    headerContainer:{
        paddingVertical: 12,
        borderBottomWidth: 1,
        backgroundColor: "#f1f7e5",
        borderBottomColor: "#ccc",
    },
    headerText:{
        fontWeight: "600",
        marginLeft: 18,
    },
    option:{
        paddingVertical: 12,
        paddingHorizontal: 18,
    }
})