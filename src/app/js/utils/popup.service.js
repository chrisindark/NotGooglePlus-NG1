angular
    .module('notgoogleplus.services')
    .service('PopupService', PopupService);

PopupService.$inject = ['$uibModal'];

function PopupService($uibModal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'app/js/utils/popup-modal.html',
        windowClass: 'my-popup-modal'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this._show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            TempModalController.$inject = ['$scope', '$uibModalInstance'];

            function TempModalController($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            }
            tempModalDefaults.controller = TempModalController;
        }

        return $uibModal.open(tempModalDefaults).result;
    };

    this.show = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults){
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return this._show(customModalDefaults, customModalOptions);
    };

}
