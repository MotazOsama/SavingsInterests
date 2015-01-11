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
				// deposit frequency = annual
				$scope.calculateAnnualChange();
			} else if ($scope.depostitFreq == $scope.depositsFreq[1]){
				$scope.calculateMonthlyChange();				
			}
			$scope.futureValue = $scope.arrayList[$scope.number].balance;
			$scope.calculateTotalInvestedValue();
			$scope.calculateInterestEarned();
			$scope.drawChart();
		}
	}

	$scope.init = function (argument) {
		$scope.arrayList = [];
		obj = {};
		obj.id = ""; 
		obj.rate = $scope.interestRate;
		obj.interest = 0
		obj.depositAmount = $scope.initInvest;
		obj.extraAnnualDeposit = $scope.extraAnnualDeposit;
		obj.balance = $scope.initInvest;
		$scope.arrayList.push(obj);
	}

	$scope.calculateAnnualChange = function (){
		$scope.init();
		for (var i = 1; i <= $scope.number; i++) {
			obj = {}; 
			obj.id = i;
			obj.rate = $scope.interestRate;	
			obj.depositAmount = $scope.depositAmount;
			obj.extraAnnualDeposit = $scope.extraAnnualDeposit;
			obj.balance = 0; 
			
			// calculate future value. 
			var r, c, pv = 0.0; 
			r = obj.rate/100; 
			c = obj.depositAmount; 
			pv = $scope.initInvest;
			nper = i;
			var fv = 0.0;

			fv = $scope.calculateFutureValue(r, nper, c, pv);
			
			obj.balance = fv;

			obj.interest = fv - $scope.arrayList[i-1].balance - obj.depositAmount;

			obj.cumulativeContrib =  $scope.arrayList[i-1].balance + obj.depositAmount

			$scope.arrayList.push(obj);					
		}
		
	}

	$scope.calculateMonthlyChange = function () {
		$scope.init();
		for (var i = 1; i <= $scope.number; i++) {
			obj = {}; 
			obj.id = i;
			obj.rate = $scope.interestRate;	
			obj.extraAnnualDeposit = $scope.extraAnnualDeposit;
			obj.balance = 0; 
			
			// calculate future value. 
			var r, c, pv = 0.0; 
			r = (obj.rate/100)/12; 
			c = $scope.depositAmount; 
			pv = $scope.initInvest;
			nper = i*12;
			var fv = 0.0;

			fv = $scope.calculateFutureValue(r, nper, c, pv);
			
			obj.balance = fv;
			obj.depositAmount = c * 12;
			obj.interest = fv - $scope.arrayList[i-1].balance - obj.depositAmount;

			obj.cumulativeContrib =  $scope.arrayList[i-1].balance + obj.depositAmount

			$scope.arrayList.push(obj);					
		}
		
	}

	$scope.calculateFutureValue = function (r, nper, c, pv) {
		return (c * (Math.pow((1 + r), nper) - 1) / r + pv * Math.pow((1 + r), nper));
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

	$scope.flag= true;
	$scope.drawChart = function () {
		var ctx = document.getElementById("myChart").getContext("2d");

		var data ={ labels:[] , datasets: []}; 
		
		for (var i = 0; i <= $scope.yearsToInvest; i++) {
			data.labels.push(i+"");
		}

		var balancePoints = [];
		for (var i = 0; i <= $scope.yearsToInvest; i++) {
			balancePoints.push($scope.arrayList[i].balance);
		}

		var cumulativeContribPoints = [];
		for (var i = 0; i <= $scope.yearsToInvest; i++) {
			cumulativeContribPoints.push($scope.arrayList[0].balance +(i * $scope.arrayList[i].depositAmount));
		}

		datasetObjForBalance = {
			label: "Balance",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(0,0,255,1)",
			pointColor: "rgba(0,0,0,1)",
			// pointStrokeColor: "#fff",
			// pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: balancePoints
		}

		data.datasets.push(datasetObjForBalance);

		datasetObjForCumulativeContrib = {
			label: "Cumulative Contribution",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(255,0,0,1)",
			pointColor: "rgba(0,0,0,1)",
			// pointStrokeColor: "#fff",
			// pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: cumulativeContribPoints
		}

		data.datasets.push(datasetObjForCumulativeContrib);


		$scope.myNewChart = new Chart(ctx).Line(data);
	}

	/*** first call ***/ 
	$scope.changeEvent();


});

