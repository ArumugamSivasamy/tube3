package com.tube.profile

import com.tube.core.ObjectStatus
import com.tube.upload.UserUpload
class User {

	String name
	String gender
	String login
	String email
	String password
	String confirmPassword
	ObjectStatus status
	String statusReason
	String country
    static constraints = {
		name (nullable:false, blank:false)
		login (nullable:true, unique: true, blank:false, size:5..255, matches:/[\S]+/,)
		password(size:5..25, matches:/[\S]+/, validator:{ val, obj ->
			println "password ${obj.password}"
			println "confirm password ${confirmPassword}"
			
			if (obj.password != obj.confirmPassword)
				return 'perf.sizing.user.password.dontmatch'
			})
		email(nullable:false, unique: true, blank:false, matches: "[a-zA-Z][a-zA-Z0-9_.-]*@gmail.com")
		status(nullable: false)
		statusReason(nullable: true)
		gender(inList: ["Male", "Female","Other"], nullable: true)
		country(nullable: true)
		userUploads(nullable:true)
		userProfile(nullable:true)
		
    }
	
	static hasMany = [userUploads:UserUpload]
	
	static transients = ['confirmPassword']
	
	static hasOne = [userProfile:UserProfile]
	
}
