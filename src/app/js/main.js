function Promise(fn) {
    var state = 'PENDING';
    var value;
    var callbackFn;
    var self = this;
    self.then = then;

    function handle(deferred) {
        if (state == 'PENDING') {
            callbackFn = deferred;
            return;
        }
        if (!deferred.onResolve) {
            return deferred.resolve(value);
        }

        var ret = deferred.onResolve(value);
        return deferred.resolve(ret);
    }

    function resolve(val) {
        state = 'RESOLVED';
        value = val;
        if (callbackFn) {
            handle(callbackFn);
        }
    }

    function reject(val) {
        state = 'REJECTED';
        value = val;
        if (callbackFn)
            handle(callbackFn);
    }

    function then(successFn, errorFn) {
        return new Promise(function(resolve, reject) {
            handle({
                onResolve: successFn,
                resolve: resolve,
                onReject: errorFn,
                reject: reject
            });
        });
    }

    fn(resolve, reject);
}

function getDummyResponse(name) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (name === 'Chris') {
                resolve(name);
            } else {
                reject('Avik');
            }
        }, 1000);
    });
}

getDummyResponse('Chris')
    .then(function(data) {
        console.log(data);
        return data + ' Paul';
    })
    .then(function(data) {
        console.log(data);
    });
