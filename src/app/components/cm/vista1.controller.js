(function() {
    'use strict';

    angular.module('app.components')
        .controller('Vista1Controller', Vista1Controller);

    Vista1Controller.$inject = ['$timeout', 'animation'];

    function Vista1Controller($timeout, animation) {
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