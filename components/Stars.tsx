import { StyleSheet, useColorScheme, ViewStyle } from 'react-native'
import React from 'react'
import { Row } from './Row';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export const Stars = ({
    score,
    style
}:{
    score: number;
    style?: ViewStyle | ViewStyle[]
}) => {
    const colorScheme = useColorScheme();
  return (
    <Row style={style}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        let decimalValue = score % 1;
        let compareScore = score | 0; // will truncate the decimals

        //should hit all of the stars that need to be filled
        if(score / item >= 1)
        return(
            <MaterialCommunityIcons
            key={item}
            name='star'
            size={24}
            color={Colors[colorScheme ?? 'light'].tint}
            />
        );
        else if(decimalValue > 0 && compareScore === index)
            if(decimalValue > 0.5)
            return(
                <MaterialCommunityIcons
                key={item}
                name='star-half-full'
                size={24}
                color={Colors[colorScheme ?? 'light'].tint}
                />
            )
        return(
            <MaterialCommunityIcons
            key={item}
            name='star-outline'
            size={24}
            color={Colors[colorScheme ?? 'light'].tint}
            />
        )
      })}
    </Row>
  )
}



const styles = StyleSheet.create({})