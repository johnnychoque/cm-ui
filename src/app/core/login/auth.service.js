(function() {
    'use strict';

    angular.module('app.components')
        .factory('auth', auth);

    auth.$inject = ['$http', '$location', '$rootScope', '$state', '$timeout', '$window', 'accountsAPI', 'alert', 'AuthUser', 'jwtHelper'];

    function auth($http, $location, $rootScope, $state, $timeout, $window, accountsAPI, alert, AuthUser, jwtHelper) {

        var user = {
            token: null,
            data: null
        };

        //wait until http interceptor is added to Restangular
        $timeout(function() {
            initialize();
        }, 100);

        var service = {
            isAuth: isAuth,
            getCurrentUser: getCurrentUser,
            getCurrentUserid: getCurrentUserid,
			getRolesUser: getRolesUser,
            login: login,
            logout: logout,
            callback: callback,
            getToken: getToken
        };
        return service;

        //////////////////////////


        function initialize() {
            setCurrentUser('appLoad');
        }
        //run on app initialization so that we can keep auth across different sessions
        function setCurrentUser(time) {
            user.token = $window.localStorage.getItem('organicity.token') && JSON.parse($window.localStorage.getItem('organicity.token'));
			//console.log('token');
			//console.log(user.token);
            // Check for user properties
            user.data = $window.localStorage.getItem('organicity.data') && new AuthUser(JSON.parse($window.localStorage.getItem('organicity.data')));
			console.log('data');
			console.log(user.data);
            if (!user.token) {
                return;
            }
            var data = JSON.parse(getCurrentUserInfo());
            $window.localStorage.setItem('organicity.data', JSON.stringify(data));
            var newUser = new AuthUser(data);
            //check sensitive information
            if (user.data && user.data.role !== newUser.role) {
                user.data = newUser;
                $location.path('/');
            }
            user.data = newUser;

            if (time && time === 'appLoad') {
                //wait until navbar is loaded to emit event
                $timeout(function() {
                    $rootScope.$broadcast('loggedIn', { time: 'appLoad' });
                }, 3000);
            } else {
                // used for login
                $state.reload();
                $timeout(function() {
                    alert.success('Login was successful');
                    $rootScope.$broadcast('loggedIn', {});
                }, 2000);
            }
        }

        function getCurrentUser() {
            return user;
        }

        function getCurrentUserid() {
            return user.data.id;
        }
		
		function getRolesUser() {
			return user.data.role;
		}

        function isAuth() {
            try {
                var token = $window.localStorage.getItem('organicity.token');
                var date = jwtHelper.getTokenExpirationDate(token);
				
                if (jwtHelper.isTokenExpired(token)) {
                    return login();
                }else {
                    return !!$window.localStorage.getItem('organicity.token');     
                }
            } catch (e) {
               return !!$window.localStorage.getItem('organicity.token');
            }
        }

        function login() { 
			//window.location.href = "https://accounts.organicity.eu/realms/organicity/protocol/openid-connect/auth/?response_type=token&client_id=community-management-dev&redirect_uri=http://ec2-35-167-187-240.us-west-2.compute.amazonaws.com:8050/&scope=&state=";
			window.location.href = "https://accounts.organicity.eu/realms/organicity/protocol/openid-connect/auth/?response_type=token&client_id=community-management-dev&redirect_uri=http://localhost:8080/&scope=&state=";
        }

        function callback(ret) {

            try {
                var token = $location.$$hash.split('&')[1].slice(13);
                window.localStorage.setItem('organicity.token', JSON.stringify(token));
                var jwt_decoded = jwtHelper.decodeToken(token);
                window.localStorage.setItem('organicity.data', JSON.stringify({
                    id: jwt_decoded.sub,
                    uuid: jwt_decoded.sub,
                    role: jwt_decoded.realm_access.roles,
                    name: jwt_decoded.name,
                    username: jwt_decoded.preferred_username,
                    avatar: "",
                    url: "",
                    location: { city: "null", country: "null", country_code: "null" },
                    email: jwt_decoded.email,
                }));

                $timeout(function() {
                    return $location.path('/initialview');
                }, 100);
            } catch (e) {
                return $location.path('/welcome');
            }

        }

        function logout() {
            $window.localStorage.removeItem('organicity.token');
            $window.localStorage.removeItem('organicity.data');
            return $location.path('/welcome');
        }

        function getCurrentUserInfo() {
            var token = $window.localStorage.getItem('organicity.token');
            var jwt_decoded = jwtHelper.decodeToken(token);
            if (jwtHelper.isTokenExpired(token)) {
                return login();
            } else {
                return JSON.stringify({
                    id: jwt_decoded.sub,
                    uuid: jwt_decoded.sub,
                    role: jwt_decoded.realm_access.roles,
                    name: jwt_decoded.name,
                    username: jwt_decoded.preferred_username,
                    avatar: "",
                    url: "",
                    location: { city: "null", country: "null", country_code: "null" },
                    email: jwt_decoded.email,
                });
            }
        }

        function getToken() {
            var expired = jwtHelper.isTokenExpired(user.token);
            if (!expired) {
                return user.token;
            } else {
                return $location.path('/welcome');
            }

        }
    }
})();