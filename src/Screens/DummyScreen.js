import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, Linking } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function DummyScreen() {

    const [link, setLink] = useState(null)


    useEffect(() => {
        Linking.addEventListener('url', ({ url }) => { console.log(url, "urllllllllll") })
    }, [])

    const ActivityIndicatorLoadingView = () => {
        return (
            <ActivityIndicator color={EStyleSheet.value('$spcColor')} />

        );
    }
    function callApi() {
        Linking.openURL('https://anilist.co/api/v2/oauth/authorize?client_id=7141&response_type=token').then(res => {
            console.log(res, "DeepLinkinggggggggg")
        })
    }


    return (
        <View>
            <Text onPress={callApi}>
                Click
            </Text>
        </View>
    )
}
