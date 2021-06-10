const DOMAIN = 'https://api.vnjob.work';
// const DOMAIN = 'http://127.0.0.1:8000' // Localhost Only | NOT USING FOR PRODUCTION !!
// const DOMAIN = 'http://5102b978fc38.jp.ngrok.io';
const VERSION_API = '/api/v1/';
const API = DOMAIN + VERSION_API;

export const LOGIN = API + 'auth/login';
export const REGISTER = API + 'auth/register';
export const CHECK_VALID_TOKEN = API + 'is-valid-token';
export const USER = API + 'user';

/**
 * Home page
 */
export const LIST_ORGANIZATION = API + 'organizations';
export const LIST_RECRUITMENT_NEWS = API + 'recruitment-news';
export const LIST_RECRUITMENT_NEWS_SORT_BY_MAJOR =
    API + 'recruitment-news-by-major';
export const LIST_MAJOR = API + 'majors';
export const APPLY = API + 'users/apply';
export const SEARCH = API + 'search';
export const LIST_APPLIED_JOBS = API + 'user/applied';