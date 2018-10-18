(function () {
    angular
        .module('notgoogleplus.services')
        .service('SeoService', SeoService);

    SeoService.$inject = ['$q', '$rootScope'];

    function SeoService($q, $rootScope) {
        var vm = this;

        this.title = 'Notgoogleplus';
        this.description = 'description';

        this.getTitle = function () {
            var deferred = $q.defer();

            deferred.resolve(vm.title);
            return deferred.promise;
        };

        this.getDescription = function () {
            var deferred = $q.defer();

            deferred.resolve(vm.description);
            return deferred.promise;
        };

        this.setTitle = function (title) {
            var deferred = $q.defer();
            vm.title = title;
            $rootScope.$broadcast('MetaTitleChange');

            deferred.resolve();
            return deferred.promise;
        };

        this.setDescription = function (desc) {
            var deferred = $q.defer();
            vm.description = desc;
            $rootScope.$broadcast('MetaDescriptionChange');

            deferred.resolve();
            return deferred.promise;
        };
    }

})();
