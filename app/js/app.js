/**
* savingsInterestApp Module
*
* Description
*/
var savingsInterestApp = angular.module('savingsInterestApp', []); 

savingsInterestApp.controller('calculatorCtr', function($scope){

	$scope.arrayList = [];
	$scope.depositsFreq = ["Annually","Monthly","Semi-Annually", "Quarterly","Bi-Monthly","Semi-Monthly", "Bi-Weekly", "Weekly", "Daily"]
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
				$scope.factor =1 ;
			} else if ($scope.depostitFreq == $scope.depositsFreq[1]){
				$scope.factor =12 ;
			} else if ($scope.depostitFreq == $scope.depositsFreq[2]){
				$scope.factor =2 ;
			}else if ($scope.depostitFreq == $scope.depositsFreq[3]){
				$scope.factor =4 ;
			} else if ($scope.depostitFreq == $scope.depositsFreq[4]){
				$scope.factor = 6;
			} else if ($scope.depostitFreq == $scope.depositsFreq[5]){
				$scope.factor = 24;
			} else if ($scope.depostitFreq == $scope.depositsFreq[6]){
				$scope.factor = 26;
			} else if ($scope.depostitFreq == $scope.depositsFreq[7]){
				$scope.factor = 52;
			} else if ($scope.depostitFreq == $scope.depositsFreq[8]){
				$scope.factor = 365;
			} 
			$scope.calculateChange();
			$scope.futureValue = $scope.arrayList[$scope.number].balance;
			$scope.calculateTotalInvestedValue();
			$scope.calculateInterestEarned();
			$scope.roundNumbers();
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

	$scope.calculateChange = function () {
		$scope.init();
		for (var i = 1; i <= $scope.number; i++) {
			obj = {}; 
			obj.id = i;
			obj.rate = $scope.interestRate;	
			obj.extraAnnualDeposit = $scope.extraAnnualDeposit;
			obj.balance = 0; 
			
			// calculate future value. 
			var r, c, pv = 0.0; 
			r = (obj.rate/100)/$scope.factor; 
			c = $scope.depositAmount; 
			pv = $scope.initInvest;
			nper = i*$scope.factor;
			var fv = 0.0;

			fv = $scope.calculateFutureValue(r, nper, c, pv);
			
			obj.depositAmount = c * $scope.factor;
			obj.interest = fv - $scope.arrayList[i-1].balance - obj.depositAmount;

			obj.cumulativeContrib =  $scope.arrayList[i-1].balance + obj.depositAmount;

			obj.balance = obj.interest + obj.depositAmount +$scope.arrayList[i-1].balance ;

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
		$scope.totalInvested = Math.round((total + $scope.initInvest)*100)/100;
	}

	$scope.calculateInterestEarned = function (){
		var total = 0;
		for (var i = 1; i <= $scope.yearsToInvest; i++) {
			total += $scope.arrayList[i].interest;
		}
		$scope.totalInterest = Math.round((total)*100)/100;
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

	$scope.roundNumbers = function () {
		for (var i = 1; i <= $scope.number; i++) {
			var obj = $scope.arrayList[i]; 
			obj.interest = Math.round(obj.interest * 100) /100;
			obj.balance = Math.round(obj.balance * 100) /100;
		};
	}

	/*** first call ***/ 
	$scope.changeEvent();


});

