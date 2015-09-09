
<%@ page import="com.tube.upload.UserUpload" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'userUpload.label', default: 'UserUpload')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-userUpload" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-userUpload" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="fileName" title="${message(code: 'userUpload.fileName.label', default: 'File Name')}" />
					
						<g:sortableColumn property="filePath" title="${message(code: 'userUpload.filePath.label', default: 'File Path')}" />
					
						<g:sortableColumn property="fileType" title="${message(code: 'userUpload.fileType.label', default: 'File Type')}" />
					
						<g:sortableColumn property="searchName" title="${message(code: 'userUpload.searchName.label', default: 'Search Name')}" />
					
						<g:sortableColumn property="dateUploaded" title="${message(code: 'userUpload.dateUploaded.label', default: 'Date Uploaded')}" />
					
						<g:sortableColumn property="comment" title="${message(code: 'userUpload.comment.label', default: 'Comment')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${userUploadInstanceList}" status="i" var="userUploadInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${userUploadInstance.id}">${fieldValue(bean: userUploadInstance, field: "fileName")}</g:link></td>
					
						<td>${fieldValue(bean: userUploadInstance, field: "filePath")}</td>
					
						<td>${fieldValue(bean: userUploadInstance, field: "fileType")}</td>
					
						<td>${fieldValue(bean: userUploadInstance, field: "searchName")}</td>
					
						<td><g:formatDate date="${userUploadInstance.dateUploaded}" /></td>
					
						<td>${fieldValue(bean: userUploadInstance, field: "comment")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${userUploadInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
