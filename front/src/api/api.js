import axios from 'axios';
import {Calculator} from "../simulator/calculator";

const isDev = document.body.getAttribute('data-env') === 'dev';
const apiRoot = isDev ? 'http://localhost:8000' : 'https://api.passnum.societenumerique.gouv.fr';

class Api {
    findArea(scale, codes, canceler) {
        let config = {};
        if (canceler) {
            config.cancelToken = new axios.CancelToken(canceler);
        }

        if (scale === Calculator.SCALE_INTERDEPARTMENTAL) {
            scale = Calculator.SCALE_DEPARTMENTAL;
        }

        codes = codes.split(',');

        let query = ['scale='+scale];
        for (let i in codes) {
            query.push('code[]='+codes[i]);
        }

        return axios.get(apiRoot+'/area_stats?'+query.join('&'), config);
    }
}

export const api = new Api();
