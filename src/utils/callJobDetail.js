import axios from 'axios';
import * as Config from './../constants/Config';

export default async function callJobDetail(endpoint, method = 'get', body){
    return await axios({
        method,
        url: `${Config.API}/${Config.RECRUITMENT_NEWS}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}