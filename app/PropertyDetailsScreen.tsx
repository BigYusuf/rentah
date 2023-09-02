import { FlatList, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

import { Screen } from '../components/Screen';
import { properties } from '../assets/data/properties';
import { Text, View } from '../components/Themed';
import { ImageCarousel } from '../components/ImageCarousel';
import PropertyHeaderSection from '../components/propertyDetailsSection/PropertyHeaderSection';
import OrDivider from '@/components/OrDivider';
import PricingAndFloorPlanSection from '@/components/propertyDetailsSection/PricingAndFloorPlanSection';
import AboutSection from '@/components/propertyDetailsSection/AboutSection';
import ContactSection from '@/components/propertyDetailsSection/ContactSection';
import AmenitiesSection from '@/components/propertyDetailsSection/AmenitiesSection';
import LeaseAndFeesSection from '@/components/propertyDetailsSection/LeaseAndFeesSection';
import LocationSection from '@/components/propertyDetailsSection/LocationSection';

type PropertyDetailScreenParams = {
    key: string,
    name: string,
    path: string,
    params:{
      property_id: number;//change to string when database is introduced
    }
  }
const PropertyDetailScreen = () => {
    const route = useRoute<PropertyDetailScreenParams>();
    const index = properties.findIndex((i) => i.id === route.params.property_id)
    const property = properties[index]
  return (
    <Screen>
      <FlatList 
       data={[property]}
       keyExtractor={( item )=> item.id.toString()}
       renderItem={({item})=>
       <>
        {item.images ? < ImageCarousel imageStyle={styles.image} indexShown={true} images={item.images} /> : null}
        <View style={styles.contentContainer}>
          <PropertyHeaderSection property={item}/>
          <OrDivider style={styles.divider}/>
          <PricingAndFloorPlanSection property={item} />
          <OrDivider style={styles.divider}/>
          <AboutSection property={item} />
          <OrDivider style={styles.divider}/>
          <ContactSection property={item} />
          <OrDivider style={styles.divider}/>
          <AmenitiesSection property={item} />
          <OrDivider style={styles.divider}/>
          <LeaseAndFeesSection property={item} />
          <OrDivider style={styles.divider}/>
          <LocationSection property={item} />
          <OrDivider style={styles.divider}/>
        </View> 
       </>
       }
       />
    </Screen>
  )
}

export default PropertyDetailScreen

const styles = StyleSheet.create({
  image:{
    width: Dimensions.get("window").width,
    height: 250,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  contentContainer:{},
  divider:{
    marginVertical: 15,
  },
})