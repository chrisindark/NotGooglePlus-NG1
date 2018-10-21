(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('ArticleDetailController', ArticleDetailController);

    ArticleDetailController.$inject = ['$state', '$stateParams',
        'Authentication', 'ArticlesService', 'ProfileService',
        'TagsService', 'PopupService', 'Snackbar', 'Utility'];

    //@namespace ArticleDetailController
    function ArticleDetailController ($state, $stateParams,
        Authentication, ArticlesService, ProfileService,
        TagsService, PopupService, Snackbar, Utility) {
        var vm = this;

        vm.articleId = $stateParams.id;
        vm.article = $stateParams.article;
        vm.formTitle = undefined;
        vm.editMode = undefined;

        function getArticle () {
            if (vm.articleId) {
                if (vm.article) {
                    isOwner();
                    return;
                }

                ArticlesService.getArticle(vm.articleId)
                    .then(function (response) {
                        vm.article = response.data;
                        isOwner();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                vm.article = {};
                vm.editMode = true;
                vm.formTitle = 'New Article';
            }
        }

        function getTagsList() {
            TagsService.allTags()
                .then(function (response) {
                    vm.tagsList = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        function isOwner () {
            Authentication.isOwner(vm.article.user.username)
                .then(function () {
                    vm.isOwner = true;
                    vm.editMode = false;
                    vm.formTitle = 'Edit Article';
                });
        }

        // Function called to get authenticated user's account
        // and profile object when new article is created
        function getProfile () {
            ProfileService.getProfile(vm.user.username)
                .then(function (response) {
                    vm.profile = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        vm.doUpdate = function (article) {
            vm.article = article;
            vm.editMode = false;
        };

        vm.doCreate = function (article) {
            // go to the newly created article route
            $state.go('articleDetail', {id: article.id});
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
                headerText: 'Delete article',
                bodyText: 'Are you sure you want to delete the article ?'
            };

            PopupService.show(modalDefaults, modalOptions)
                .then(function (response) {
                    ArticlesService.removeArticle(vm.articleId)
                        .then(function (response) {
                            console.log("article deleted");
                            $state.go('articles');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
        };

        vm.doLike = function (boolFlag) {
            if (!vm.isAuthenticated) {
                Snackbar.show('Please sign in to like/unlike articles !!');
                return;
            } else if (vm.isSubmitted) {
                return;
            }
            vm.isSubmitted = true;

            var data = {};
            if (vm.article.liked === boolFlag) {
                data.liked = null;
            } else {
                data.liked = boolFlag;
            }

            ArticlesService.voteArticle(vm.articleId, data)
                .then(function (response) {
                    if (response.data.liked) {
                        Snackbar.show("Added to liked articles!");
                    }
                    Utility.likeUnlike(vm.article, response);
                    vm.isSubmitted = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        //@name activate
        //@desc Actions to be performed when the controller is instantiated
        function activate () {
            getArticle();
            getTagsList();

            vm.isAuthenticated = Authentication.isAuthenticated();
            vm.user = Authentication.fetchAuthenticatedUser();

            if (!vm.articleId) {
                getProfile();
            }

        }

        activate();

    }

})();
