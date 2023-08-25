import { StyleSheet, ViewStyle, useColorScheme } from 'react-native';
import { Text, View } from './Themed';
import { Row } from './Row';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const ModalHeader = ({
    xShown,
    text,
    style
}:{
    xShown?: boolean;
    text?: string;
    style?: ViewStyle | ViewStyle[];
}) => { 
    const colorScheme = useColorScheme();
    const navigation = useNavigation()
        if(text){
            return(
                <Row style={[styles.container, style as ViewStyle]}>
                    {xShown ?
                        <MaterialCommunityIcons 
                            style={styles.x}
                            name='close'
                            onPress={navigation.goBack} 
                            size={24}
                            color={Colors[colorScheme ?? 'light'].gray}/>
                        : null
                    }
                    <Text style={styles.text}>{text}</Text>
                </Row>
            )
        }

  return (
    <View style={[styles.container, style as ViewStyle]}>
      <View  style={styles.bar}/>
    </View>
  );
}

const styles = StyleSheet.create({
    x: {
        position: "absolute",
        alignSelf: "center",
        left: 10,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#a4a4a4",
        padding: 15,
    },
    bar: {
        width: 50,
        height: 4,
        borderRadius: 30,
        backgroundColor: '#a4a4a4',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    text:{
        fontSize: 24,
        fontWeight: "bold",
    },
});
