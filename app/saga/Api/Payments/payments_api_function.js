import axios from 'axios';

export function verify_password(datas) {
    const datasTosend = new FormData();

    datasTosend.append('password', datas.password);

    return axios({
        method: 'post',
        url: api_url_dev + '/facturation/secure/verifPassword',
        headers: {
            token: datas.token
        },
        data: datasTosend
    });
}

export async function send_payment_method(datas){

    return await datas.cardElement.createPaymentMethod('card');

}

export function sendToken(datas){
    return axios({
        method: 'post',
        url: api_url_dev + '/stripe/payments/addMethod',
        headers: {
            token: datas.tokenSession
        },
        data: {pm_id: datas.pm_id}
    });
}
