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

    // LoginScreen
    principal:{
        flex: 1,
        height: '100%',
        width: '100%',
    },
    containerLogin:{
        alignSelf: 'center',     
    },
    usuario:{
        color: '#000',
        fontSize: 20,
        marginTop: '20%',
    },
    senha:{
        color: '#000',
        fontSize: 20,
        marginTop: '4%', 
    },
    inputUsuario:{
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: '30%',
        height: '13%', 
        marginTop: '1%',        
    },
    inputSenha:{
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: '30%',
        height: '12%',  
        marginTop: '1%',        
    },
    botaoEntrar:{
        backgroundColor: '#850a0a',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: '3%',
        alignSelf: 'center',
        width: '29%', 
        height: '20%',     
    },
    textoBotaoEntrar:{
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center', 
    },
});
