(function() {
    'use strict';

    angular.module('app.components')
        .factory('utilSrv', ['Restangular', '$log', 'experimenterCommunityAPI', utilSrv]);

    function utilSrv($Restangular, $log, experimenterCommunityAPI) {
		
		var usersSelected = [];
        var interests = [];
        var partSelected = {};
        
        var service = {
			addUsers: addUsers,
			getUsers: getUsers,
			deleteUsers: deleteUsers,
            addInterests: addInterests,
            getInterests: getInterests,
            setPartSelected: setPartSelected,
            getPartSelected: getPartSelected
		};
		
        return service;
		
        function addUsers(users) {
            usersSelected.push.apply(usersSelected, users);
			console.log(usersSelected);
        }
		
		function getUsers() {
			return usersSelected;
		}
        
        function getInterests() {
            return interests;
        }
		
        function setPartSelected(participant) {
            partSelected = participant;
        }
        
        function getPartSelected() {
            return partSelected;
        }
        
        function addInterests(success_, fail_) {
            experimenterCommunityAPI.getInterests(success, fail);

           function success(result) {
                for (var i = 0; i < result.length; i++) {
                    interests.push(result[i].name);
                }
                success_();
            }

            function fail() {
                fail_();
				console.log('FAIL');
            }
        }     
        
		function deleteUsers() {
			usersSelected.splice(0,usersSelected.length);
		}
    }

})();

/*
app.controller('ProductController', ProductController);
ProductController.$inject = ['$scope'];

function ProductController($scope){
    $scope.greet = "Foo is Not Great!5";
}

----------------
var app = angular.module('app', []);

app.controller('ProductController', ['$scope', '$http', function ($scope,$http) {

    $scope.greet = "Foo is Great!"
}]);

-------------------

var app = angular.module('app', []);

function ProductController($scope) {
    $scope.greet = "Infragistics";
};

app.controller('ProductController', ['$scope', ProductController]);

--------------------

app.controller("ProductController", function ($scope) {

    $scope.message = "Hey I am passed as function argument"

});

==========

myApp.controller('FirstCtrl', function ($scope, Data) {

    $scope.firstName = '';

    $scope.$watch('firstName', function (newValue, oldValue) {
        if (newValue !== oldValue) Data.setFirstName(newValue);
    });
});

myApp.controller('SecondCtrl', function ($scope, Data) {

    $scope.$watch(function () { return Data.getFirstName(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) $scope.firstName = newValue;
    });
});

*/
