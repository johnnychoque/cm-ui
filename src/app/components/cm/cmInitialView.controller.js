(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmInitialViewController', cmInitialViewController);

    cmInitialViewController.$inject = ['$state', '$mdDialog', '$rootScope', 'managerSrv'];

    function cmInitialViewController($state, $mdDialog, $rootScope, managerSrv) {
        var vm = this;
		
		vm.managersSelected = managerSrv.getManagersSelected();
		vm.sitesSelected = managerSrv.getSitesSelected();
		vm.IsSiteManager = managerSrv.isSiteManager();
		
    }
})();