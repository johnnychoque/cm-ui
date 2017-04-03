(function() {
    'use strict';

    angular.module('app.components')
        .factory('siteSrv', ['Restangular', '$log', 'siteCommunityAPI', 'alert', siteSrv]);

    function siteSrv(Restangular, $log, siteCommunityAPI, alert) {

        var communities = [];

        var service = {
            getCommunities: getCommunities,
            loadCommunities: loadCommunities,
            newCommunity: newCommunity,
            updateExperiment: updateExperiment,
            removeCommunity: removeCommunity,
            leaveExperiment: leaveExperiment
        };

        return service;

        function getCommunities() {
            return communities;
        }

        function loadCommunities(sitename, success_, fail_) {
            siteCommunityAPI.getCommunities(sitename, success, fail);
			console.log("loadCommunities");
            function success(comms) {
                communities = comms;
                success_();
            }

            function fail() {
                fail_();
				console.log('FAIL');
            }
        }

        function newCommunity(info, success_, fail_) {
            siteCommunityAPI.newCommunity(info, success, fail);

            function success(res) {
                success_();
            }

            function fail() {
                fail_();
            }
        }

        function updateExperiment(info, success_, fail_) {
            siteCommunityAPI.updateExperiment(info.experimentId, info, success, fail);

            function success(exp) {
                for (var i = 0; i < communities.length; i++) {
                    if (exp.experimentId === communities[i].experimentId) {
                        communities[i] = exp;
                    }
                }
                success_();
            }

            function fail() {
                fail_();
            }
        }

        function removeCommunity(id, success_, fail_) {
            siteCommunityAPI.removeCommunity(id, success, fail);

            function success() {
                for (var i = 0; i < communities.length; i++) {
                    if (id === communities[i].communityId) {
                        communities.splice(i, 1);
                    }
                }
                success_();
            }

            function fail() {
                fail_();
            }
        }

        function leaveExperiment(experId,  expId, success_, fail_) {
            siteCommunityAPI.leaveExperiment(experId,  expId, success, fail);

            function success() {
                for (var i = 0; i < communities.length; i++) {
                    if (expId === communities[i].experimentId) {
                        communities.splice(i, 1);
                    }
                }
                success_();
            }
            function fail() {
                fail_();
            }
        }
    }

})();
