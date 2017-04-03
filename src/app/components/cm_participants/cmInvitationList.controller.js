(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmInvitationListController', CmInvitationListController);

    CmInvitationListController.$inject = ['$state', '$timeout', 'animation', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'utilSrv', '$scope'];

    function CmInvitationListController($state, $timeout, animation, DTOptionsBuilder, DTColumnDefBuilder, utilSrv, $scope) {
        var vm = this;

		vm.invitations = [];
        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage({
                "sLengthMenu": "Show _MENU_ invitations",
            })
            .withOption('lengthMenu', [10, 20, 50]);

        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3)
        ];
		
		$scope.$on('ADD_USER', function(response) {
			// TODO: Filtrar usuarios repetidos. Los usuarios pueden pertenecer a varias comunidades
			//console.log('User selecction');
			vm.invitations = utilSrv.getUsers();
			console.log(JSON.stringify(vm.invitations));
		});
		
        vm.cancel = function() {
			utilSrv.deleteUsers();
			$state.go('layout.cm.participants.list');
        };

        vm.send = function() {
			
        };
		
        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();