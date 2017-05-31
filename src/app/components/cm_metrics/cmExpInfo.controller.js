(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmExpInfoController', cmExpInfoController);

    cmExpInfoController.$inject = ['$timeout', 'animation', 'managerSrv'];

    function cmExpInfoController($timeout, animation, managerSrv) {
        var vm = this;
		
		vm.mainExperimenterId = managerSrv.getCurrentExperimenterId();
		vm.experimentId = managerSrv.getCurrentExperimentId(); 
		
        ///////////////////////
        vm.asset = {
            name: 'uno',
            description: 'this is an experiment'
        };

        initialize();

        //////////////////

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();