(function() {
    'use strict';

    angular.module('app.components')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$state', 'auth', 'animation', '$timeout'];

    function LayoutController($state, auth, animation, $timeout) {
        var vm = this;

        
        vm.logout = logout;
        vm.login = login;
		
		/*
		vm.loggedIn = null;
		
        function logout() {
            //console.log('logout');
			vm.loggedIn = false;
			$state.go('layout.welcome');
        }

        vm.isLoggedin = function () {
            return vm.loggedIn;
        };

        function login() {
            //console.log('login');
			vm.loggedIn = true;
			//$state.go('layout.cm.experComms');
			$state.go('layout.selectuser');
        } */
		
		
        initialize(); // NO BORRAR SINO NO FUNCIONA

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
                if (auth.isAuth()) {
            
                    vm.currentUser = auth.getCurrentUser().data;
                    vm.hello = 'Hello, ' + vm.currentUser.username;
                }
            }, 500);
        }

		
        function logout() {
            auth.logout();
        }

        vm.isLoggedin = function () {
            return auth.isAuth();
        };

        function login() {
            auth.login();
        }
    }
})();