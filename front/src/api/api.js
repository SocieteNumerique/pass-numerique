import axios from 'axios';

const isDev = document.body.getAttribute('data-env') === 'dev';
const apiRoot = isDev ? 'http://localhost:8000' : 'https://api.passnum.societenumerique.gouv.fr';

class Api {
    findArea(scale, code, canceler) {
        let config = {};
        if (canceler) {
            config.cancelToken = new axios.CancelToken(canceler);
        }

        return axios.get(apiRoot+'/area_stats?scale='+scale+'&code='+code, config);
    }
}

export const api = new Api();
