import axios from 'axios'
import reactotron from 'reactotron-react-native';

const base_url = 'https://graphql.anilist.co';

const axiosInstance = axios.create();


axiosInstance.interceptors.request.use((config) => {
    reactotron.log(config)
})

axiosInstance.interceptors.response.use(
    response => {
        reactotron.log(response, "responseeeeeee")

        console.log(response, "responseeeee")
        return response
    },
    error => {


        // if (error.response) {


        //     if (error.response.status === 401) {

        //         Router.push('/Login')

        //     }

        //     if (error.response.status === 409) {
        //         console.log(error.response.data.error.message);
        //         openNotificationWithIcon("error", "Error", error.response.data.error ? error.response.data.error.message : 'Please try after sometime!');

        //     }

        //     if (error.response.status === 500) {
        //         console.log(error.response.data.error.err.errors[0].message);
        //         openNotificationWithIcon("error", "Error", error.response.data.error ? error?.response?.data?.error?.err?.errors[0].message : 'Please try after sometime!');

        //     }

        // }


        return Promise.reject(error);
    }
)

// Send a POST request
export const postRequest = (url, query) => {


    return axiosInstance.post(base_url, {
        query: query
    },
        {
            headers: {
                'Content-Type': 'application/json',

            }
        })

    // return axiosInstance({

    //     method: "post",
    //     // url,
    //     // data,
    //     data: {
    //         query: query,
    //     },

    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         //"authorization": `${getToken()}`,
    //     }
    // });
}

// Send a GET request
export const getRequest = (url) => {
    return axiosInstance({
        method: "get",
        url,
        data: JSON.stringify({
            query: query,
        }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    });
}

// Send a DELETE request
export const deleteRequest = (url) => {
    return axiosInstance({
        method: "delete",
        url,
        data: JSON.stringify({
            query: query,
            //variables: variables,
        }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            //  "authorization": `${getToken()}`
        }
    });
}

// Send a PUT request
export const putRequest = (url, data) => {
    return axiosInstance({
        method: "put",
        url,
        // data,
        data: JSON.stringify({
            query: query,
            //variables: variables,
        }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            //"authorization": `${getToken()}` 
        }
    });
}