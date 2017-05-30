angular
    .module('notgoogleplus.controllers')
    .controller('ArticleDetailController', ArticleDetailController);

ArticleDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams',
    'Authentication', 'ArticlesService', 'ProfileService', 'MarkedService',
    'PopupService'];

//@namespace ArticleDetailController
function ArticleDetailController($rootScope, $scope, $state, $stateParams,
                              Authentication, ArticlesService, ProfileService,
                              MarkedService, PopupService) {
    var vm = this;

    vm.articleId = $stateParams.id;
    vm.article = undefined;
    vm.formTitle = undefined;
    vm.editMode = undefined;
    vm.previewArticle = false;

    function getArticle() {
        if (vm.articleId) {
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

    function isOwner() {
        Authentication.isOwner(vm.article.user.username)
            .then(function () {
                vm.isOwner = true;
                vm.editMode = false;
                vm.formTitle = 'Edit Article';
            });
    }

    // Function called to get authenticated user's account
    // and profile object when new article is created
    function getProfile() {
        vm.user = Authentication.fetchAuthenticatedUser();
        ProfileService.getProfile(vm.user.username)
            .then(function(response) {
                vm.profile = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    //@name submit
    //@desc Create a new Article
    vm.submit = function () {
        if (vm.articleId) {
            ArticlesService.updateArticle(vm.articleId, vm.article)
                .then(function (response) {
                    vm.errors = {};
                    vm.editMode = false;
                    vm.article = response.data;
                    console.log("article updated");
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        } else {
            ArticlesService.createArticle(vm.article)
                .then(function (response) {
                    vm.errors = {};
                    $state.go('articleDetail', {id: response.data.id});
                    console.log("article created");
                    // $rootScope.$emit('article.created', response.data);
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        }
    };

    vm.addTag = function() {
        if (!vm.article.tags.includes(vm.tagField)) {
            vm.article.tagList.push(vm.tagField);
            vm.tagField = '';
        }
    };

    // vm.removeTag(tagName) {
    //     vm.article.tagList = vm.article.tagList.filter((slug) => slug != tagName);
    // }

    vm.markdown = function(content) {
        return content
            ? MarkedService.markdown(content)
            : undefined;
    };

    vm.removeArticle = function () {
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

    var deregisterEvent = $rootScope.$on('file.uploaded', function(event, file) {
        console.log("file event caught");
    });

    $scope.$on('$destroy', deregisterEvent);

    //@name activate
    //@desc Actions to be performed when the controller is instantiated
    function activate() {
        getArticle();
        if (!vm.articleId) {
            getProfile();
        }
    }

    activate();

}
