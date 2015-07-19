
<%@ page import="com.tube.upload.UserUpload" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'userUpload.label', default: 'UserUpload')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-userUpload" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-userUpload" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list userUpload">
			
				<g:if test="${userUploadInstance?.fileName}">
				<li class="fieldcontain">
					<span id="fileName-label" class="property-label"><g:message code="userUpload.fileName.label" default="File Name" /></span>
					
						<span class="property-value" aria-labelledby="fileName-label"><g:fieldValue bean="${userUploadInstance}" field="fileName"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${userUploadInstance?.filePath}">
				<object type="application/x-shockwave-flash" data="../../zplayer.swf?mp3=../../2015718_22340.AANDHI_MAZHI__TLMAGARASAN_P.MP3&c1=ff0000&vol=100&down=1" width="200" height="50"/>
				</object>
				<li class="fieldcontain">
					<span id="filePath-label" class="property-label"><g:message code="userUpload.filePath.label" default="File Path" /></span>
					
						<span class="property-value" aria-labelledby="filePath-label"><g:fieldValue bean="${userUploadInstance}" field="filePath"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${userUploadInstance?.fileType}">
				<li class="fieldcontain">
					<span id="fileType-label" class="property-label"><g:message code="userUpload.fileType.label" default="File Type" /></span>
					
						<span class="property-value" aria-labelledby="fileType-label"><g:fieldValue bean="${userUploadInstance}" field="fileType"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${userUploadInstance?.searchName}">
				<li class="fieldcontain">
					<span id="searchName-label" class="property-label"><g:message code="userUpload.searchName.label" default="Search Name" /></span>
					
						<span class="property-value" aria-labelledby="searchName-label"><g:fieldValue bean="${userUploadInstance}" field="searchName"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${userUploadInstance?.dateUploaded}">
				<li class="fieldcontain">
					<span id="dateUploaded-label" class="property-label"><g:message code="userUpload.dateUploaded.label" default="Date Uploaded" /></span>
					
						<span class="property-value" aria-labelledby="dateUploaded-label"><g:formatDate date="${userUploadInstance?.dateUploaded}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${userUploadInstance?.comment}">
				<li class="fieldcontain">
					<span id="comment-label" class="property-label"><g:message code="userUpload.comment.label" default="Comment" /></span>
					
						<span class="property-value" aria-labelledby="comment-label"><g:fieldValue bean="${userUploadInstance}" field="comment"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${userUploadInstance?.user}">
				<li class="fieldcontain">
					<span id="user-label" class="property-label"><g:message code="userUpload.user.label" default="User" /></span>
					
						<span class="property-value" aria-labelledby="user-label"><g:link controller="user" action="show" id="${userUploadInstance?.user?.id}">${userUploadInstance?.user?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:userUploadInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${userUploadInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
