(function() {
    'use strict';

    angular.module('app.components')
        .factory('participantAPI', ['Restangular', participantAPI]);


    function participantAPI(Restangular) {

        var service = {
            //sendParticipants: sendParticipants,
            getParticipants: getParticipants
            //getParParticipants: getParParticipants,
            //updateParticipants: updateParticipants,
        };

        return service;

		/*
        function sendParticipants(exp, emails, usernames, success_, fail_){
            var path = 'participants/' + exp.experimentId;
            Restangular.one(path).customPOST({
                emails: emails,
				usernames: usernames,
                description: exp.description,
                name: exp.name
            }).then(
                function (){
                    return success_();
                },
                function (){
                    return fail_();
                });
        }*/

		/*****

		******/
        function getParticipants(id, success_, fail_){
            var path = 'participants/' + id;
			console.log('getParticipants');
            Restangular.one(path).get().then(
                function (res){
					console.log(res);
                    return success_(res.plain());
                },
                function (){
					console.log('getParticipants ERROR');
                    return fail_();
                });
        }

		/*
        function getParParticipants(success_, fail_){
            var path = 'par-invitations';
            Restangular.one(path).get().then(
                function (res){
                    return success_(res.plain());
                },
                function (){
                    return fail_();
                });
        }

        function updateParticipants (invs, success_, fail_) {
            var path = 'par-invitations';
            Restangular.one(path).customPUT(invs).then(
                function () {
                    success_();
                }, function () {
                    fail_();
                });
        }*/

    }
})();
