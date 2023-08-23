import {  StyleSheet, ViewStyle } from 'react-native';
import { View } from './Themed';
import { Property } from '../types/property';
import { ImageCarousel } from './ImageCarousel';
import { CardInfo } from './CardInfo';
import { LISTMARGIN } from '../constants/Sizes';

export const Card = (
    {property, style}:
    {property: Property, style?: ViewStyle}) => {

    return(
        <>
         <View key={property.id} style={[styles.container, style]}>
            <ImageCarousel images={property.images}/>           
            <CardInfo property={property}/>
          </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
  },
    cardInfo:{ 
        paddingVertical: 10, 
        paddingHorizontal: 5, 
        borderColor:"#d3d3d3", 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        borderWidth: 1
    },
    rent:{
        fontSize: 24,
        fontWeight: "500"
    },
    others:{
        fontSize: 16,
        fontWeight: "400"
    },
    tags:{
        fontSize: 12,
        marginTop: 5
    },
    button:{
        width:"49%",
    },
    buttonText:{
        width: "100%",
        padding: 10,
        fontWeight:"bold",
        textAlign: 'center'
    }
})