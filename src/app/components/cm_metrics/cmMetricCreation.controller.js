(function() {
    'use strict';

    angular.module('app.components')
        .controller('cmMetricCreationController', cmMetricCreationController);

    cmMetricCreationController.$inject = ['$state', 'alert', '$timeout', 'animation', 'metricSrv'];

    function cmMetricCreationController($state, alert, $timeout, animation, metricSrv) {
        var vm = this;
		
		vm.mFunctionList = ['ln','log','exp', 'x^2', 'linear'];
		
		vm.mElementList = ['#assets-up','#assets-down','#annot-write'];
		
		vm.mPeriodList = ['weekly', 'fortnightly', 'monthly'];
				
		vm.parameters = [{
			weight: 0,
			func: '',
			element: '',
			min: 0,
			max: 0
		}];
		
		vm.mName = '';
		vm.mPeriod = '';
		
        vm.addFunction = function() {
			var obj = {
				weight: 0,
				func: '',
				element: '',
				min: 0,
				max: 0
			};
			vm.parameters.push(obj);
        };
		
		vm.removeParam = function (index) {
			console.log(index);
			vm.parameters.splice(index,1);
		};
		
		function validateMetric() {
			var parm = {};
			var valid = true;
			var strMessage = "";
			var totalWeight = 0;
            for (var i=0; i<vm.parameters.length; i++) {
				//parm = new Object();
				parm = vm.parameters[i];
				totalWeight = totalWeight + parm.weight;
				//console.log(i);
				//console.log(parm);
				if ((parm.weight === 0) || (parm.func === '') 
					|| (parm.element === '') || (parm.max === 0)
					|| (vm.mName === '') || (vm.mPerid === '')) {
					valid = false;
					strMessage = "Falta definir algun parametro";
					console.log(strMessage);
				}
				if (parm.max <= parm.min) {
					valid = false;
					strMessage = "Max tiene que ser mayor que Min";
					console.log(strMessage);
				}
			}
			if (totalWeight != 1) {
				valid = false;
				strMessage = "Peso total debe ser igual a 1";
				console.log(strMessage);					
			}
			console.log(valid);	
			if (!valid) {
				alert.error('There is some error in the metric function. Please fixed it');
			}
			return valid;
		}
		
        vm.create = function() {
			var metric = {};
			
			if (validateMetric()) {
				var expId = '20203030'; // HARDCODED.
				metric.experimentId = expId;
				metric.metricName = vm.mName;
				metric.periodicity = vm.mPeriod;
				metric.parameters = vm.parameters;
				console.log(metric);
				metricSrv.newMetric(metric, creationSuccess, creationError);
			}
			
        };
		
        function creationSuccess() {
            alert.success('Metric created');
			$state.go('layout.cm.metrics.list');
        }

        function creationError() {
            alert.error('Error creating the metric');
			$state.go('layout.cm.metrics.creation');
        }

        vm.cancel = function() {
            console.log(vm.parameters);
        };

        initialize();

        function initialize() {
            $timeout(function() {
                animation.viewLoaded();
            }, 500);
        } 
    }
})();