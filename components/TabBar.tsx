import { StyleSheet, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { Row } from './Row';
import Colors from '@/constants/Colors';
import { Text } from './Themed';

const TabBar = ({
    tabs, 
    style
}:{
    tabs: {
        title: string;
        onPress: () => any
    };
    style?: ViewStyle | ViewStyle[];
 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const colorScheme = useColorScheme();

    const handlePress = (index: number, func: ()=> void) => {
        setActiveIndex(index)
        func();
    }

  return (
    <Row style={style}>
        {tabs.map((item, index) => (
            <TouchableOpacity 
                onPress={() => handlePress(index, item.onPress)}
                style={[styles.marginRight, {
                    borderTopColor: activeIndex === index ? Colors[colorScheme ?? 'light'].deepColorTint : "",
                    borderTopWidth: activeIndex === index ? 3 : 0,
                    paddingTop: activeIndex === index ? 0 : 3 }]}
                key={item.title}
                >
                <Text style={[styles.text, {
                    color: activeIndex === index ? Colors[colorScheme ?? 'light'].deepColorTint : "#ccc",
                   }]}>
                    {item.title}
                   </Text>
            </TouchableOpacity>
        ))}
    </Row>
  )
}

export default TabBar

const styles = StyleSheet.create({
    marginRight:{
        marginRight: 15,
    },
    text:{
        fontSize: 14,
    },
})