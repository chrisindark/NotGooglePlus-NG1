(function () {
    angular
        .module('notgoogleplus.services')
        .constant('SQUARE_CREDENTIALS', {
            'APPLICATION_ID': 'sq0idp-bPSj3zE3tb3OzCWtfaJUxw'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$scope', 'SQUARE_CREDENTIALS', 'Snackbar'];

    function PaymentController ($scope, SQUARE_CREDENTIALS, Snackbar) {
        var vm = this;

        $scope.isPaymentSuccess = false

        // disable payment button
        $scope.isProcessing = true;

        function activate () {
            console.log('payment controller loaded');
            $scope.paymentForm.build();
        }

        vm.errors = {};

        $scope.data = {
            'user': {},
            'card': {}
        };

        vm.paymentConfirm = function () {
            $scope.isProcessing = true;
            $scope.paymentForm.requestCardNonce();
        };

        $scope.paymentForm = new SqPaymentForm({
            applicationId: SQUARE_CREDENTIALS.APPLICATION_ID,
            inputClass: 'form-control',
            inputStyles: [
                {}
            ],
            cardName: {
                elementId: 'sq-card-name',
                placeholder: 'ex. notgoogleplus'
            },
            cardNumber: {
                elementId: 'sq-card-number',
                placeholder: 'ex. 0000 0000 0000 0000'
            },
            cvv: {
                elementId: 'sq-cvv',
                placeholder: 'CVV'
            },
            expirationDate: {
                elementId: 'sq-expiration-date',
                placeholder: 'MM/YY'
            },
            postalCode: {
                elementId: 'sq-postal-code',
                placeholder: '94110'
            },
            callbacks: {
                cardNonceResponseReceived: function (errors, nonce, cardData) {
                    if (errors) {
                        $scope.card_errors = errors
                        $scope.isProcessing = false;
                        $scope.$apply(); // required since this is not an angular function
                    } else {
                        $scope.card_errors = undefined;
                        $scope.isProcessing = false;
                        $scope.chargeCardWithNonce(nonce);
                        $scope.$apply(); // required since this is not an angular function
                    }
                },
                unsupportedBrowserDetected: function () {
                    // Alert the buyer
                    console.log('unsupportedBrowserDetected');
                },
                // Fill in these cases to respond to various events that can occur while a
                // buyer is using the payment form.
                inputEventReceived: function (inputEvent) {
                    switch (inputEvent.eventType) {
                        case 'focusClassAdded':
                            // Handle as desired
                            break;
                        case 'focusClassRemoved':
                            // Handle as desired
                            break;
                        case 'errorClassAdded':
                            // Handle as desired
                            vm.errors[inputEvent.elementId] = true;
                            break;
                        case 'errorClassRemoved':
                            // Handle as desired
                            vm.errors[inputEvent.elementId] = undefined;
                            break;
                        case 'cardBrandChanged':
                            // Handle as desired
                            $scope.data.card.type = inputEvent.cardBrand === 'unknown'
                                ? 'Card Type'
                                : inputEvent.cardBrand;
                            $scope.$apply(); // required since this is not an angular function
                            break;
                        case 'postalCodeChanged':
                            // Handle as desired
                            break;
                    }
                },
                paymentFormLoaded: function() {
                    // Fill in this callback to perform actions after the payment form is
                    // done loading (such as setting the postal code field programmatically).
                    // paymentForm.setPostalCode('94103');
                    $scope.data.card.type = 'Card Type';
                    $scope.isProcessing = false;
                    $scope.$apply(); // required since this is not an angular function
                }
            }
        });

        $scope.chargeCardWithNonce = function (nonce) {
            Snackbar.show(nonce);
        };

        activate();

    }

})();
