(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('postForm', {
            controller: PostFormController,
            controllerAs: 'vm',
            bindings: {
                postId: '<',
                post: '<',
                formTitle: '<',
                editMode: '<',
                onCreate: '&',
                onUpdate: '&'
            },
            templateUrl: 'app/js/posts/post-form/post-form.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('PostFormController', PostFormController);

    PostFormController.$inject = ['$rootScope', '$scope', 'PostsService', 'PopupService'];

    function PostFormController ($rootScope, $scope, PostsService, PopupService) {
        var vm = this;

        vm.post = {};
        vm.file = undefined;

        vm.isSubmitted = false;
        vm.previewPost = false;

        vm.submit = function () {
            vm.isSubmitted = true;

            if (vm.post.file !== null && typeof vm.post.file === 'object') {
                vm.file = vm.post.file;
                vm.post.file = vm.post.file.id;
            }

            if (vm.postId) {
                PostsService.updatePost(vm.postId, vm.post)
                    .then(function (response) {
                        vm.post = response.data;
                        console.log("post updated");

                        // notify parent component with the updated post
                        vm.onUpdate({post: response.data});
                    })
                    .catch(function (response) {
                        vm.post.errors = response.data;
                    })
                    .finally(function () {
                        vm.isSubmitted = false;
                        // on update or create of post, the file associated with the post
                        // is sent as id, so we replace it with the file object in memory.
                        if (vm.post.file) {
                            vm.post.file = vm.file;
                        }

                    });
            } else {
                PostsService.createPost(vm.post)
                    .then(function (response) {
                        vm.post = {};
                        console.log("post created");

                        // notify parent component with the created post
                        vm.onCreate({post: response.data});
                    })
                    .catch(function (response) {
                        vm.post.errors = response.data;
                    })
                    .finally(function () {
                        vm.isSubmitted = false;
                        // on update or create of post, the file associated with the post
                        // is sent as id, so we replace it with the file object in memory.
                        if (vm.post.file) {
                            vm.post.file = vm.file;
                        }

                    });
            }

        };

        vm.openFileModal = function() {
            var modalDefaults = {
                backdrop: false,
                keyboard: false,
                modalFade: false,
                templateUrl: 'app/js/posts/select-file.html',
                controller: 'SelectFilesController',
                controllerAs: 'vm',
                windowClass: 'my-modal upload-modal'
            };

            PopupService.show(modalDefaults)
                .then(function () {
                    $rootScope.$emit('file.received', vm.post.file);
                });
        };

        var deregisterEventSelected = $rootScope.$on('file.selected', function (event, file) {
            if (!file) {
                vm.post.file = null;
            }
            vm.post.file = file;
            vm.file = file;
        });

        $scope.$on('$destroy', deregisterEventSelected);

        function activate () {}

        vm.$onInit = function () {
            // console.log('oninit');
            activate();
        };

        vm.$onChanges = function (changesObj) {
            // console.log('onchange');
        };

        vm.$onDestroy = function () {
            // console.log('ondestroy');
        };

        vm.$doCheck = function () {
            // console.log('docheck');
        };

    }

})();
