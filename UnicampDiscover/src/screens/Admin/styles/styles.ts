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
        fontSize: 32
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
    }
})