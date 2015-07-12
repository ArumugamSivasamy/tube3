<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="costCtrl">

Quantity: <input type="text" ng-model="taskName">


<button  ng-click="createTask()" class="save" value="submit">Submit</button>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('costCtrl', function($scope,$http) {
    $scope.taskName ="Arumugam";
    var postUrl = "${createLink(controller:'user' , action:'save')}";
    alert(postUrl);
    $scope.createTask=function(){
    	alert("task added");
    	var data={Name:$scope.taskName};
    	alert(data);
	$http.post(postUrl,data).success(function(data,status,headers){
	
		
		});
    };
});

</script>

</body>
</html>
