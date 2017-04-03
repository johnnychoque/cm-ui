(function() {
    'use strict';

    angular.module('app.components')
        .factory('facilityCommunityAPI', ['$log', 'Restangular', facilityCommunityAPI]);


    function facilityCommunityAPI($log, Restangular) {

        var service = {
            getCommunities: getCommunities,
            newCommunity: newCommunity,
            removeCommunity: removeCommunity
			/*
            getExperiment: getExperiment,
            updateExperiment: updateExperiment,
            addfacility: addfacility,
            sendInvitations: sendInvitations,
            getInvitations: getInvitations,
            getParInvitations: getParInvitations,
            updateInvitations: updateInvitations,
            leaveExperiment: leaveExperiment
			*/
        };

        return service;

        function getCommunities(success_, fail_) {
            var path = 'community/facility';
            Restangular.one(path).get().then(
                function(res) {
                    return success_(res);
                },
                function(res) {
                    return fail_(res);
                });

        }

        function newCommunity(info, success_, fail_) {
            var path = 'community/facility';
            Restangular.one(path).customPOST(info).then(
                function(res) {
                    return success_(res);
                },
                function(res) {
					//console.log("NEW COMMUNITY FAIL "+res);
                    return fail_(res);
                });
        }

        function removeCommunity(id, success_, fail_) {
            var path = 'community/facility/' + id;
            Restangular.one(path).remove().then(
                function(res) {
                    return success_();
                },
                function(res) {
                    return fail_();
                });
        }
		/*
        function getExperiment(id, success_, fail_) {
            var path = 'experiments/' + id;
            Restangular.one(path).get().then(
                function(res) {
                    return success_(res);
                },
                function() {
                    return fail_();
                });
        }

        function updateExperiment(id, info, success_, fail_) {
            var path = 'experiments/' + id;
            Restangular.one(path).customPUT(info).then(
                function(res) {
                    return success_(res);
                },
                function() {
                    return fail_();
                });
        }

        function addfacility(id, email, success_, fail_){
            var path = 'experiments/addfacility/' + id + '/' + email;
            Restangular.one(path).customPOST().then(
                function (){
                    return success_();
                },
                function (){
                    return fail_();
                });
        }

        function sendInvitations(exp, emails, message, success_, fail_){
            var path = 'invitations/' + exp.experimentId;
            Restangular.one(path).customPOST({
                emails: emails,
                message: message,
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

        function getInvitations(id, success_, fail_){
            var path = 'invitations/' + id;
            Restangular.one(path).get().then(
                function (res){
                    return success_(res.plain());
                },
                function (){
                    return fail_();
                });
        }

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
            console.log('Updating invitations');
            console.log(invs);
            Restangular.one(path).customPUT(invs).then(
                function () {
                    console.log('Updating OK!!');
                    success_();
                }, function () {
                    console.log('Updating KO!!');
                    fail_();
                });
        }

        function leaveExperiment(experId,  expId, success_, fail_) {

            var path = 'experiments/removefacility/' + expId + '/' + experId; 
             Restangular.one(path).customPOST().then(
                function (){
                    return success_();
                },
                function (){
                    return fail_();
                });
        } */
    }
})();
