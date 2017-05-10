(function() {
    angular
        .module('notgoogleplus.services')
        .service('MarkedService', MarkedService);

    MarkedService.$inject = [];

    // @namespace Marked
    function MarkedService() {
        var defaultOptions = {};

        var _marked = function(content, options) {
            options = _.extend(defaultOptions, options);
            marked.setOptions(options);

            return marked(content);
        };

        this.markit = function(content, options) {
            return _marked(content, options);
        };
    }
})();
