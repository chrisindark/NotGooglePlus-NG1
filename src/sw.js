var deleteTestRecords = function () {
    for (var i = 0; i < 10; ++i) {
        fetch('https://ancient-tor-16694.herokuapp.com/api/v1/posts/' + i + '/', {
            method: 'delete',
            headers: {'Authorization': 'Token ' + JSON.parse(localStorage.getItem('notgoogleplus_auth_token'))},
        }).then(function (res) {
            console.log('deleted', res);
        }).catch(function (err) {
            console.log('delete failed');
        });
    }
};


var db;
var request = indexedDB.open("idb-test");
request.onsuccess = function (event) {
    db = event.target.result;
    afterIdbInit();
};

request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("posts", { keyPath: "id", autoIncrement:true });
};

request.onerror = function (event) {
    // console.log("error: ", event);
};

var afterIdbInit = function () {
    var postsDB = db.transaction(["posts"], "readwrite").objectStore("posts");

    // var getRequest = postsDB.get();

    // getRequest.onsuccess = function (event) {
    //     console.log('success', event);
    // };
    // getRequest.onerror = function (event) {
    //     console.log('error', event);
    // };

};

/****************************************************************************************/

// Get the connection type.
var type = navigator.connection.type;

// Get an upper bound on the downlink speed of the first network hop
var max = navigator.connection.downlinkMax;
function navigatorChangeHandler(e) {
    // Handle change to connection here.
}
// Register for event changes.
navigator.connection.onchange = navigatorChangeHandler;
// Alternatively.
// navigator.connection.addEventListener('change', navigatorChangeHandler);

/****************************************************************************************/

var log = console.log.bind(console);
var error = console.error.bind(console);

// these tags are needed for gulp to inject
// versioned service worker file in production build
/* service-worker:js */
var swFileName = 'sw.js';
/* endinject */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swFileName)
        .then(function (reg) {
            log('Service worker installed', reg);

            if ('sync' in reg) {
                // do stuff here
            }

            Notification.requestPermission()
                .then(function(permission) {
                    console.log('notification', permission);
                    if (permission === 'granted') {
                    }
                });
        })
        .catch(function (err) {
            error('Service worker error:', err);
        });
}

var rttValue = 600;
var checkRtt = true;

self.testFlag = true;

self.fireNotification = function () {
    navigator.serviceWorker.ready.then(function(registration) {
        // console.log('registration', registration);
        registration.sync.register('fire-notification').then(function() {
            // registration succeeded
            console.log('sync registration');
        }, function(err) {
            // registration failed
        });
    });
};

self.testNewSyncRegistration = function () {
    navigator.serviceWorker.ready.then(function(registration) {
        registration.sync.register('new-sync-registration').then(function () {
            // registration succeeded
            console.log('sync registration');
        }, function (err) {
            // registration failed
        });
    });
};

var version = '1';
var cacheName = 'pwa-client-v' + version;
var dataCacheName = 'pwa-client-data-v' + version;
var appShellFilesToCache = [
    './',
    './index.html'
];

// log(self);
self.addEventListener('install', function (e) {
    log('[ServiceWorker] Install');
    e.waitUntil(self.skipWaiting());
    log('Service Worker: Installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                log('Service Worker: Caching App Shell');
                return cache.addAll(appShellFilesToCache);
            })
    );
});

self.addEventListener('activate', function (e) {
    log('[ServiceWorker] Activate');
    e.waitUntil(self.clients.claim());
    log('Service Worker: Activated');

    e.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== cacheName) {
                        log('Service Worker: Removing old cache', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
});

self.addEventListener('fetch', function (e) {
    // log('Service Worker: Fetch URL ', e.request.url);
    // var dataUrl = 'http://127.0.0.1:8000';
    // var postGetUrl = 'https://ancient-tor-16694.herokuapp.com/api/v1/posts';
    //
    // if (e.request.url.indexOf(postGetUrl) > -1) {
    //     console.log('connection', navigator.connection);
    //     e.respondWith(new Response(JSON.stringify({'success': 'done'})));
    //     return;
    // }

    console.log('here', self.testFlag);

    if (interceptPostsApi(e)) {
        e.respondWith(new Response(JSON.stringify({'success': 'done'})));
        return;
    }

    // Match requests for data and handle them separately
    e.respondWith(
        caches.match(e.request.url)
            .then(function (response) {
                // Cache hit - return response
                // if (response) {
                //     if (e.request.url.indexOf(dataUrl) === 0) {
                //         response.json().then(function (json) {
                //           console.log(json);
                //         });
                //     }
                // }

                return fetch(e.request.clone())
                    .then(function (r2) {
                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        // if (e.request.url.indexOf(dataUrl) === 0) {
                        //   console.log('Service Worker: Fetched & Cached Response ',
                        //     r2.clone().json().then(function (json) {
                        //       console.log(json);
                        //     })
                        //   );
                        // }
                        return caches.open(dataCacheName)
                            .then(function (cache) {
                                cache.put(e.request.url, r2.clone());
                                // console.log('Service Worker: Fetched & Cached URL ', e.request.url);
                                // console.log('Service Worker: Fetched & Cached Response ', r2.clone());
                                return r2;
                            });
                        })
                    .catch(function (error) {
                        // First try to fetch the response from server
                        // If error, then send response if present
                        // else error
                        // if (response) {
                        //   log('Service Worker: Cached Response ', response);
                        // }
                        return response || error;
                    });
            })
    );
});

self.addEventListener('sync', function (event) {
    console.log('sync', event);
    if (event.tag === 'new-sync-registration') {
        event.waitUntil(fetchDogImage());
    } else if (event.tag === 'fire-notification') {
        self.registration.showNotification("Sync event fired!");
    }
});

var fetchDogImage = function () {
    return fetch('https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?cs=srgb&dl=adorable-animal-breed-356378.jpg&fm=jpg')
        .then(function (response) {
            return response;
        })
        .then(function (text) {
            console.log('Request successful', text);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
};

var getRequestHeaders = function (e) {
    var headers = {};
    headers['Authorization'] = e.request.headers.get('Authorization');
    headers['Content-Type'] = 'application/json';
    // headers['Access-Control-Request-Headers'] = 'authorization,content-type';
    // headers['Access-Control-Request-Method'] = 'POST';
    return headers;
};

var getAuthHeader = function (e) {
    return e.request.headers.get('Authorization');
};

var interceptPostsApi = function (e) {
    var postSaveUrl = 'https://ancient-tor-16694.herokuapp.com/api/v1/posts/';

    if (e.request.url.indexOf(postSaveUrl) > -1 && e.request.method === 'POST') {
        // console.log('request', e.request.headers.get('Authorization'));
        // console.log('connection', navigator.connection);
        // if checkRtt bool flag is true and rtt is greater than certain value
        // or the user is offline
        // save the payload to indexeddb
        if ((checkRtt && navigator.onLine && navigator.connection.rtt > rttValue) || !navigator.onLine) {
            e.request.json().then(function (res) {
                // console.log('savepost', res);
                savePostToIdb(res);
            });

            return true;
        }
    } else {
        if ((checkRtt && navigator.onLine && navigator.connection.rtt < rttValue)) {
            if (self.testFlag && getAuthHeader(e)) {
                savePostsToApi(e);
                self.testFlag = false;
            }
        }

        // return false to continue processing other requests as they should be
        return false;
    }
};

var savePostToIdb = function (postObj) {
    // console.log('idb', db);
    if (db) {
        var postsDBStore = db.transaction(["posts"], "readwrite").objectStore("posts");
        // console.log('index names', postsDBStore.indexNames);
        // console.log('autoincrement value', postsDBStore.autoIncrement);
        var postsCountRequest = postsDBStore.count();
        postsCountRequest.onsuccess = function () {
            // console.log('count', postsCountRequest.result);
            // postObj.id = postsCountRequest.result + 1;
            postsDBStore.add(postObj);
        };
    }
};

var removePostFromIdb = function (postObj) {
    console.log('remove post idb', postObj.id);
    if (db) {
        var postsDBStore = db.transaction(["posts"], "readwrite").objectStore("posts");
        var requestDelete = postsDBStore.delete(postObj.id);
        requestDelete.onsuccess = function(e) {
            // console.log('Record deleted successfully...', e);
        };
    }
};

var savePostsToApi = function (requestEvent) {
    // console.log('idb', db);
    var postSaveUrl = 'https://ancient-tor-16694.herokuapp.com/api/v1/posts/';

    var postsTransaction = db.transaction(["posts"], "readwrite");
    var postsDBStore = postsTransaction.objectStore("posts");
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = postsDBStore.openCursor(keyRange);
    var postObjects = [];
    // console.log(keyRange, cursorRequest);
    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;

        if (result) {
            postObjects.push(result.value);

            result.continue();
        } else {
            // console.log("No more entries!");
        }
    };

    postsTransaction.oncomplete = function() {
        // console.log('Records fetched successfully...', postObjects);

        postObjects.forEach(function (value, index) {
            fetch(postSaveUrl, {
                method: 'post',
                body: JSON.stringify(value) ,
                headers: getRequestHeaders(requestEvent),
            }).then(function (res) {
                // console.log('IDB Post Request succeeded with JSON response', res);
                removePostFromIdb(value);
            }).catch(function (err) {
                // console.log('IDB Post Request failed');
            });
        });

        self.testFlag = true;
    };
};
