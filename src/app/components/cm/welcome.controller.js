(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmWelcomeController', CmWelcomeController);

    CmWelcomeController.$inject = ['$mdDialog', '$rootScope'];

    function CmWelcomeController($mdDialog, $rootScope) {
        var vm = this;
        
		
        vm.showInfo = function() {
            $mdDialog.show({
                locals: {
                    mdInfo: {
                        proceed: function() { $mdDialog.hide(); },
                        title: 'Experiments Load failed',
                        info: 'Your experiments could not be loaded or your rights do not allow experiments creation. ' +
                            'Note that only Organicity experimenters are allowed to make use of the Experimenter Portal. ' +
                            'If you are an experimenter, please contact Organicity managers',
                    }
                },
                controller: 'CmErrorController as vm',
                templateUrl: 'app/components/cm/epError.html',
                clickOutsideToClose: false
            });

        };
        $rootScope.$on('experimentsFail', function() {
            vm.showInfo();
        }); 
    }
})();