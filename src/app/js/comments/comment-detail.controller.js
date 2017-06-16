(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('commentDetail', {
            controller: CommentDetailController,
            controllerAs: 'vm',
            bindings: {
                commentType: '<',
                commentParent: '<',
                comment: '<',
                commentIndex: '<',
                onUpdate: '&',
                onDelete: '&'
            },
            templateUrl: 'app/js/comments/comment-detail.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('CommentDetailController', CommentDetailController);

    CommentDetailController.$inject = ['Authentication', 'CommentsService',
        'MarkedService', 'PopupService'];

    function CommentDetailController (Authentication, CommentsService,
                                      MarkedService, PopupService) {
        var vm = this;

        // vm.comment = {};
        vm.markdown = function(content) {
            return content
                ? MarkedService.markdown(content)
                : undefined;
        };

        vm.doEdit = function () {
            vm.comment.editMode = true;
        };

        vm.isSubmitted = false;

        vm.submit = function () {
            vm.isSubmitted = true;
            CommentsService.update(vm.commentParent.id, vm.comment.id, vm.comment)
                .then(function (response) {
                    vm.comment = response.data;
                    console.log("comment updated");

                    // notify parent component with the updated comment
                    vm.onUpdate({comment: response.data, commentIndex: vm.commentIndex});
                })
                .catch(function (response) {
                    vm.comment.errors = response.data;
                })
                .finally(function () {
                    vm.isSubmitted = false;
                });
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
                    CommentsService.remove(vm.commentParent.id, vm.comment.id)
                        .then(function (response) {
                            console.log("comment deleted");

                            vm.onDelete({comment: response.data, commentIndex: vm.commentIndex});
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
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
            // console.log(changesObj);

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
