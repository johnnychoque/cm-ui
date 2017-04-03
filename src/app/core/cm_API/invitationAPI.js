(function() {
    'use strict';

    angular.module('app.components')
        .factory('invitationAPI', ['Restangular', invitationAPI]);


    function invitationAPI(Restangular) {

        var service = {
            sendInvitations: sendInvitations,
            getInvitations: getInvitations
            //getParInvitations: getParInvitations,
            //updateInvitations: updateInvitations,
        };

        return service;

		/* */
        function sendInvitations(exp, emails, usernames, success_, fail_){
            var path = 'invitations/' + exp.experimentId;
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
        }

		/* */
        function getInvitations(id, success_, fail_){
            var path = 'invitations/' + id;
            Restangular.one(path).get().then(
                function (res){
					console.log(res.plain());
                    return success_(res.plain());
                },
                function (){
                    return fail_();
                });
        }

		/*
        function getParInvitations(success_, fail_){
            var path = 'par-invitations';
            Restangular.one(path).get().then(
                function (res){
                    return success_(res.plain());
                },
                function (){
                    return fail_();
                });
        }

        function updateInvitations (invs, success_, fail_) {
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
