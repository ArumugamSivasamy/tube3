package com.tube.profile

class UserProfile {

	String firstName
	String lastName
	String addressLine1
	String addressLine2
	String email
	Date dateCreated
	Date dateUpdated
	List actions
    static constraints = {
		firstName(nullable:false,blank:false)
		firstName(nullable:false,blank:false)
		firstName(nullable:true,blank:true)
		email(nullable:false,blank:false)
		dateCreated(nullable:false)
		dateUpdated(nullable:true)
		
    }
	
	static belongsTo = [user:User]
}
