import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function DummyScreen() {

    const [link, setLink] = useState(null)

    const ActivityIndicatorLoadingView = () => {
        return (
            <ActivityIndicator color={EStyleSheet.value('$spcColor')} />

        );
    }
    function callApi() {
        axios.get('http://10.0.2.2:5000/').then(res => {
            console.log(res.data.authLink, "yooooo")
            setLink(res.data.authLink);
        })
    }

    if (link) {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <WebView
                    source={{ uri: link }}
                    renderLoading={ActivityIndicatorLoadingView}
                />
            </SafeAreaView>

        )
    }
    return (
        <View>
            <Text onPress={callApi}>
                Click
            </Text>
        </View>
    )
}
