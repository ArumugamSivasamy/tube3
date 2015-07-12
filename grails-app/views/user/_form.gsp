<%@ page import="com.tube.profile.User" %>

<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>

<div ng-app="myApp" ng-controller="costCtrl">

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'name', 'error')} required">
	<label for="name">
		<g:message code="user.name.label" default="Full Name" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="name" required="" value="${userInstance?.name}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'login', 'error')} ">
	<label for="login">
		<g:message code="user.login.label" default="Login" />
		
	</label>
	<g:textField name="login" value="${userInstance?.login}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'password', 'error')} ">
	<label for="password">
		<g:message code="user.password.label" default="Password" />
		
	</label>
	<g:passwordField name="password" maxlength="25" pattern="${userInstance.constraints.password.matches}" value="${userInstance?.password}"/>

</div>


<div
	class="fieldcontain ${hasErrors(bean: userInstance, field: 'password', 'error')} required">
	<label for="password"> <g:message code="user.password.label"
			default="Retype Password" /> <span class="required-indicator">*</span>
	</label>
	<g:passwordField required="" name="confirmPassword" value="" />
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'email', 'error')} required">
	<label for="email">
		<g:message code="user.email.label" default="Email" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="email" pattern="${userInstance.constraints.email.matches}" required="" value="${userInstance?.email}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'status', 'error')} required">
	<label for="status">
		<g:message code="user.status.label" default="Status" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="status" from="${com.tube.core.ObjectStatus?.values()}" keys="${com.tube.core.ObjectStatus.values()*.name()}" required="" value="${userInstance?.status?.name()}" />

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'statusReason', 'error')} ">
	<label for="statusReason">
		<g:message code="user.statusReason.label" default="Status Reason" />
		
	</label>
	<g:textField name="statusReason" value="${userInstance?.statusReason}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'gender', 'error')} ">
	<label for="gender">
		<g:message code="user.gender.label" default="Gender" />
		
	</label>
	<g:select name="gender" from="${userInstance.constraints.gender.inList}" value="${userInstance?.gender}" valueMessagePrefix="user.gender" noSelection="['': '']"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'country', 'error')} ">
	<label for="country">
		<g:message code="user.country.label" default="Country" />
		
	</label>
	<g:textField name="country" value="${userInstance?.country}"/>

</div>
<%--
<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'userProfile', 'error')} required">
	<label for="userProfile">
		<g:message code="user.userProfile.label" default="User Profile" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="userProfile" name="userProfile.id" from="${com.tube.profile.UserProfile.list()}" optionKey="id" required="" value="${userInstance?.userProfile?.id}" class="many-to-one"/>

</div>  --%>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'userUploads', 'error')} ">
	<label for="userUploads">
		<g:message code="user.userUploads.label" default="User Uploads" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${userInstance?.userUploads?}" var="u">
    <li><g:link controller="userUpload" action="show" id="${u.id}">${u?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="userUpload" action="create" params="['user.id': userInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'userUpload.label', default: 'UserUpload')])}</g:link>
</li>
</ul>


</div>

</div>

<script type="text/javascript">

var app = angular.module('myApp', []);
app.controller('costCtrl', function($scope,$http) {
    $scope.taskName ="Arumugam";
    var postUrl = "user/save";
    $scope.createTask=function(){
	var data={Name:$scope.taskName};
	$http.post(postUrl,data).success(function(data,status,headers){
		alert("task added");
		$http.get(headers("location")).success(function(data){
			$scope.tasks.push(data);
			});

		});
    };
});
</script>
