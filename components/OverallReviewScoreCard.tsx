import { StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native'
import React from 'react'
import { Row } from './Row';
import Colors from '@/constants/Colors';
import { Stars } from './Stars';


const getScoreText = (score: number) =>{
    if(score >= 4) return "Great";
    if(score < 4 && score >= 3) return "Good";
    if(score < 3 && score >= 2) return "Average";
    if(score < 2 && score >= 1) return "Below Average";
    if(score === 0) return `No Reviews Yet`;
    return `Bad`
}
const getRenterReviewText = (num: number) =>{
    if(num === 0) return "";
    if(num === 1) return `${num} Renter Review`;
    return `${num} Renters Review`
}

export const OverallReviewScoreCard = ({
    score,
    numberOfReviews,
    style
}:{
    score: number;
    numberOfReviews: number;
    style?: ViewStyle | ViewStyle[]
}) => {
    const colorScheme = useColorScheme();
  return (
    <View style={[styles.container, style]}>
        <Row style={[styles.row, {marginVertical: 5}]}>
            <Text style={[styles.scoreText, {color: Colors[colorScheme ?? 'light'].tint}]}>
                {getScoreText(score)}
            </Text>
            <Stars score={score} />
            
        </Row>
        <Row style={styles.row}>
            <Text style={styles.text}>
                {`${score} Blended Score`}
            </Text>
            <Text style={{fontSize: 26, fontWeight: "600"}}>
                {score}
            </Text>
        </Row>
        <Row style={[styles.row, {marginVertical: 5}]}>
            <Text >
                {getRenterReviewText(numberOfReviews)}
            </Text>
            {numberOfReviews === 0 ? null: <Text>Out of 5 </Text> }
        </Row>
    </View>
  )
}

 

const styles = StyleSheet.create({
    container:{
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        width: "100%",
    },
    row:{
        alignItems: "center",
    },
    scoreText:{
        fontSize: 18,
    },
    text:{
        fontSize: 18,
    },
})