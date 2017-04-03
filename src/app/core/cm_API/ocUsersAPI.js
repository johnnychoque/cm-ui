(function() {
    'use strict';

    angular.module('app.components')
        .factory('ocUsersAPI', ['$log', 'Restangular', ocUsersAPI]);


    function ocUsersAPI($log, Restangular) {

        var service = {
            getOcUsers: getOcUsers,
			getUsersCommunity: getUsersCommunity,
			getOneOcUser: getOneOcUser
        };

        return service;

        function getOcUsers(params, success_, fail_) {
            var path = 'ocusers/';
            return Restangular.one(path)
					.get(params)
					.then(
						function(res) {
							return success_(res);
						},
						function(res) {
							return fail_(res);
						}
					);
        }

        function getUsersCommunity(params, success_, fail_) {
            var path = 'ocusers/community';
            return Restangular.one(path)
					.get(params)
					.then(
						function(res) {
							return success_(res);
						},
						function(res) {
							return fail_(res);
						}
					);
        }
		
        function getOneOcUser(id, success_, fail_) {
            var path = 'ocusers/' + id;
            return Restangular.one(path)
					.get()
					.then(
						function(res) {
							return success_(res);
						},
						function(res) {
							return fail_(res);
						}
					);
        }
		
	}
})();