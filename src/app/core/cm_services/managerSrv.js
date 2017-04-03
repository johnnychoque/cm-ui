(function() {
    'use strict';

    angular.module('app.components')
        .factory('managerSrv', ['$log', managerSrv]);

    function managerSrv($log) {

        var currentManagerType = null; // experimenter, site, facility
		var currentSiteManager = null; // santander, london, aarhus
		var managersSelected = [];
		var sitesSelected = [];
		
		var currentMainExperimenterId = null;
		var currentExperimentId = null;
		
        var service = {
			setManagersSelected: setManagersSelected,
			getManagersSelected: getManagersSelected,
			setSitesSelected: setSitesSelected,
			getSitesSelected: getSitesSelected,
            setCurrentManagerType: setCurrentManagerType,
            getCurrentManagerType: getCurrentManagerType,
			setCurrentSiteManager: setCurrentSiteManager,
			getCurrentSiteManager: getCurrentSiteManager,
			isSiteManager: isSiteManager,
			isSiteManagerOf: isSiteManagerOf,
			isExperimenter: isExperimenter,
			isFacilityManager: isFacilityManager,
			setCurrentExperimenterId: setCurrentExperimenterId,
			getCurrentExperimenterId: getCurrentExperimenterId,
			setCurrentExperimentId: setCurrentExperimentId,
			getCurrentExperimentId: getCurrentExperimentId
			//setSiteManager: setSiteManager,
			//getSiteManager: getSiteManager
        };

        return service;
		
		function setManagersSelected(managers) {
			managersSelected = managers;
		}
		
		function getManagersSelected() {
			return managersSelected;
		}
		
		function setSitesSelected(sites) {
			sitesSelected = sites;
		}
		
		function getSitesSelected() {
			return sitesSelected;
		}
		
		function setCurrentManagerType(manager) {
			currentManagerType = manager;
		}
		
		function getCurrentManagerType() {
			return currentManagerType;
		}
		
		function setCurrentSiteManager(site) {
			currentSiteManager = site;
		}
		
		function getCurrentSiteManager() {
			return currentSiteManager;
		}
		
		function isSiteManager() {
			//return (managerType == 'site') ? true : false;
			return (managersSelected.indexOf('site') > -1 ? true : false);
		}
		
		function isSiteManagerOf(site) {
			return (sitesSelected.indexOf(site) > -1 ? true : false);
		}
		
		function isExperimenter() {			
			//return (managerType == 'experimenter') ? true : false;
			return (managersSelected.indexOf('experimenter') > -1 ? true : false);
		}

		function isFacilityManager() {
			//return (managerType == 'facility') ? true : false;
			return (managersSelected.indexOf('facility') > -1 ? true : false);
		}
		
		function setCurrentExperimenterId(exprId) {
			currentMainExperimenterId = exprId;
		}
		
		function getCurrentExperimenterId() {
			return currentMainExperimenterId;
		}
		
		function setCurrentExperimentId(expId) {
			currentExperimentId = expId;
		}
		
		function getCurrentExperimentId() {
			return currentExperimentId;
		}
		
		/*
		function setSiteManager(site) {
			siteManager = site;
		}
		
		function getSiteManager() {
			return siteManager;
		}*/
		
    }

})();
