// @name RedirectionState
// @desc Factory function to handle redirection of state
// from landing page after logging in to the state
// the user left.
angular
    .module('notgoogleplus.utils')
    .factory('RedirectionState', RedirectionState);

RedirectionState.$inject = ['$location', 'SessionService'];

    function RedirectionState($location, SessionService) {

        var RedirectionState = {};

        // @name getState
        // @desc Function to get the state saved for
        // redirection.
        RedirectionState.getState = function () {
            if (!SessionService.getObject('STATEOBJ')) {
                return;
            }
            return SessionService.getObject('STATEOBJ');
        };

        // @name setState
        // @desc Function to set the state for
        // redirection.
        RedirectionState.setState = function () {
            SessionService.setObject('STATEOBJ', $location.path());
        };

        // @name deleteState
        // @desc Function to delete the state after
        // redirection is complete.
        RedirectionState.deleteState = function () {
            SessionService.removeObject('STATEOBJ');
        };

        // @name checkState
        // @desc Function to check if a state is saved for
        // redirection.
        RedirectionState.checkState = function () {
            return (!!SessionService.getObject('STATEOBJ'));
        };

        // @name changeState
        // @desc Function to change the state saved for
        // redirection.
        RedirectionState.changeState = function () {
            $location.url(RedirectionState.getState());
            RedirectionState.deleteState();
        };

        return RedirectionState;

    }
