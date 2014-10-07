package com.tube.core

public enum ObjectStatus {

	ACTIVE(1), INACTIVE(2), CLOSED(3),IN_PROGRESS(14),COMPLETED(15),
	
	/* Below for Sizing Request */
	OPEN(10), IN_REVIEW(11), REVIEW_REQUESTED(12), REVIEW_CANCELLED(13),
	APPROVED1(20), APPROVED2(21), APPROVED3(22), REJECTED(29),
	
	private final int val
	
	public ObjectStatus(int val) { this.val = val }
	int value() { return val }
	
	static def values(String model) {
		def lst = []
		switch (model) {
			case "User":
				lst = [ObjectStatus.ACTIVE, ObjectStatus.INACTIVE, ObjectStatus.CLOSED]
				break;
			default:
				lst = values()
				break;
		}
		return lst
	}
	
	String toString() {
		String str = ""
		switch (this) {
			case ACTIVE:
				str = "Active"
				break;
			case INACTIVE:
				str = "In Active"
				break;
			case CLOSED:
				str = "Closed"
				break;
			case OPEN:
				str = "Open"
				break;
			case IN_PROGRESS:
				str = "In Progress"
				break;
			case COMPLETED:
				str = "Completed"
				break;
			case REVIEW_REQUESTED:
				str = "Review Requested"
				break;
			case REVIEW_CANCELLED:
				str = "Review Request Cancelled"
				break;
			case IN_REVIEW:
				str = "In Review"
				break;
			case APPROVED1:
				str = "Approved"
				break;
			case APPROVED2:
				str = "Level 2 Approved"
				break;
			case APPROVED3:
				str = "Level 3 Approved"
				break;
			case REJECTED:
				str = "Rejected"
				break;
			default:
				str = ""
				break;
		}
		return str
	}
}
