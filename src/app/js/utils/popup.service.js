angular
    .module('notgoogleplus.services')
    .service('PopupService', PopupService);

PopupService.$inject = ['$uibModal'];

function PopupService($uibModal) {
    var self = this;

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

    var _show = function (customModalDefaults, customModalOptions) {
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

        return $uibModal.open(tempModalDefaults); //$uibModal.open(tempModalDefaults).result;
    };

    var _open = function (modalInstance) {
        return modalInstance.opened;
    };

    var _result = function (modalInstance) {
        return modalInstance.result;
    };

    var _render = function (modalInstance) {
        return modalInstance.rendered;
    };

    // function used to return a promise that is
    // resolved when a modal gets opened after downloading
    // content's template and resolving all variables.
    this.open = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults){
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return _open(_show(customModalDefaults, customModalOptions));
    };

    // function used to return a promise that is
    // resolved when a modal is closed and rejected when a modal is dismissed.
    this.show = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults){
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return _result(_show(customModalDefaults, customModalOptions));
    };

    this.render = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults){
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return _render(_show(customModalDefaults, customModalOptions));
    }

}
