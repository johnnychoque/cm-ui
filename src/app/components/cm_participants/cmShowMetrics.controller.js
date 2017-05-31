(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmShowMetricsController', cmShowMetricsController);

    cmShowMetricsController.$inject = ['$state', '$mdDialog', 'alert', '$timeout', 'animation', 'metricSrv', 'utilSrv', 'managerSrv'];

    function cmShowMetricsController($state, $mdDialog, alert, $timeout, animation, metricSrv, utilSrv, managerSrv) {
        var vm = this;

        vm.data = [];
        vm.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Date' /*,
                    tickFormat: function(d) {
                        var dx = vm.data[0].values[d].x;
                        var label = vm.data[0].values[d].label;
                        return label ? label : d3.time.format('%x')(new Date(dx));
                    }*/
                },
                yAxis: {
                    axisLabel: 'Metric value [0,1]',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };
        
        vm.showGraph = false;
        vm.metricList = metricSrv.getMetrics();
        vm.partUsername = utilSrv.getPartSelected().username;
        
        vm.metricSel = function (metric) {
            vm.params = {
                subscribedId : utilSrv.getPartSelected().subscribedId,
                experimentId : managerSrv.getCurrentExperimentId(),
                metricName : metric.metricName
            };
            console.log(vm.params);
            var myDataPromise = metricSrv.getMetricValues(vm.params, getSuccess, getError);
			myDataPromise.then(
						function (result) {
                            vm.data = [{ values: result,
                                              key: metric.metricName,
                                              color: '#EF3F6F'}];
                            vm.showGraph = true;
							return myDataPromise;
						}
					);
        };
        
        function getSuccess() { }

        function getError() { }
        
        function getValues() {
            console.log('DATTAAAAA');
            return vm.rangeValues;
        }
        
        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();