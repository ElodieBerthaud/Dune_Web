import * as types from './actionTypes';

function professor_url(){
    return 'http://176.31.252.134:9001/api/v1/profs/1';
}

export function receive_professor(json){
    return {type: types.GET_PROFESSOR,
        nomProf: JSON.stringify(json.response[0].nomProf),
        prenomProf: JSON.stringify(json.response[0].prenomProf),
        emailProf: JSON.stringify(json.response[0].emailProf)
    };
}

export function get_professor(){
    console.log("im in this function bitch");
    return dispatch => {
        return fetch(professor_url(), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receive_professor(json)));
    };
}