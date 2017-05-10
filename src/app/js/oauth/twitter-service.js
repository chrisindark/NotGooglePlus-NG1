angular
    .module('notgoogleplus.services')
    .factory('TwitterService', TwitterService);

function TwitterService($http, $window, $q) {

    var twitterKey = "STORAGE.TWITTER.KEY";
    var consumerKey = 'XDL6wRDP8Ez2CegqLQvGVEeUU';
    var consumerSecret = 'CsUldRUm1wIXZdcvqIex6MzWChjJHqVPHwE6dxirjXJXI9FSqk';

    var TwitterService = {};

    TwitterService.storeUserToken = function (data) {
        $window.localStorage.setItem(twitterKey, JSON.stringify(data));
    };

    TwitterService.getStoredToken = function () {
        return $window.localStorage.getItem(twitterKey);
    };

    TwitterService.createTwitterSignature = function (method, url) {
        var token = "";
        var oauthObject = {
            oauth_consumer_key: consumerKey,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };

        var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, consumerSecret, token.oauth_token_secret);
        $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    };

    TwitterService.init = function () {
        $cordovaOauth.twitter(consumerKey, consumerSecret).then(function (response) {
            console.log(response);
            // TwitterService.storeUserToken();
        });
    };

    TwitterService.isAuthenticated = function () {
        console.log(TwitterService.getStoredToken());
        return TwitterService.getStoredToken() !== undefined;
    };

    return TwitterService;
}
