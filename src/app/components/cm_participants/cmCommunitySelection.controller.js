(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmCommunitySelectionController', CmCommunitySelectionController);

    CmCommunitySelectionController.$inject = ['alert', '$q', '$state', '$timeout', 'animation', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'experimenterSrv', 'ocUsersSrv', 'invitationSrv'];

    function CmCommunitySelectionController(alert, $q, $state, $timeout, animation, DTOptionsBuilder, DTColumnDefBuilder, experimenterSrv, ocUsersSrv, invitationSrv) {
        var vm = this;
		
		vm.communities = experimenterSrv.getCommunities();
		
		vm.communityId = "";
		vm.currCommunity = null;
		vm.selected = [];
		vm.commSelected = [];
		vm.selectAll = false;
		vm.toggleAll = toggleAll;
		vm.toggleOne = toggleOne;
		vm.description = "";
		vm.criteria = "";
		vm.showInfo = false;

        vm.commSel = function(comm) {

			var promises = [];
			var resultSel = [];
			
			vm.description = comm.description;
			vm.criteria = comm.criteria;
			vm.showInfo = true;
			
			function lastTask(results){
				for (var i=0; i<results.length; i++) {
					resultSel.push(results[i]);
				}
				vm.commSelected = resultSel;
				console.log(JSON.stringify(vm.commSelected));
			}

			angular.forEach(comm.members, function(id){
				promises.push(ocUsersSrv.getOneOcUser(id));
			});

			$q.all(promises).then(lastTask);

        };

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage({
                "sLengthMenu": "Show _MENU_ invitations",
            })
            .withOption('lengthMenu', [5, 10, 15]); //[10, 20, 50]

        vm.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0).notSortable(),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4)
        ];
		
		
		
		function toggleAll () {
			vm.selectAll = !vm.selectAll;
			//console.log(vm.selectAll);
			if (vm.selectAll) {
				vm.selected.splice(0,vm.selected.length);
				var i=0;
				for (i=0; i<vm.commSelected.length; i++) {
					vm.selected.push(vm.commSelected[i].subscribedId);
				}
			} else {
				vm.selected.splice(0,vm.selected.length);
			}
			//console.log(vm.selected);
		}
		
		function toggleOne (user,status) {
			//console.log(user.subscribedId+' '+status);
			if (status === 'selected') {
				vm.selected.push(user.subscribedId);
			} else {
				var i = vm.selected.indexOf(user.subscribedId);
				if(i != -1) {
					vm.selected.splice(i, 1);
				}
			}
			//console.log(vm.selected);
		}
		
		vm.isSelected = function(user) {
			return (vm.selected.indexOf(user.subscribedId) != -1);
		};

		vm.sendInvitations = function () {
            vm.loadingChart = true;
			// HARDCODED expInfo experimentId: '20203030'
			vm.expInfo = {
				experimentId: '20203030',
				description: 'Esta es la descripcion del experimento',
				name: 'Experimento con ciudadanos'
			};
			// Get emails and usernames of users selected
			vm.emails = [];
			vm.usernames = [];
			for (var i = 0; i < vm.selected.length; i++) {
				// Find obj by subscribedId in vm.selected array
				var obj = vm.commSelected.filter(function ( obj ) {
								return obj.subscribedId === vm.selected[i];
							})[0];
				vm.emails.push(obj.email);
				vm.usernames.push(obj.username);
			}
			console.log(vm.emails);
			console.log(vm.emails.join());
            invitationSrv.sendInvitations(vm.expInfo, vm.emails.join(), vm.usernames.join(),
                function (){
                    vm.loadingChart = false;
                    alert.success('Invitations sent');
                    $state.go($state.current, { onEdit: false }, { reload: true });
                },
                function(){
                    alert.error('Invitations could not be sent. Please, check that the emails addresses are correct.');
                    vm.loadingChart = false;
                });

			vm.commSelected = [];
			vm.selected = [];
			vm.currCommunity = null;
			vm.showInfo = false;
			vm.selectAll = false;
			$state.go('layout.cm.participants.list');
		};

		vm.cancel = function () {
			vm.commSelected = [];
			vm.selected = [];
			vm.currCommunity = null;
			vm.showInfo = false;
			vm.selectAll = false;
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