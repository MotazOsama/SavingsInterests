/**
* savingsInterestApp Module
*
* Description
*/
var savingsInterestApp = angular.module('savingsInterestApp', []); 

savingsInterestApp.controller('calculatorCtr', function($scope){

	$scope.arrayList = [];
	$scope.depositsFreq = ["Annualy","Monthly"]
	$scope.depostitFreq = $scope.depositsFreq[0];
	$scope.yearsToInvest = 2;
	$scope.equationResult = $scope.yearsToInvest * 3;
	$scope.number = 0;
	$scope.interestRate = 4;
	$scope.initInvest = 10000;
	$scope.depositAmount = 200;
	$scope.number = $scope.yearsToInvest;
	$scope.extraAnnualDeposit = 0;

	$scope.changeEvent = function(){
		if ($scope.yearsToInvest) {		
			$scope.number = $scope.yearsToInvest;
			if($scope.depostitFreq == $scope.depositsFreq[0]){
				$scope.calculateAnnualChange();
				$scope.futureValue = $scope.arrayList[$scope.number].balance;
				$scope.calculateTotalInvestedValue();
				$scope.calculateInterestEarned();
			}
		}
	}

	$scope.calculateAnnualChange = function (){
		$scope.arrayList = [];
		/******** first item in array List *******/
		obj = {};
		obj.id = ""; 
		obj.rate = $scope.interestRate;
		obj.interest = 0
		obj.depositAmount = $scope.initInvest;
		obj.extraAnnualDeposit = $scope.extraAnnualDeposit;
		obj.balance = $scope.initInvest;
		$scope.arrayList.push(obj);

		for (var i = 1; i <= $scope.number; i++) {
			obj = {}; 
			obj.id = i;
			obj.rate = $scope.interestRate;	
			obj.interest = ($scope.arrayList[i-1].balance + $scope.arrayList[i-1].extraAnnualDeposit) * obj.rate/100;
			obj.depositAmount = $scope.depositAmount;
			obj.extraAnnualDeposit = $scope.extraAnnualDeposit;
			obj.balance = 	$scope.arrayList[i-1].balance + obj.interest +obj.depositAmount +  obj.extraAnnualDeposit;	
			$scope.arrayList.push(obj);					
		}
		
	}

	$scope.calculateTotalInvestedValue = function (){
		var total = 0;
		for (var i = 1; i <= $scope.yearsToInvest; i++) {
			total += $scope.arrayList[i].depositAmount;
		}
		$scope.totalInvested = total + $scope.initInvest;
	}

	$scope.calculateInterestEarned = function (){
		var total = 0;
		for (var i = 1; i <= $scope.yearsToInvest; i++) {
			total += $scope.arrayList[i].interest;
		}
		$scope.totalInterest = total;
	}

	

	/*** first call ***/ 
	$scope.changeEvent();


});

