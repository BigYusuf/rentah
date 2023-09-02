import { StyleSheet, FlatList } from 'react-native'
import React from 'react'

import { Property } from '@/types/property'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, View } from '../Themed'
import PetCard from '../PetCard'
import GeneralTextCard from '../GeneralTextCard'

const LeaseAndFeesSection = ({property}: {property: Property}) => {
  return (
    <>
        <Text style={[styles.defaultMarginVertical, styles.header]}>Lease Details & Fees</Text>
        {property.pets ?
        <>
            <View style={styles.row}>
                <MaterialIcons 
                    name='pets'
                    color={'black'}
                    size={24}
                />
                <Text style={styles.text}>Pet Policies</Text>
            </View>
            <FlatList
                style={styles.defaultMarginVertical}
                horizontal
                data={property.pets}
                keyExtractor={(item) => item.type}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <PetCard pet={item} style={styles.petCard}/>}
            />
        </>
        : null
        }
        <View style={styles.row}>
            <MaterialIcons 
                name='attach-money'
                color={'black'}
                size={24}
            />
            <Text style={styles.text}>Fees</Text>
        </View>
        <GeneralTextCard heading='parking' body={['Other']} />{/** this should be change to dynamic data later*/}
        
        <View style={styles.row}>
            <MaterialIcons 
                name='list-alt'
                color={'black'}
                size={24}
            />
            <Text style={styles.text}>Details</Text>
        </View>
        <FlatList 
            data={[
                {heading: "lease options", body: ["12 months"]},
                {heading: "property information", body: ["Built in 2017", "Apartment Community", "242 units/ 5 stories"]},
            ]}
            horizontal
            keyExtractor={(index) => index.heading}
            renderItem={({item, index}) =>(
                <GeneralTextCard key={index} style={styles.textCard} heading={item.heading} body={item.body} />//** this should be change to dynamic data later
            )}
        />
  
    </>
  )
}

export default LeaseAndFeesSection

const styles = StyleSheet.create({
    defaultMarginVertical:{ 
        marginVertical: 10,
    },
    header:{
        fontWeight: "bold",
        fontSize: 24,
    },
    row:{
        alignItems: "center",
        paddingVertical: 10,
        flexDirection: 'row'
    },
    text:{
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    petCard:{
        marginRight: 15,
    },
    textCard:{
        marginRight: 10
    },
})