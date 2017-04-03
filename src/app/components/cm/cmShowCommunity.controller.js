(function() {
    'use strict';

    angular.module('app.components')
        .controller('showCommunityController', showCommunityController);

    showCommunityController.$inject = ['community'];

    function showCommunityController(community) {
        var vm = this;
        vm.community = community;
        delete(vm.community.$$hashKey);
		delete(vm.community._id);
		delete(vm.community.__v);
		delete(vm.community.subscribedId);
		delete(vm.community.communityId);
		delete(vm.community.members);
        vm.getFancyJson = function() {
            return JSON.stringify(vm.community, null, 4);
        };
    }
})();