import { Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Property } from '../../types/property'
import { Text, View } from '../Themed';
import TabBar from '../TabBar';
import { Row } from '../Row';
import OrDivider from '../OrDivider';

const removeUnnecessaryButtons = (
    array: {
        title: string;
        onPress: () => void;
    }[],
    title: "Studio" | "1 Bedroom" | "2 Bedroom" | "3+ Bedroom"
) => {
    array.splice(
        array.findIndex((i) => i.title === title)
    )
    
}

const PricingAndFloorPlanSection = ({property}: {property: Property}) => {
    const colorScheme = useColorScheme();
    const [currentApartment, setcurrentApartment] = useState(property.apartments);
    useEffect(() => {
      if(property.apartments !== currentApartment){
        setcurrentApartment(property.apartments)
      }
    }, [property])
    
    const filterByBedroom = (
        numOfBedrooms: number,
        equalityType: "gt" | "eq"
    ) => {
        if(property.apartments){
            let filtered;
            if(equalityType === "eq") {filtered = property.apartments.filter((i) => i.bedrooms === numOfBedrooms)
            }else {filtered = property.apartments.filter((i) => i.bedrooms > numOfBedrooms)}
        setcurrentApartment(filtered)
        }
    }
    const floorPlanOptions =[
        {title: "All", onPress: ()=> setcurrentApartment(property.apartments)},
        {title: "Studio", onPress: ()=> filterByBedroom(0, "eq")},
        {title: "1 Bedroom", onPress: ()=> filterByBedroom(1, "eq")},
        {title: "2 Bedroom", onPress: ()=> filterByBedroom(2, "eq")},
        {title: "3+ Bedroom", onPress: ()=> filterByBedroom(3, "eq")},
    ]

    let containedStudio, contained1Bed, contained2Bed, contained3Plus = false;

    if(property.apartments && property.apartments.length > 0){
        for (let i in property.apartments){
            if(property.apartments[i].bedrooms === 0) containedStudio = true
            if(property.apartments[i].bedrooms === 1) contained1Bed = true
            if(property.apartments[i].bedrooms === 2) contained2Bed = true
            if(property.apartments[i].bedrooms >= 3) contained3Plus = true
        }
        if(!containedStudio) removeUnnecessaryButtons(floorPlanOptions, "Studio")
        if(!contained1Bed) removeUnnecessaryButtons(floorPlanOptions, "1 Bedroom")
        if(!contained2Bed) removeUnnecessaryButtons(floorPlanOptions, "2 Bedroom")
        if(!contained3Plus) removeUnnecessaryButtons(floorPlanOptions, "3+ Bedroom")
    }

     return ( 
    <>
        <Text style={[styles.defaultMarginVertical, styles.header]}>Pricing & Floor Plans</Text>
        {currentApartment && currentApartment.length > 0 ? (
            <>
            <TabBar tabs={floorPlanOptions} style={styles.defaultMarginVertical} />
            {currentApartment.map((i)=>(
            <View key={i.id.toString()} style={[styles.container, styles.defaultMarginVertical]} >
                <Row>
                    <View style={styles.apartmentLogisticsContainer}>
                        <Text style={styles.apartmentLogisticsTitle}>
                            {i.bedrooms === 0 ? "Studio" : i.bedrooms + " Bed"}{" "}
                            {i.bathrooms} Bath
                        </Text>
                        <Text style={styles.apartmentLogisticsMargin}>
                            ${i.rent.toLocaleString()}
                        </Text>
                        <Text style={styles.apartmentLogisticsMargin}>
                            {i.bedrooms === 0 ? "Studio" : i.bedrooms + " Bed"}{" "}
                            {i.bathrooms + " Bath, "}{" "} 
                            {i.sqFt.toLocaleString("en-US") + " sqft"}
                        </Text>
                    </View>
                        {i.images && i.images.length > 0 && (
                             <Image source={{uri: i.images[0]}} style={styles.image} />
                        )}
                </Row>
                <Row style={styles.availableNowContainer}>
                    <Text style={{fontWeight: "600", fontSize: 16}}>
                        Available: Now
                    </Text>
                    <TouchableOpacity onPress={()=> console.log("navigate to floor plan details")}>
                        <Text style={{fontWeight: "600", fontSize: 16, color: "skyblue"}}>
                            Floor Plan Details
                        </Text>
                    </TouchableOpacity>
                </Row>
                <OrDivider style={styles.divider}/>
                <Row style={styles.defaultMarginVertical}>
                    <Text style={styles.layerText}>
                        Unit
                    </Text>
                    <Text style={styles.layerText}>
                        Price
                    </Text>
                    <Text style={styles.layerText}>
                        Sq Ft
                    </Text>
                    <Text style={styles.availableText}>
                        Availability
                    </Text>
                </Row>
                <OrDivider style={styles.divider}/>
                <Row style={styles.defaultMarginVertical}>
                    <Text style={styles.layerText}>
                        {i.unit}
                    </Text>
                    <Text style={styles.layerText}>
                        ${i.rent.toLocaleString("en-US")}
                    </Text>
                    <Text style={styles.layerText}>
                        {i.sqFt.toLocaleString("en-US")}
                    </Text>
                    <Text style={styles.availableText}>
                        {new Date().toLocaleString("en", {year: "numeric", month: "2-digit", day: "numeric"})}
                    </Text>
                </Row>
                <OrDivider style={styles.divider}/>
            </View>
            )
            )}
            </>
            ):(
                <Text style={styles.apartmentLogisticsTitle}>
                   No Apartments Listed
                </Text>
            )
        }
    </>
  )
}

export default PricingAndFloorPlanSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    container:{
        padding:10,
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        
    },
    apartmentLogisticsContainer:{
        flexShrink: 1,
        paddingRight: 10,
        marginTop: -5,
        width: "90%",
    },
    apartmentLogisticsTitle:{
        fontSize: 15,
        fontWeight: "600"
    },
    apartmentLogisticsMargin:{
        marginTop: 1,
        fontSize: 13,
//        fontWeight: "bold"
    },
    image:{
        height: 60,
        width: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    availableNowContainer:{
        marginTop: 15,
        justifyContent: "space-between"
    },
    divider:{
        marginTop: 5,
        backgroundColor: "#ccc",
    },
    layerText:{
        width: "21%",
    },
    availableText:{
        width: "37%",
    },
})