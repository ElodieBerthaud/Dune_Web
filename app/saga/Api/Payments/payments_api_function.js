import axios from 'axios';

export function verify_password(datas) {
    const datasTosend = new FormData();

    datasTosend.append('password', datas.password);

    return axios({
        method: 'post',
        url: 'http://51.38.187.216:9000/facturation/secure/verifPassword',
        headers: {
            token: datas.token
        },
        data: datasTosend
    });
}

export async function request_iban_api(datas){

    /*let {token} = await datas.stripe.createToken({name: "Name"});

    let response = await axios({
                    method: 'post',
                    url: 'http://51.38.187.216:9000/facturation/secure/verifPassword',
                    headers: {
                    token: datas.token
                },
                data: datasTosend
            });*/
}
