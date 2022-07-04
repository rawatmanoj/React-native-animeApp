const config = {
    // screens: {
    //     Home: {
    //         screens: {
    //             HomeScreen: '*',
    //         }
    //     }

    // },
    screens: {
        Home: "*"
    }
};

const linking = {
    prefixes: ['https://animenation', 'animenation://'],
    config,
};

export default linking;

