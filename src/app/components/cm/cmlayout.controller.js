(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmLayoutController', CmLayoutController);

    CmLayoutController.$inject = ['$scope','$state', 'EpDictionaries', '$window', 'managerSrv', 'auth'];

    function CmLayoutController($scope, $state, EpDictionaries, $window, managerSrv, auth) {
        var vm = this;
		
		// Roles could be ['administrator','experimenter','site-manager']
		// We assume that site manager role is 'site-manager'
		var roles = auth.getRolesUser();

		// ---- Managers ------
		vm.managersSelected = [];
		
		if (roles.indexOf('experimenter') > -1) {
			vm.managersSelected.push('experimenter');
			managerSrv.setCurrentExperimenterId(auth.getCurrentUserid());
		}
		
		if (roles.indexOf('administrator') > -1) {
			vm.managersSelected.push('facility');
		}
		
		if (roles.indexOf('site-manager') > -1) {
			vm.managersSelected.push('site');
			vm.sitesSelected = ['santander', 'london', 'aarhus']; // HARDCODED
		}
		
		managerSrv.setManagersSelected(vm.managersSelected);
		managerSrv.setSitesSelected(vm.sitesSelected);
		
		// ---- Communities ----
        vm.isExperimenter = function (){
        	return (managerSrv.isExperimenter());
        };
		
        vm.showExperComms = function (){
			managerSrv.setCurrentManagerType('experimenter');
        	$state.go('layout.cm.experComms');
        };
		
        vm.isSiteManager = function (site){
        	return (managerSrv.isSiteManager() && managerSrv.isSiteManagerOf(site));
        };
		
        vm.showSiteComms = function (site){
			managerSrv.setCurrentManagerType('site'); 
			switch(site) {
				case 'london':
					managerSrv.setCurrentSiteManager('london');
					$state.go('layout.cm.londonSiteComms');
				break;
				case 'santander':
					managerSrv.setCurrentSiteManager('santander');
					$state.go('layout.cm.santanderSiteComms');
				break;
				case 'aarhus':
					managerSrv.setCurrentSiteManager('aarhus');
					$state.go('layout.cm.aarhusSiteComms');
				break;
			}
        };

        vm.isFacilityManager = function (){
        	return (managerSrv.isFacilityManager());
        };

        vm.showFacilityComms = function (){
			managerSrv.setCurrentManagerType('facility');
        	$state.go('layout.cm.facilityComms');
        };
		// ---- Communities ----
		
        vm.toParticipants = function() {
            $state.go('layout.cm.participants.list');
        };
		
        vm.toMetrics = function() {
            $state.go('layout.cm.metrics.list');
        };

        vm.toExpPortal = function() {
            $state.go('layout.cm.expPortal');
        };
		
        vm.callHref = function (ref) {
            $window.open(ref, '_blank');
        };

    }
})();