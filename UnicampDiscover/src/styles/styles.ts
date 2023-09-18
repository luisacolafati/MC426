import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
      //justifyContent: 'center',
      width: "100%",
      height: "100%",
      resizeMode: 'cover'
    },
    text: {
      color: 'white',
      fontSize: 30,
      lineHeight: 0,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000c0',
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
        backgroundColor: '#f7f7f7',
        paddingLeft: '2%',
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        marginBottom: '2%'
    },
    bathroomInternView: {
        marginLeft: '2%',
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
        paddingRight: '2%',
        height: '60%',
        justifyContent: 'center',
    },

    // BathroomSearchBar
    bathroomSearch: {
        height: 35,
        width: '90%',
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        marginBottom: '2%',
        paddingHorizontal: '2%',
        alignItems: 'center',
    },
    bathroomTextInput: {
        marginHorizontal: '2%'
    },
});
