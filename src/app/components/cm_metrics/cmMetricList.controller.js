(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmMetricListController', cmMetricListController);

    cmMetricListController.$inject = ['$state', '$mdDialog', 'alert', '$timeout', 'animation', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'metricSrv'];

    function cmMetricListController($state, $mdDialog, alert, $timeout, animation, DTOptionsBuilder, DTColumnDefBuilder, metricSrv) {
        var vm = this;

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage({
                "sLengthMenu": "Show _MENU_ metrics",
            })
            .withOption('lengthMenu', [10, 20, 50]);

        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];
		
		vm.metrics = metricSrv.getMetrics();
		
		console.log(vm.metrics);
		
		vm.editMetric = function (metric) {
			
		}
		
		vm.metricSel = {};
		
		vm.confirmRemove = function(metric) {
            vm.metricSel = metric;
            $mdDialog.show({
                locals: {
                    mdInfo: {
                        cancel: function() { $mdDialog.hide(); },
                        proceed: vm.remove,
                        title: 'You are removing a metric',
                        info: 'By doing so all the information related to the metric ' +
                            'will be lost',
                        question: 'Do you want to continue?'
                    }
                },
                controller: 'EpConfirmController as vm',
                templateUrl: 'app/components/cm/epConfirm.html',
                clickOutsideToClose: false
            });
        };
		
        vm.remove = function() {
            $mdDialog.hide();
            vm.loadingChart = true;
            metricSrv.removeMetric(vm.metricSel.experimentId, vm.metricSel.metricName, RemovalSuccess, RemovalError);
        };
		
        function RemovalSuccess() {
            vm.loadingChart = false;
            alert.success('Metric have been removed');
            vm.metrics = metricSrv.getMetrics();
			console.log(vm.metrics);
            vm.metricSel = {};
        }

        function RemovalError() {
            vm.loadingChart = false;
            alert.error('Metric removal was not correctly performed');
            vm.metrics = metricSrv.getMetrics();
            vm.metricSel = {};
        }
		
        vm.readableDate = function (str) {
            var date = new Date(str);
            return date.toString().substring(0, 15);
        };
		
        vm.newMetric = function() {
            $state.go('layout.cm.metrics.creation');
        };

        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        }
    }
})();