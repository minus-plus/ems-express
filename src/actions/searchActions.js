'use strict';
import axios from 'axios';


export function search(trackingNumber) {
    return function(dispatch) {
        const url = `/api/v1/whale/${trackingNumber}`;
        axios({
            method: 'get',
            url: url
        })
            .then(function (res) {
                const emsTracking = res.data.tracking;
                if (emsTracking) {
                    searchEms(emsTracking, dispatch);
                }
                dispatch({
                    type: "WHALE_RESULT",
                    payload: res.data
                })
            })
            .catch(function(err) {
                console.log(err);
            })
    };
}

function searchEms(trackingNumber, dispatch) {
    const url = `/api/v1/ems/${trackingNumber}`;
    axios({
        method: 'get',
        url: url
    })
        .then(function (res) {
            if (res.data.status === '200') {
                dispatch({
                    type: "EMS_RESULT",
                    payload: res.data.data
                })
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}


export function setInput(input) {
    return {
        type: 'SEARCH_INPUT',
        payload: input
    }
}

export function resetSearch() {
    return {
        type: "RESET_SEARCH"
    }
}


