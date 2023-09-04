import { FlatList, StyleSheet, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Property } from '@/types/property'
import AllButtons from '../AllButtons'
import Colors from '@/constants/Colors'
import { OverallReviewScoreCard } from '../OverallReviewScoreCard'
import {ReviewCard} from '../ReviewCard'


const ReviewSection = ({property}: {property: Property}) => {
    const colorScheme = useColorScheme();
    return (
    <>
    {property.reviews ? (
        <>
            <OverallReviewScoreCard 
                numberOfReviews={property.reviews ? property.reviews.length : 0}
                score={property.stars}
                style={styles.defaultMarginVertical}
            />
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatListMargin}
                data={property.reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => 
                    <ReviewCard review={item} />
                }
            />
        </>
    ): null}
        <Text style={[styles.defaultMarginVertical, styles.header]}>Reviews</Text>
        <   AllButtons 
                textStyle={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].white}]}
                title='Write a Review'
                style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                onPress={() => console.log("write a review")}
            />
    </>
  )
}

export default ReviewSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    button: {
      width: "100%",
      marginVertical: 10,
    },
    buttonText: {
      padding: 10,
      fontWeight: "bold",
      textAlign: 'center',
      width: "100%",
    },
    flatListMargin:{
        marginBottom: 50,
    },
})