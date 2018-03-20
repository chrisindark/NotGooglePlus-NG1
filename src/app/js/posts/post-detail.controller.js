(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('PostDetailController', PostDetailController);

    PostDetailController.$inject = ['$state', '$stateParams',
    'Authentication', 'PostsService', 'ProfileService',
    'PopupService', 'Snackbar', 'Utility'];

    //@namespace PostDetailController
    function PostDetailController ($state, $stateParams,
        Authentication, PostsService, ProfileService,
        PopupService, Snackbar, Utility) {
        var vm = this;

        vm.postId = $stateParams.id;
        vm.post = undefined;
        vm.formTitle = undefined;
        vm.editMode = undefined;

        function getPost () {
            if (vm.postId) {
                PostsService.getPost(vm.postId)
                    .then(function (response) {
                        vm.post = response.data;
                        isOwner();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                vm.post = {};
                vm.editMode = true;
                vm.formTitle = 'New Post';
            }
        }

        function isOwner() {
            Authentication.isOwner(vm.post.user.username)
                .then(function () {
                    vm.isOwner = true;
                    vm.editMode = false;
                    vm.formTitle = 'Edit Post';
                });
        }

        // Function called to get authenticated user's account
        // and profile object when new post is created
        function getProfile () {
            vm.user = Authentication.fetchAuthenticatedUser();
            ProfileService.getProfile(vm.user.username)
                .then(function (response) {
                    vm.profile = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        vm.doUpdate = function (post) {
            vm.post = post;
            vm.editMode = false;
        };

        vm.doCreate = function (post) {
            // go to the newly created post route
            $state.go('postDetail', {id: post.id});
        };

        vm.doDelete = function () {
            var modalDefaults = {
                backdrop: false,
                keyboard: false,
                modalFade: false
            };

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete',
                headerText: 'Delete post',
                bodyText: 'Are you sure you want to delete the post ?'
            };

            PopupService.show(modalDefaults, modalOptions)
                .then(function (response) {
                    PostsService.removePost(vm.postId)
                        .then(function (response) {
                            console.log("post deleted");
                            $state.go('posts');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
        };

        vm.doLike = function (boolFlag) {
            if (!vm.isAuthenticated) {
                Snackbar.show('Please sign in to like/unlike posts !!');
                return;
            } else if (vm.isSubmitted) {
                return;
            }
            vm.isSubmitted = true;

            var data = {};
            if (vm.post.liked === boolFlag) {
                data.liked = null;
            } else {
                data.liked = boolFlag;
            }

            PostsService.votePost(vm.postId, data)
                .then(function (response) {
                    if (response.data.liked) {
                        Snackbar.show("Added to liked posts!");
                    }
                    Utility.likeUnlike(vm.post, response);
                    vm.isSubmitted = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        };


        //@name activate
        //@desc Actions to be performed when the controller is instantiated
        function activate() {
            getPost();

            vm.isAuthenticated = Authentication.isAuthenticated();
            if (vm.isAuthenticated) {
                vm.user = Authentication.fetchAuthenticatedUser();
            }
            // $state.go('home', {}, {reload: true});

            if (!vm.postId) {
                // getProfile();
            }
        }

        activate();

    }

})();
