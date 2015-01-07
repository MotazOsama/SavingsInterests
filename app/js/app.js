/**
* savingsInterestApp Module
*
* Description
*/
var savingsInterestApp = angular.module('savingsInterestApp', []); 

savingsInterestApp.controller('calculatorCtr', function($scope){

	$scope.arrayList = [];
	$scope.yearsToInvest = 2;
	$scope.equationResult = $scope.yearsToInvest * 3;
	$scope.number = 0;
	$scope.interestRate = 4;
	$scope.changeEvent = function(){
		if ($scope.yearsToInvest) {		
			$scope.number++;
			$scope.arrayList.push($scope.number);
			$scope.equationResult = $scope.yearsToInvest * 2;
		}
	}

});

