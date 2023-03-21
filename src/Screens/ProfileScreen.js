import React from 'react'
import { View, Text, Button, Linking } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import { deviceHeight, deviceWidth } from '../api/Constants'
export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.heading}>Animenation is a 3rd party client app for Anilist. So there
                        is like no direct means of Signing In. Browsers like chrome woll be needed and you will
                        be redirected to anilist.co to login/register. Please make sure the URL is anilist.co before entering
                        your creds.
                    </Text>
                </View>
                <View style={styles.ButtonContainer}>

                    <Button
                        color={EStyleSheet.value('$baseColor')}
                        title='Sign In'
                        onPress={() => {
                            Linking.openURL('https://anilist.co/api/v2/oauth/authorize?client_id=7141&response_type=token').then(res => {

                            })
                        }}
                    ></Button>
                    <Button
                        color={EStyleSheet.value('$baseColor')}
                        title='Register'
                    ></Button>
                </View>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$baseColor',
        alignItems: 'center',
    },
    box: {
        marginTop: 20,
        backgroundColor: '$shadeColor',
        width: deviceWidth - 30,
        height: deviceHeight * 0.3,
        borderRadius: 10,
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    heading: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: '12.5rem',
        padding: '20rem'
    }
})
