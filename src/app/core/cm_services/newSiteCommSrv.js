(function() {
    'use strict';

    angular.module('app.components')
        .factory('newSiteCommSrv', ['$log', newSiteCommSrv]);


    function newSiteCommSrv($log) {

        var community = {
			subscribedId: null,
			siteName: null,
			communityId: null,
            communityName: null,
            description: null,
            members: [],
            keywords: [],
			criteria: null
        };

        var service = {
            flush: flush,
			setSubscribedId: setSubscribedId,
			setSiteName: setSiteName,
			setCommunityId: setCommunityId,
			setCommunityName: setCommunityName,
            setDescription: setDescription,
			setMembers: setMembers,
			setKeywords: setKeywords,
			setCriteria: setCriteria,
			getCommunity: getCommunity
        };

        return service;

        function flush() {
            community.subscribedId = null;
            community.communityId = null;
            community.communityName = null;
            community.description = null;
            community.members = community.members.splice(0,community.members.length);
            community.keywords = community.keywords.splice(0,community.keywords.length);
			community.criteria = null;
        }

        function setSubscribedId(subscribedId) {
            community.subscribedId = subscribedId;
        }
		
		function setSiteName(siteName) {
			community.siteName = siteName;
		}

        function setCommunityId() {
            community.communityId = 'urn:ocentity:community:site:'+community.siteName+':'+community.communityName;
        }

        function setCommunityName(communityName) {
			//eliminar espacios en blanco
            community.communityName = communityName.replace(/ /g, ''); //replace(/\s/g,' '); 
        }

        function setDescription(description) {
			// Eliminar tabuladores y reemplazar varios espacios por uno solo
            community.description = description.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
        }

        function setMembers(members) {
            community.members = members;
        }

        function setKeywords (keywords) {
			var tmp = keywords.replace(/\s/g," ");
            community.keywords = tmp.split(",");
        }

		function setCriteria(params) {
			community.criteria = "Age min: " + params.min + ", Age max: " + params.max + ", Interests: " + params.p;
		}
		
        function getCommunity() {
            return community;
        }

    }
})();
