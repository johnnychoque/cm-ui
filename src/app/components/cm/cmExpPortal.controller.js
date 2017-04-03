(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmExpPortal', cmExpPortal);

    cmExpPortal.$inject = ['$timeout', 'animation'];

    function cmExpPortal($timeout, animation) {
        var vm = this;

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