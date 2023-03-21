

let url = 'https://graphql.anilist.co'

function options(query) {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjODE0ZGEzYjQyODdjOTQyMDY2YTk2MzIzZmZjNjYyYTkwYjNiZmU3NWI0M2EwOTQyZDdiNDA4OTY4ZTgxMzI1OWQxNDNhNjI2ZDc0MGUyIn0.eyJhdWQiOiI3MTQxIiwianRpIjoiZWM4MTRkYTNiNDI4N2M5NDIwNjZhOTYzMjNmZmM2NjJhOTBiM2JmZTc1YjQzYTA5NDJkN2I0MDg5NjhlODEzMjU5ZDE0M2E2MjZkNzQwZTIiLCJpYXQiOjE2NjA3MjYzNDYsIm5iZiI6MTY2MDcyNjM0NiwiZXhwIjoxNjkyMjYyMzQ2LCJzdWIiOiI1NjU3MTI1Iiwic2NvcGVzIjpbXX0.VO8UQo4W6BvtdaNYnVyM8xFJc_i-fa8Sq2cdsLZe-igUpEb0L1s-FJj2_XASW8IvK6Viqq2rAcPFtM-YIpxDpa6-DWwxyVbYjGpGv7thHdNWSukdaUpMaAQaqYY4nC6RgKtbbHmMbtjZnIW78JH0voPObaecW5kb6jTbFvsdQYTUlL7Rj3bto-nZZe9nRW1gA5jRp0YQJk0n725ZduY9de-5OcaU2WZ_xrELItqwHKhWhTw1LzYu_Tz3tETuACOZr1OvQFFKx0Fy_2CG69eE7v0u-Ih27LT4Vmj3ZnhoF9iSOxLaeE3bhCBo5XaMbN_CB9-5GW8QsHtQeZghQczMrcGF4Je5PSDfwibFNANQVYhvTuvrMUcA9K3rEu2RRkEb0o4OYBFduMPOXRr7JvpPvdlD_uY8kA0g_EbgSpmqU-tdTfV4Tl7D9lSuMimzZYZZNhid3jhWsk8MMNnAt6yZcIiS5qif6LuNQkcnG6Tz21NMaYLfaeUvGnn5sLiDs21Iig9zPF2mRv2uWON_vRqGaQ-ld4bQm2MCV0JNXEKhvmIn8Y1exjToPn3gVJQxchPpMGn7psjIUYxDLBzazQAGQYbn20T58EfTxfwgXY4x_YiS4oyAokOBnGXwfe4QmqBJZeTTcJGPoDdHE-2nwA9zPrtrflswds1flHQGhgLj60o',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    }
};


export const GetUserDetails = async () => {
    let query = `
    query {
        Viewer {
            id
        }
    }

  `;

    const response = await fetch(url, options(query));
    const res = await response.json();
    console.log(res)
    return res.data.Page;
};
