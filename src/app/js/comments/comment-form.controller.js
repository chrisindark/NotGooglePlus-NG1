(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('commentForm', {
            controller: CommentFormController,
            controllerAs: 'vm',
            // Binds the attributes to the component controller.
            bindings: {
                commentType: '<',
                commentParent: '<',
                onCreate: '&'
            },
            templateUrl: 'app/js/comments/comment-form.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('CommentFormController', CommentFormController);

    CommentFormController.$inject = ['Authentication', 'CommentsService', 'Snackbar'];

    function CommentFormController (Authentication, CommentsService, Snackbar) {
        var vm = this;

        vm.comment = {};

        vm.isSubmitted = false;

        vm.submit = function () {
            if (!vm.isAuthenticated) {
                Snackbar.show('Please sign in to add comments !!');
                return;
            }
            vm.isSubmitted = true;
            CommentsService.create(vm.commentParent.id, vm.comment)
                .then(function (response) {
                    vm.comment = {};
                    console.log("comment created");

                    // notify parent component with the created comment
                    vm.onCreate({comment: response.data});
                })
                .catch(function (response) {
                    vm.comment.errors = response.data;
                })
                .finally(function () {
                    vm.isSubmitted = false;
                });

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
            if (changesObj.commentType && changesObj.commentType.currentValue) {
                CommentsService._init(vm.commentType);
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
