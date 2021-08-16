export interface FetchParams extends RequestInit{
    url: RequestInfo,
}

const defaultParams = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

/**
 * 使用fetch发起请求
 * @param Params 
 * @returns FetchData
 */

function fetchData( p:FetchParams ){
    const params = { ...defaultParams, ...p } as FetchParams;
    return fetch( params.url, params);
}


export default fetchData