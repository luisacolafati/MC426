import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
      textAlign: 'center',
    },

    // BathroomCard
    bathroomScrollView: {
      flex: 1,
      backgroundColor: '#ffffff',
      width: '100%',
      marginTop: '10%',
      marginLeft: '5%',
      alignContent:  'center',
      textAlign: 'center',
    },
    bathroomView: {
      height: 120,
      width: '90%',
      backgroundColor: '#ffffff',
      paddingLeft: '5%',
      flexDirection: "row",
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#cccccc',
      marginBottom: '2%'
    },
    bathroomInternView: {
      marginLeft: '5%',
      height: '80%',
      paddingLeft: '5%',
      justifyContent: 'space-between',
      borderColor: '#000000',
    },
    textBathroomCard: {
      fontWeight: 'bold',
      fontSize: 10,
    },
    titleBathroomCard: {
      fontSize: 9,
    },
    iconBathroom: {
      borderRightWidth: 1,
      paddingRight: '5%',
      height: '60%',
      justifyContent: 'center',
    }
});