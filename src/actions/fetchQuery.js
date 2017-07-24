function fetchQuery(url, options) {

    if(typeof options.method === 'undefined') {
        options.method = 'GET'
    }

    //@TODO: DRY this out
    if(options.method === 'POST') {
        return fetch(url, {
            method: options.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: options.query
            }) || options.query
        })
            .then(response => {
                if (!response.ok) {
                    console.log(
                        'FETCH ERROR: ' + response.status + ' -- ' + response.statusText
                    );
                }
                return response.json();
            });
    }
    else {
        return fetch(url, {
            method: options.method,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.log(
                        'FETCH ERROR: ' + response.status + ' -- ' + response.statusText
                    );
                }
                return response.json();
            });
    }


}

export default fetchQuery;