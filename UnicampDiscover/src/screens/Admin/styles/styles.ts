import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '6%',
        paddingTop: '8%'
    },
    pageTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    infoCardView: {
        backgroundColor: '#D4F1F4',
        borderRadius: 20,
        padding: '4%',
        marginVertical: '5%'
    },
    infoCardText: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    radioButtonView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        minWidth: '90%',
        marginTop: '2%'
    },
    botaoEntrar:{
        backgroundColor: '#850a0a',
        justifyContent: 'center',
        marginTop: '3%',
        alignSelf: 'center',
        width: '29%', 
        height: '23%',  
        borderRadius: 20,   
    },
    textoBotaoEntrar:{
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center', 
    },
    logOut:{
        width: '100%',
        alignContent: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: '4%'
    },
})