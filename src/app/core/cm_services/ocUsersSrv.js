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
                var value = {};
				//console.log(users);
                //console.log('type of users ',typeof users, ' logitud ', users.lenght);
                console.log(users.lenght);
                var usersAux = JSON.parse(users); console.log(usersAux.length)
                
                for (var i=0; i<users.lenght; i++) {
                    value.username = users[i].username;
                    value.age = users[i].age;
                    value.interests = users[i].interests;
                    value.country = users[i].country;
                    users_.push(value);
                    console.log('users_[i] ',users_);
                }
                console.log('users_ ',users_);
				return users_;
            }

            function fail() {

            }
        }
		
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
