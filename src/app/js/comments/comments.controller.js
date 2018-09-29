(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('commentComponent', {
            controller: CommentController,
            controllerAs: 'vm',
            // Binds the attributes to the component controller.
            bindings: {
                commentType: '@',
                // the resource whose comments are to be fetched
                // don't change this property in any way
                // to keep one-way data binding of the object
                // as objects are passed by reference.
                commentParent: '<'
            },
            templateUrl: 'app/js/comments/comments.html'
    });

    angular
        .module('notgoogleplus.controllers')
        .controller('CommentController', CommentController);

    CommentController.$inject = ['$rootScope', '$scope', '$state', '$stateParams',
        'Authentication', 'Snackbar', 'CommentsService', 'MarkedService', 'PopupService'];

    function CommentController($rootScope, $scope, $state, $stateParams,
        Authentication, Snackbar, CommentsService, MarkedService, PopupService) {
        var vm = this;

        vm.comments = [];

        function getComments() {
            if (!vm.commentParent || vm.commentParent.comments_count <= 0) {
                return;
            }
            // fetch comments is ascending order of created date, always.
            vm.params = {
                o: 'created_at'
            };

            CommentsService.all(vm.commentParent.id, vm.params)
                .then(function(response) {
                    vm.comments = vm.comments.concat(response.data.results);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        vm.doUpdate = function (comment, commentIndex) {
            vm.comments[commentIndex] = comment;
        };

        vm.doCreate = function (comment) {
            vm.comments.push(comment);
        };

        vm.doDelete = function (comment, commentIndex) {
            vm.comments.splice(commentIndex, 1);
        };

        function activate() {
            vm.isAuthenticated = Authentication.isAuthenticated();
            vm.user = Authentication.fetchAuthenticatedUser();
        }

        vm.$onInit = function () {
            // console.log('oninit');
            activate();
        };

        vm.$onChanges = function (changesObj) {
            // console.log('onchange');
            CommentsService._init(vm.commentType);
            if (changesObj.commentParent.currentValue) {
                getComments();
            }
        };

        vm.$onDestroy = function () {
            // console.log('ondestroy');
        };

        vm.$doCheck = function () {
            // console.log('docheck');
        };

    }

})();
