(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('commentComponent', {
            controller: CommentController,
            controllerAs: 'vm',
            // Binds the attibutes to the component controller.
            bindings: {
                commentType: '@',
                // the resource whose comments are to be fetched
                // don't change this property in any way
                // to keep one-way data binding of the object
                // as objects are passed by reference.
                commentParent: '<'
            },
            templateUrl: 'app/js/utils/comments.html'
    });

    CommentController.$inject = ['$rootScope', '$scope', '$state', '$stateParams',
        'Authentication', 'Snackbar', 'CommentsService', 'PopupService'];

    function CommentController($rootScope, $scope, $state, $stateParams,
                               Authentication, Snackbar, CommentsService,
                               PopupService) {
        var vm = this;

        vm.commentParentId = $stateParams.id;
        vm.comment = {};
        vm.comments = [];

        function getComments() {
            if (!vm.commentParent || vm.commentParent.comments_count <= 0) {
                return;
            }
            // fetch comments is ascending order of created date, always.
            vm.params = {
                o: 'created_at'
            };

            CommentsService.all(vm.commentParentId, vm.params)
                .then(function(response) {
                    vm.comments = vm.comments.concat(response.data.results);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        //@name submit
        //@desc Create a new Comment
        vm.submit = function ($index) {
            if (!vm.isAuthenticated) {
                Snackbar.show('Please sign in to add comments !!');
                return;
            }
            if ($index !== undefined) {
                CommentsService.update(vm.commentParent.id, vm.comments[$index].id, vm.comments[$index])
                    .then(function (response) {
                        vm.comments[$index].errors = {};
                        vm.comments[$index].editMode = false;
                        console.log("comment updated");
                    })
                    .catch(function (response) {
                        vm.comments[$index].errors = response.data;
                    });
            } else {
                CommentsService.create(vm.commentParentId, vm.comment)
                    .then(function (response) {
                        vm.comment = {};
                        vm.comments.push(response.data);
                        console.log("comment created");
                        // $rootScope.$emit('comment.created', response.data);
                    })
                    .catch(function (response) {
                        vm.comment.errors = response.data;
                    });
            }
        };

        vm.doDelete = function ($index) {
            var modalDefaults = {
                backdrop: false,
                keyboard: false,
                modalFade: false
            };

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete',
                headerText: 'Delete comment',
                bodyText: 'Are you sure you want to delete the comment ?'
            };

            PopupService.show(modalDefaults, modalOptions)
                .then(function (response) {
                    CommentsService.remove(vm.commentParent.id, vm.comments[$index].id)
                        .then(function (response) {
                            vm.comments.splice($index, 1);
                            console.log("comment deleted");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
        };

        vm.doEdit = function ($index) {
            vm.comments[$index].editMode = true;
        };

        function activate() {
            vm.isAuthenticated = Authentication.isAuthenticated();
            vm.user = Authentication.fetchAuthenticatedUser();
            CommentsService._init(vm.commentType);
        }

        vm.$onInit = function () {
            // console.log('oninit');
        };

        vm.$onChanges = function (changesObj) {
            // console.log('onchange');
            activate();
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
