(function() {
    'use strict';

    angular.module('app.components')
        .controller('CmInvitationSelectionController', CmInvitationSelectionController);

    CmInvitationSelectionController.$inject = ['$timeout', 'animation'];

    function CmInvitationSelectionController($timeout, animation) {
        var vm = this;

        initialize();

        //////////////////

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();