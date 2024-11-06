import Cookies from 'js-cookie';
import React from 'react';

export function setCookie(name, value, days) {
    Cookies.set(name, value, { expires: days });
}

export function getCookie(name) {
    return Cookies.get(name);
}

export function deleteCookie(name) {
    Cookies.remove(name);
}

export function isCookieExpired(name) {
    const cookieValue = getCookie(name);

    if (!cookieValue) {
        return { expired: true };
    }

    const [value, expirationTimeStamp] = cookieValue.split('|');

    const now = new Date().getTime();
    let isExpired = now > parseInt(expirationTimeStamp, 10);
    return { expired: isExpired };
}