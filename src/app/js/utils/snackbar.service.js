(function () {
    angular
        .module('notgoogleplus.services')
        .service('Snackbar', Snackbar);

    //@namespace
    //Snackbar
    function Snackbar() {
        var self = this;

        this.ifOpen = false;

        //@name _snackbar
        //@desc Display a _snackbar
        //@param {string} content The content of the snackbar
        //@param {Object} options Options  for displaying the snackbar
        function _snackbar(content, options) {
            if (this.ifOpen) {
                return;
            }

            options = _.extend({timeout: 3000}, options);
            options.content = content;
            options.onClose = function () {
                this.ifOpen = false;
            }

            $.snackbar(options);
            this.ifOpen = true;
        }

        //@name show
        //@desc Display a standard snackbar
        //@param {string} content The content of the snackbar
        //@param {Object} options Options for displaying the snackbar
        this.show = function (content, options) {
            _snackbar(content, options);
        };
    }

})();
