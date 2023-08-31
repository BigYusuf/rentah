import {  Pressable, StyleSheet, ViewStyle } from 'react-native';
import { View } from './Themed';
import { Property } from '../types/property';
import { ImageCarousel } from './ImageCarousel';
import { CardInfo } from './CardInfo';
import { LISTMARGIN } from '../constants/Sizes';

export const Card = ({
    property, 
    style,
    onPress,
}: {
    property: Property;
    style?: ViewStyle;
    onPress?: () => void;
}) => {

    return(
        <Pressable key={property.id} onPress={onPress} style={[styles.container, style]}>
            <ImageCarousel chevronShown={true} onImagePress={onPress} images={property.images}/>           
            <CardInfo property={property}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
  }
})