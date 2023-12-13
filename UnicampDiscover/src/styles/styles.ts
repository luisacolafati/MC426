import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
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
    learnMoreButton:{
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 10, 
        right: 10,
    },
    learnMoreButtonText: {
        color: '#850A0A',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    espacamento:{
        marginHorizontal: '0.4%'
    },
    direcao:{
        flexDirection: 'row'
    },
    alinhamento:{
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        left: 100,
        marginTop: '4%'
    },
    avaliacao: {
        marginTop: '50%',
        alignItems: 'center'

    },

    // BathroomSearchBar
    bathroomSearch: {
        height: 45,
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