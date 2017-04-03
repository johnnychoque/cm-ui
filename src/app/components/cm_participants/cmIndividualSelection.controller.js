(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmIndividualSelectionController', CmIndividualSelectionController);

    CmIndividualSelectionController.$inject = ['alert', '$state', '$timeout', 'animation', 'invitationSrv'];

    function CmIndividualSelectionController(alert, $state, $timeout, animation, invitationSrv) {
        var vm = this;

		vm.participantEmails = ''; 

		function extractEmails (emails)
		{
			/* Input: string de emails separados por ',' ';' o espacios
			pepe@gmail.com;duda@gmail.com,jojo@khaha.op nsns@ggk.sd
			Devuelve un arrays de emails
			[ 'pepe@gmail.com', 'duda@gmail.com', 'jojo@khaha.op', 'nsns@ggk.sd' ]
			*/
			return emails.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		}

		vm.sendInvitations = function () {
            vm.loadingChart = true;
			// HARDCODED expInfo experimentId: '20203030'
			vm.expInfo = {
				experimentId: '20203030',
				description: 'Esta es la descripcion del experimento',
				name: 'Experimento con ciudadanos'
			};
			
			//vm.emails = extractEmails(vm.userEmails);
			//console.log(vm.emails);
			
            invitationSrv.sendInvitations(vm.expInfo, vm.userEmails, '',
                function (){
                    vm.loadingChart = false;
                    alert.success('Invitations sent');
                    $state.go($state.current, { onEdit: false }, { reload: true });
                },
                function(){
                    alert.error('Invitations could not be sent. Please, check that the emails addresses are correct.');
                    vm.loadingChart = false;
                });

			$state.go('layout.cm.participants.list');
		};

		vm.cancel = function () {
			$state.go('layout.cm.participants.list');
		};
		
        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();