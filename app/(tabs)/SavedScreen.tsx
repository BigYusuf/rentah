import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Screen } from '../../components/Screen';

export default function SavedScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Saved Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
