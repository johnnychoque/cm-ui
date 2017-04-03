(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmSiteCommController', cmSiteCommController);

    cmSiteCommController.$inject = ['$state', '$mdDialog', '$timeout', 'animation', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'siteSrv', 'alert', 'managerSrv'];

    function cmSiteCommController($state, $mdDialog, $timeout, animation, DTOptionsBuilder, DTColumnDefBuilder, siteSrv, alert, managerSrv) {
        var vm = this;
		vm.loadingChart = false;
		
        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage({
                "sLengthMenu": "Show _MENU_ communities",
            })
            .withOption('lengthMenu', [10, 20, 50]);

        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4).notSortable(),
			DTColumnDefBuilder.newColumnDef(5).notSortable()
        ];
		
		vm.communities = siteSrv.getCommunities();
		
		vm.communityId = "";
		vm.communityName = "";
		
		vm.currentManagerType = managerSrv.getCurrentManagerType();
		//managerSrv.setSiteManager('london');
		vm.currentSiteManager = managerSrv.getCurrentSiteManager().toUpperCase();
		
		vm.confirmRemove = function(ev, comm) {
            vm.communityId = comm.communityId;
			vm.communityName = comm.communityName;
            $mdDialog.show({
                locals: {
                    mdInfo: {
                        cancel: function() { $mdDialog.hide(); },
                        proceed: vm.remove,
                        title: 'You are removing a community',
                        info: 'By doing so all the information related to the community ' +
                            'will be lost',
                        question: 'Do you want to continue?'
                    }
                },
                controller: 'EpConfirmController as vm',
                templateUrl: 'app/components/cm/epConfirm.html',
                clickOutsideToClose: false
            });
        };

        vm.remove = function() {
            $mdDialog.hide();
            vm.loadingChart = true;
            siteSrv.removeCommunity(vm.communityId, RemovalSuccess, RemovalError);
        };

        function RemovalSuccess() {
            vm.loadingChart = false;
            alert.success('Community ' + vm.communityName.toUpperCase() + ' have been removed');
            vm.communities = siteSrv.getCommunities();
            vm.communityId = "";
			vm.communityName = "";
        }

        function RemovalError() {
            vm.loadingChart = false;
            alert.error('Removal of community ' + vm.communityName.toUpperCase() + ' was not correctly performed');
            vm.communities = siteSrv.getCommunities();
            vm.communityId = "";
			vm.communityName = "";
        } 
		
        vm.showCommunity = function(community) {
            $mdDialog.show({
                locals: { community: community },
                controller: 'showCommunityController as vm',
                templateUrl: 'app/components/cm/cmShowCommunity.html',
                clickOutsideToClose: true
            });
        };
		
        vm.newCommunity = function() {
            $state.go('layout.cm.siteCommCreation');
        };

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