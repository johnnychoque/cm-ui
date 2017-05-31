(function() {
    'use strict';

    angular.module('app').config(config);

    /*
      Check app.config.js to know how states are protected
    */

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', 'RestangularProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider, $logProvider, RestangularProvider) {
        $stateProvider

        /*
        -- Layout state --
        Top-level state used for inserting the layout(navbar and footer)
        */
		.state('layout', {
			url: '',
			abstract: true,
			templateUrl: 'app/components/layout/layout.html',
			controller: 'LayoutController',
			controllerAs: 'vm'
		})


        .state('layout.welcome', {
            url: '/welcome',
            templateUrl: 'app/components/cm/welcome.html',
            controller: 'CmWelcomeController',
            controllerAs: 'vm'
        })

        .state('layout.selectuser', {
            url: '/selectuser',
            templateUrl: 'app/components/cm/cmSelectUser.html',
            controller: 'cmSelectUserController',
            controllerAs: 'vm'
        })

        .state('layout.cm', {
            url: '',
            abstract: true,
            templateUrl: 'app/components/cm/cmlayout.html',
            controller: 'CmLayoutController',
            controllerAs: 'vm'
        })

        .state('layout.cm.initialView', {
            url: '/initialview',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm/cmInitialView.html',
                    controller: 'cmInitialViewController',
                    controllerAs: 'vm'
                }
            }
        })
		
        .state('layout.cm.participants', {
			abstract: true,
            url: '',
			views: {
					'content@layout.cm': {
					templateUrl: 'app/components/cm_participants/cmExpInfo.html',
					controller: 'cmExpInfoController',
					controllerAs: 'vm'
				}
			}
        })

        .state('layout.cm.participants.list', {
			url: '/participants/list',
			views: {
				'partContent@layout.cm.participants': {
					templateUrl: 'app/components/cm_participants/cmParticipantList.html',
					controller: 'CmParticipantListController',
					controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        loadInvitations: function($q, invitationSrv, $stateParams) {
                            var defer = $q.defer();
                            //invitationSrv.loadInvitations($stateParams.expId,
							//HARDCODED: experimentId = 20203030
							invitationSrv.loadInvitations('20203030',
                                function() {
                                    defer.resolve({ success: true });
                                },
                                function() {
                                    defer.resolve({ success: false });
                                });
                            return defer.promise;
                        },
                        loadParticipants: function($q, participantSrv, $stateParams) {
                            var defer = $q.defer();
                            //participantSrv.loadParticipants($stateParams.expId,
							//HARDCODED: experimentId = 20203030
							participantSrv.loadParticipants('20203030',
                                function() {
                                    defer.resolve({ success: true });
                                },
                                function() {
                                    defer.resolve({ success: false });
                                });
                            return defer.promise;
                        },
                        loadMetrics: function($q, metricSrv, $stateParams) {
                            var defer = $q.defer();
                            //metricSrv.loadMetrics($stateParams.expId,
							//HARDCODED: expId = 20203030
                            console.log('load metrics participants');
							metricSrv.loadMetrics('20203030',
                                function() {
                                    defer.resolve({ success: true });
                                },
                                function() {
                                    defer.resolve({ success: false });
                                });
                            return defer.promise;
                        }
                    }
				}
			}
		})

        .state('layout.cm.participants.invitations', {
			url: '/participants/invitations',
			views: {
				'partContent@layout.cm.participants': {
					templateUrl: 'app/components/cm_participants/cmInvitationSelection.html',
					controller: 'CmInvitationSelectionController',
					controllerAs: 'vm'
				},
				'community@layout.cm.participants.invitations': {
					templateUrl: 'app/components/cm_participants/cmCommunitySelection.html',
					controller: 'CmCommunitySelectionController',
					controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        load: function(experimenterSrv, $q, $state) {
                            var defer = $q.defer();
                            experimenterSrv.loadCommunities(function() {
                                defer.resolve({ success: true });
                            }, function() {
                                defer.resolve({ success: false });
                            });
                            return defer.promise;
                        }
                    }
				},
				'individual@layout.cm.participants.invitations': {
					templateUrl: 'app/components/cm_participants/cmIndividualSelection.html',
					controller: 'CmIndividualSelectionController',
					controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        }
                    }
				}
			}
		})
        
        .state('layout.cm.participants.metrics', {
            url: '/participants/metrics',
			views: {
                'partContent@layout.cm.participants': {
                    templateUrl: 'app/components/cm_participants/cmShowMetrics.html',
                    controller: 'cmShowMetricsController', 
                    controllerAs: 'vm'
                }
            }
        })
			
        .state('layout.cm.experCommCreation', {
            url: '/expercommcreation',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmExperCommCreation.html',
                    controller: 'cmExperCommCreationController',
                    controllerAs: 'vm'
                }
            }
        })
		
        .state('layout.cm.siteCommCreation', {
            url: '/sitecommcreation',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmSiteCommCreation.html',
                    controller: 'cmSiteCommCreationController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('layout.cm.facilityCommCreation', {
            url: '/facilitycommcreation',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmFacilityCommCreation.html',
                    controller: 'cmFacilityCommCreationController',
                    controllerAs: 'vm'
                }
            }
        })
		
		// Show the communities of an experimenter
        .state('layout.cm.experComms', {
            url: '/expercomms',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmExperComm.html',
                    controller: 'cmExperCommController',
                    controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        load: function(experimenterSrv, $q, $state) {
                            var defer = $q.defer();
                            experimenterSrv.loadCommunities(function() {
                                defer.resolve({ success: true });
                            }, function() {
                                defer.resolve({ success: false });
                            });
                            return defer.promise;
                        } ,
                        loadInterests: function(utilSrv, $q, $state) {
                            var defer = $q.defer();
                            //console.log("interest size ", utilSrv.getInterests().length)
                            if (utilSrv.getInterests().length == 0) {
                                console.log('utilSrv.addInterests');
                                utilSrv.addInterests(function() {
                                    defer.resolve({ success: true });
                                }, function() {
                                    defer.resolve({ success: false });
                                });
                                return defer.promise;
                            }
                        }
                    }
                }
            }
        })

		// Show the communities of an site manager
        .state('layout.cm.londonSiteComms', {
            url: '/londonsitecomms',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmSiteComm.html',
                    controller: 'cmSiteCommController',
                    controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        load: function(siteSrv, $q, $state) {
                            var defer = $q.defer();
							console.log("Antes de loadComm"); 
                            siteSrv.loadCommunities('london', function() {
                                defer.resolve({ success: true });
                            }, function() {
                                defer.resolve({ success: false });
                            });
                            return defer.promise;
                        },
                        loadInterests: function(utilSrv, $q, $state) {
                            var defer = $q.defer();
                            //console.log("interest size ", utilSrv.getInterests().length)
                            if (utilSrv.getInterests().length == 0) {
                                console.log('utilSrv.addInterests');
                                utilSrv.addInterests(function() {
                                    defer.resolve({ success: true });
                                }, function() {
                                    defer.resolve({ success: false });
                                });
                                return defer.promise;
                            }
                        }
                    } 
                }
            }
        })

        .state('layout.cm.santanderSiteComms', {
            url: '/santandersitecomms',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmSiteComm.html',
                    controller: 'cmSiteCommController',
                    controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        load: function(siteSrv, $q, $state) {
                            var defer = $q.defer();
                            siteSrv.loadCommunities('santander', function() {
                                defer.resolve({ success: true });
                            }, function() {
                                defer.resolve({ success: false });
                            });
                            return defer.promise;
                        },
                        loadInterests: function(utilSrv, $q, $state) {
                            var defer = $q.defer();
                            //console.log("interest size ", utilSrv.getInterests().length)
                            if (utilSrv.getInterests().length == 0) {
                                console.log('utilSrv.addInterests');
                                utilSrv.addInterests(function() {
                                    defer.resolve({ success: true });
                                }, function() {
                                    defer.resolve({ success: false });
                                });
                                return defer.promise;
                            }
                        }
                    } 
                }
            }
        })

        .state('layout.cm.aarhusSiteComms', {
            url: '/aarhussitecomms',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmSiteComm.html',
                    controller: 'cmSiteCommController',
                    controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        load: function(siteSrv, $q, $state) {
                            var defer = $q.defer();
                            siteSrv.loadCommunities('aarhus', function() {
                                defer.resolve({ success: true });
                            }, function() {
                                defer.resolve({ success: false });
                            });
                            return defer.promise;
                        },
                        loadInterests: function(utilSrv, $q, $state) {
                            var defer = $q.defer();
                            //console.log("interest size ", utilSrv.getInterests().length)
                            if (utilSrv.getInterests().length == 0) {
                                console.log('utilSrv.addInterests');
                                utilSrv.addInterests(function() {
                                    defer.resolve({ success: true });
                                }, function() {
                                    defer.resolve({ success: false });
                                });
                                return defer.promise;
                            }
                        }
                    } 
                }
            }
        })

		// Show the communities of an facility manager
        .state('layout.cm.facilityComms', {
            url: '/facilitycomms',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_communities/cmFacilityComm.html',
                    controller: 'cmFacilityCommController',
                    controllerAs: 'vm',
                    resolve: {
                        islogged: function($state, auth) {
                            if (!auth.isAuth()) {
                                return auth.logout();
                            }
                        },
                        load: function(facilitySrv, $q, $state) {
                            var defer = $q.defer();
                            facilitySrv.loadCommunities(function() {
                                defer.resolve({ success: true });
                            }, function() {
                                defer.resolve({ success: false });
                            });
                            return defer.promise;
                        },
                        loadInterests: function(utilSrv, $q, $state) {
                            var defer = $q.defer();
                            //console.log("interest size ", utilSrv.getInterests().length)
                            if (utilSrv.getInterests().length == 0) {
                                console.log('utilSrv.addInterests');
                                utilSrv.addInterests(function() {
                                    defer.resolve({ success: true });
                                }, function() {
                                    defer.resolve({ success: false });
                                });
                                return defer.promise;
                            }
                        }
                    }
                }
            }
        })
		
        .state('layout.cm.metrics', {
			abstract: true,
            url: '',
			views: {
					'content@layout.cm': {
					templateUrl: 'app/components/cm_metrics/cmExpInfo.html',
					controller: 'cmExpInfoController',
					controllerAs: 'vm'
				}
			}
        })
		
		.state('layout.cm.metrics.list', {
            url: '/metrics/list',
            views: {
                'metContent@layout.cm.metrics': {
                    templateUrl: 'app/components/cm_metrics/cmMetricList.html',
                    controller: 'cmMetricListController',
                    controllerAs: 'vm',
                    resolve: {
                        loadMetrics: function($q, metricSrv, $stateParams) {
                            var defer = $q.defer();
                            //metricSrv.loadMetrics($stateParams.expId,
							//HARDCODED: expId = 20203030
							metricSrv.loadMetrics('20203030',
                                function() {
                                    defer.resolve({ success: true });
                                },
                                function() {
                                    defer.resolve({ success: false });
                                });
                            return defer.promise;
                        }
					}
                }
            }
        })

        .state('layout.cm.metrics.creation', {
            url: '/metrics/creation',
            views: {
                'metContent@layout.cm.metrics': {
                    templateUrl: 'app/components/cm_metrics/cmMetricCreation.html',
                    controller: 'cmMetricCreationController',
                    controllerAs: 'vm'
                }
            }
        })
		
		/*
        .state('layout.cm.metricList', {
            url: '/metriclist',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_metrics/cmMetricList.html',
                    controller: 'cmMetricListController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('layout.cm.metricCreation', {
            url: '/metriccreation',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm_metrics/cmMetricCreation.html',
                    controller: 'cmMetricCreationController',
                    controllerAs: 'vm'
                }
            }
        })*/
		
        .state('layout.cm.expPortal', {
            url: '/expPortal',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm/cmExpPortal.html',
                    controller: 'cmExpPortal',
                    controllerAs: 'vm'
                }
            }
        })
		
        .state('layout.cm.vista1', {
            url: '/vista1',
            views: {
                'content@layout.cm': {
                    templateUrl: 'app/components/cm/vista1.html',
                    controller: 'Vista1Controller',
                    controllerAs: 'vm'
                }
            }
        })
		
		/*
        -- Callback --
        It saves token from accounts organicity
        */
        .state('callback', {
            url: '/',
            authenticate: false,
            resolve: {
                callback: function($location, $state, auth, $rootScope) {
                    auth.callback();
                }
            }
        });
		
        /* Default state */
        //$urlRouterProvider.otherwise('/vista1');
		$urlRouterProvider.otherwise('/welcome');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        //RestangularProvider.setBaseUrl('http://ec2-35-167-187-240.us-west-2.compute.amazonaws.com:8051');
		RestangularProvider.setBaseUrl('http://localhost:8081');
        //RestangularProvider.setBaseUrl('https://localhost:8443');
        //RestangularProvider.setBaseUrl('https://experimenters.organicity.eu:8443');

        /* Remove angular leaflet logs */
        $logProvider.debugEnabled(false);
    }
})();