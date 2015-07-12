package com.tube.upload



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserUploadController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond UserUpload.list(params), model:[userUploadInstanceCount: UserUpload.count()]
    }

    def show(UserUpload userUploadInstance) {
        respond userUploadInstance
    }

    def create() {
        respond new UserUpload(params)
    }

    @Transactional
    def save(UserUpload userUploadInstance) {
        if (userUploadInstance == null) {
            notFound()
            return
        }

        if (userUploadInstance.hasErrors()) {
            respond userUploadInstance.errors, view:'create'
            return
        }

        userUploadInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'userUploadInstance.label', default: 'UserUpload'), userUploadInstance.id])
                redirect userUploadInstance
            }
            '*' { respond userUploadInstance, [status: CREATED] }
        }
    }

    def edit(UserUpload userUploadInstance) {
        respond userUploadInstance
    }

    @Transactional
    def update(UserUpload userUploadInstance) {
        if (userUploadInstance == null) {
            notFound()
            return
        }

        if (userUploadInstance.hasErrors()) {
            respond userUploadInstance.errors, view:'edit'
            return
        }

        userUploadInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'UserUpload.label', default: 'UserUpload'), userUploadInstance.id])
                redirect userUploadInstance
            }
            '*'{ respond userUploadInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(UserUpload userUploadInstance) {

        if (userUploadInstance == null) {
            notFound()
            return
        }

        userUploadInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'UserUpload.label', default: 'UserUpload'), userUploadInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'userUploadInstance.label', default: 'UserUpload'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
