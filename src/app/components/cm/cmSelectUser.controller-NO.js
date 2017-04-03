(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmSelectUserController', cmSelectUserController);

    cmSelectUserController.$inject = ['$state', '$mdDialog', '$rootScope', 'managerSrv'];

    function cmSelectUserController($state, $mdDialog, $rootScope, managerSrv) {
        var vm = this;
        
		vm.managerType = null;
		
		vm.selectUser = function() {
			managerSrv.setManagersSelected(vm.managersSelected);
			managerSrv.setSitesSelected(vm.sitesSelected);
			$state.go('layout.cm.initialView');
		};
		
		
		vm.manager = {};
		vm.manager.experimenter = false;
		vm.manager.site = false;
		vm.manager.facility = false;
		
		vm.site = {};
		vm.site.london = false;
		vm.site.santander = false;
		vm.site.aarhus = false;
		
		vm.managersSelected = [];
		vm.sitesSelected = [];

		vm.selectEnabled = false;
		
		vm.toggle = function (item, list) {
			var idx = list.indexOf(item);
			if (idx > -1) {
				list.splice(idx, 1);
			}
			else {
				list.push(item);
			}
			if (vm.managersSelected.indexOf('site') == -1) {
				// Eliminar todos los elementos del array
				vm.sitesSelected.splice(0,vm.sitesSelected.length);
			}
			vm.selectEnabled = vm.minSelected();
		};
		
		vm.minSelected = function() {
			var enabled = false;
			
			if (vm.managersSelected.length !== 0) {
				if (vm.managersSelected.indexOf('site') > -1) {
					if (vm.sitesSelected.length !== 0) {
						enabled = true;
					}
					else {
						enabled = false;
					}
				}
				else {
					enabled = true;
				}
			}
			return (enabled);
		};
	  
    }
})();