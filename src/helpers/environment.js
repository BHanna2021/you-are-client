let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'bh-you-are.herokuapp.com':
        APIURL = 'https://bh-youareloved.herokuapp.com/'
}

export default APIURL;