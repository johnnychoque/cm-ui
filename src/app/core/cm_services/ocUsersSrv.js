(function() {
    'use strict';

    angular.module('app.components')
        .factory('ocUsersSrv', ['Restangular', '$log', 'ocUsersAPI', 'alert', ocUsersSrv]);

    function ocUsersSrv(Restangular, $log, ocUsersAPI, alert) {

        var ocUsers = [];

        var service = {
			getOcUsers: getOcUsers,
			getOneOcUser: getOneOcUser
        };

        return service;

        function getOcUsers(params) {
            return ocUsersAPI.getOcUsers(params, success, fail);

            function success(users) {
                var users_ = [];
                for (var i=0; i<Object.keys(users).length; i++) {
                    var value = new Object();
                    value.subscribedId = users[i].sub;
                    value.username = users[i].username;
                    value.age = users[i].age;
                    value.interests = users[i].interests;
                    value.country = users[i].country;
                    users_.push(value);
                }
				return users_;
            }

            function fail() {

            }
        }
		
        function getOneOcUser(id) {
            return ocUsersAPI.getOneOcUser(id, success, fail);

            function success(user) {
                var user_ = {};
                user_.subscribedId = user.sub;
                user_.username = user.username;
                user_.age = user.age;
                user_.interests = user.interests;
                user_.country = user.country;
                user_.email = user.email;
				console.log(user_);
				return user_;
            }

            function fail() {

            }
        }
		
    }

})();
