(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmParticipantListController', CmParticipantListController);

    CmParticipantListController.$inject = ['$state', '$timeout', 'animation', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'invitationSrv', 'participantSrv', 'utilSrv'];

    function CmParticipantListController($state, $timeout, animation, DTOptionsBuilder, DTColumnDefBuilder, invitationSrv, participantSrv, utilSrv) {
        var vm = this;

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage({
                "sLengthMenu": "Show _MENU_ participants",
            })
            .withOption('lengthMenu', [10, 20, 50]);

        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2)
        ];
			
		vm.participants = participantSrv.getParticipants();
		
        vm.NewInvitation = function() {
            $state.go('layout.cm.participants.invitations');
        };
        
        vm.showMetrics = function(participant) {
            console.log(participant);
            utilSrv.setPartSelected(participant);
            $state.go('layout.cm.participants.metrics');
        };
		
        vm.dtOptionsPending = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage({
                "sLengthMenu": "Show _MENU_ invitations",
            })
            .withOption('lengthMenu', [10, 20, 50]);

        vm.dtColumnDefsPending = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2)
        ];
			
		vm.invsPending = invitationSrv.getInvitations();
		
        vm.readableDate = function (str) {
            var date = new Date(str);
            return date.toString().substring(0, 15);
        };
		
        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();