<%@ page import="com.tube.upload.UserUpload" %>



<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'fileName', 'error')} ">
	<label for="fileName">
		<g:message code="userUpload.fileName.label" default="File Name" />
		
	</label>
	<g:textField name="fileName" value="${userUploadInstance?.fileName}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'filePath', 'error')} ">
	<label for="filePath">
		<g:message code="userUpload.filePath.label" default="File Path" />
		
	</label>
	<g:textField name="filePath" value="${userUploadInstance?.filePath}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'fileType', 'error')} ">
	<label for="fileType">
		<g:message code="userUpload.fileType.label" default="File Type" />
		
	</label>
	<g:textField name="fileType" value="${userUploadInstance?.fileType}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'searchName', 'error')} ">
	<label for="searchName">
		<g:message code="userUpload.searchName.label" default="Search Name" />
		
	</label>
	<g:textField name="searchName" value="${userUploadInstance?.searchName}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'dateUploaded', 'error')} ">
	<label for="dateUploaded">
		<g:message code="userUpload.dateUploaded.label" default="Date Uploaded" />
		
	</label>
	<g:datePicker name="dateUploaded" precision="day"  value="${userUploadInstance?.dateUploaded}" default="none" noSelection="['': '']" />

</div>

<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'comment', 'error')} ">
	<label for="comment">
		<g:message code="userUpload.comment.label" default="Comment" />
		
	</label>
	<g:textField name="comment" value="${userUploadInstance?.comment}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: userUploadInstance, field: 'user', 'error')} required">
	<label for="user">
		<g:message code="userUpload.user.label" default="User" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="user" name="user.id" from="${com.tube.profile.User.list()}" optionKey="id" required="" value="${userUploadInstance?.user?.id}" class="many-to-one"/>

</div>

