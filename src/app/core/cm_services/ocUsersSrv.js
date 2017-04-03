(function() {
    'use strict';

    angular.module('app.components')
        .factory('ocUsersSrv', ['Restangular', '$log', 'ocUsersAPI', 'alert', ocUsersSrv]);

    function ocUsersSrv(Restangular, $log, ocUsersAPI, alert) {

        var ocUsers = [];

        var service = {
			//getUsersCommunity: getUsersCommunity
			//loadOcUsers: loadOcUsers
			getOcUsers: getOcUsers,
			getOneOcUser: getOneOcUser
        };

        return service;

		
		/*
        function getOcUsers() {
            return ocUsers;
        }
		
        function loadOcUsers(success_, fail_) {
            ocUsersAPI.getOcUsers(success, fail);

            function success(users) {
				ocUsers = users;
				success_();
            }

            function fail() {
                fail_();
            }
        }*/
		
        function getOcUsers(params) {
            return ocUsersAPI.getOcUsers(params, success, fail);

            function success(users) {
				console.log(users);
				return users;
            }

            function fail() {

            }
        }
		/*
        function getUsersCommunity(params) {
            return ocUsersAPI.getUsersCommunity(params, success, fail);

            function success(users) {
				console.log(users);
				return users;
            }

            function fail() {

            }
			
        }*/
		
        function getOneOcUser(id) {
            return ocUsersAPI.getOneOcUser(id, success, fail);

            function success(user) {
				console.log(user);
				return user;
            }

            function fail() {

            }
        }
		
    }

})();
/*
    var myDataPromise = myService.getData(); 
		myDataPromise.then(
			function(result) { 
			 $scope.data = result; 
			 console.log("data.name"+$scope.data.name); 
			}
		); 
		
        function getOcUsers(params) {
            ocUsersAPI.getOcUsers(params, success, fail);

            function success(users) {
				console.log(users);
				return users;
            }

            function fail() {

            }
        }
		
        function getOcUsers(params) {
            ocUsersAPI.getOcUsers(params, success, fail)
			.then(
				function success(users) {
					console.log(users);
					return users;
				},
				function fail() {

				}			
			);
        }
*/