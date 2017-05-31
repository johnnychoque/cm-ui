(function() {
    'use strict';

    angular.module('app.components')
        .factory('metricSrv', ['Restangular', '$log', 'metricAPI', 'alert', metricSrv]);

    function metricSrv(Restangular, $log, metricAPI, alert) {

        var metrics = [];

        var service = {
            getMetrics: getMetrics,
            loadMetrics: loadMetrics,
            newMetric: newMetric,
            updateExperiment: updateExperiment,
            removeMetric: removeMetric,
            getMetricValues: getMetricValues
        };

        return service;

		// Construye el string que define la funcion de la metrica
		function metricFunction (parameters) {
			var strFunc = '';
			for (var i=0; i<parameters.length; i++) {
				//console.log(i+" "+parameters[i].func);
				strFunc = strFunc+parameters[i].weight+"*"+parameters[i].func+"("+parameters[i].element+")";
				if (i < (parameters.length-1)) strFunc = strFunc + " + ";
			}
			return strFunc;
		}
		
		/* 
		Crea nuevos objetos con los valores a ser mostrados en la lista de metricas
		*/
        function getMetrics() {
			console.log('getMetrics');
			var obj = {};
			var mets = [];
			for (var i=0; i<metrics.length; i++) {
				//console.log(metrics[i]);
				obj = new Object();
				obj.experimentId = metrics[i].experimentId;
				obj.metricName = metrics[i].metricName;
				obj.createdDate = metrics[i].createdDate;
				obj.metricFunction = metricFunction(metrics[i].parameters);
				mets.push(obj);
			}
			return mets;
			
            //return metrics;
        }

        function loadMetrics(id, success_, fail_) {
            metricAPI.getMetrics(id, success, fail);

            function success(resul) {
                metrics = resul;
                success_();
            }

            function fail() {
                fail_();
				console.log('FAIL');
            }
        }
		
		/* 
		
		*/
        function getMetricValues(params, success_, fail_) {
            return metricAPI.getMetricValues(params, success, fail);

            function success(metrics) {
                // FILTRAR solo metricValue y measuredDate para retornar solo array
                var values = [];
                //Data is represented as an array of {x,y} pairs.
                for (var i = 0; i < metrics.length; i++) {
                    values.push({x: Date.parse(metrics[i].measuredDate), y: metrics[i].metricValue});
                }
                return values;
            }

            function fail() {

            }
        }
        
		/* 
		
		*/
        function newMetric(info, success_, fail_) {
            metricAPI.newMetric(info, success, fail);

            function success(res) {
                success_();
            }

            function fail() {
                fail_();
            }
        }

        function updateExperiment(info, success_, fail_) {
            metricAPI.updateExperiment(info.experimentId, info, success, fail);

            function success(exp) {
                for (var i = 0; i < metrics.length; i++) {
                    if (exp.experimentId === metrics[i].experimentId) {
                        metrics[i] = exp;
                    }
                }
                success_();
            }

            function fail() {
                fail_();
            }
        }

		/* */
        function removeMetric(expId, name, success_, fail_) {
            metricAPI.removeMetric(expId, name, success, fail);

            function success() {
				// En caso de exito, eliminar la metrica del array "metrics"
                for (var i = 0; i < metrics.length; i++) {
                    if ((expId === metrics[i].experimentId) && (name === metrics[i].metricName)) {
                        metrics.splice(i, 1);
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
