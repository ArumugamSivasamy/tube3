package com.tube.upload
import com.tube.profile.User
class UserUpload {

	String fileName
	String filePath
	String fileType
	String resourcePath
	String searchName
	Date dateUploaded
	String comment
    static constraints = {
		fileName(nullable:false,blank:true)
		filePath(nullable:false,blank:true)
		fileType(nullable:false)
		searchName(nullable:true)
		dateUploaded(nullable:true)
		resourcePath(nullable:true) 
		comment(nullable:true)
    }
	
	static belongsTo =[user:User]
}
