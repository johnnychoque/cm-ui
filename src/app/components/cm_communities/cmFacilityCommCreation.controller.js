(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmFacilityCommCreationController', cmFacilityCommCreationController);

    cmFacilityCommCreationController.$inject = ['$location', 'facilitySrv', 'alert', 'newCommunitySrv', '$scope', '$timeout', 'animation', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'managerSrv', 'ocUsersSrv', 'utilSrv'];

    function cmFacilityCommCreationController($location, facilitySrv, alert, newCommunitySrv, $scope, $timeout, animation, DTOptionsBuilder, DTColumnDefBuilder, managerSrv, ocUsersSrv, utilSrv) {
        var vm = this;
		vm.loadingChart = false;
		
		vm.rangeList = ['18 - 25', '26 - 35', '36 - 50', '50 - '];

		vm.communityName = '';
		vm.description = '';
		vm.keywords = '';
		
		vm.rangeSelected = [];
		vm.selected = [];
		vm.minAge = 0;
		vm.maxAge = 0;
		vm.selectedInterests = [];
		vm.selectAll = false;
		vm.toggleAll = toggleAll;
		vm.toggleOne = toggleOne;

		vm.params = {};

		vm.rangeSel = function (range) {
			switch (range) {
				case '18 - 25':
					vm.minAge = 18;
					vm.maxAge = 25;
					break;
				case '26 - 35':
					vm.minAge = 26;
					vm.maxAge = 35;
					break;
				case '36 - 50':
					vm.minAge = 36;
					vm.maxAge = 50;
					break;
				case '50 - ':
					vm.minAge = 50;
					vm.maxAge = 100;
					break;
			}
			console.log('min '+vm.minAge+' max '+vm.maxAge);
		};
		
		vm.applySel = function () {

			vm.params = {
					min : vm.minAge,
					max : vm.maxAge,
					p: vm.selectedInterests
			};
			
			//console.log(vm.params);
			var myDataPromise = ocUsersSrv.getOcUsers(vm.params);
			
			myDataPromise.then(
						function (result) {
							vm.rangeSelected = result;
							console.log(vm.rangeSelected);
							return myDataPromise;
						}
					);
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
				for (i=0; i<vm.rangeSelected.length; i++) {
					vm.selected.push(vm.rangeSelected[i].subscribedId);
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

		// subscribedId is defined from token in cm-api 
        vm.create = function() {
			vm.loadingChart = true;
			newCommunitySrv.flush();
			newCommunitySrv.setCommunityName(vm.communityName);
			newCommunitySrv.setCommunityId();
			newCommunitySrv.setDescription(vm.description);
			newCommunitySrv.setMembers(vm.selected);
			newCommunitySrv.setKeywords(vm.keywords);
			newCommunitySrv.setCriteria(vm.params);
			facilitySrv.newCommunity(
				newCommunitySrv.getCommunity(),
				creationSuccess,
				creationError
			);
        };
		
        function creationSuccess() {
			vm.loadingChart = false;
            alert.success('Community ' + vm.communityName.toUpperCase() + ' has been created');
			$location.path('/facilitycomms');
        }

        function creationError() {
			vm.loadingChart = false;
            alert.error('Error creating the community ' + vm.communityName.toUpperCase());
			$location.path('/facilitycomms');
        }

        vm.cancel = function() {
            $location.path('/facilitycomms');
        };
		
		//vm.interestsList = ['Mobility','Parking','Environment','Buses','Parks','Air quality', 'Culture','Shopping','Traffic','Beach'];
        vm.interestsList = utilSrv.getInterests();
        
        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        } 
    }
})();