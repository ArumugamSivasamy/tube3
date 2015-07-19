package com.tube.upload



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import org.codehaus.groovy.grails.plugins.web.taglib.ApplicationTagLib
import org.springframework.web.multipart.MultipartHttpServletRequest
import org.codehaus.groovy.grails.web.context.ServletContextHolder
import org.springframework.web.multipart.MultipartFile
import grails.converters.JSON
import grails.converters.XML
import com.tube.profile.*

@Transactional(readOnly = true)
class UserUploadController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
	FileUploaderService fileUploaderService
	
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
	
	
	def upload(){
		respond new UserUpload(params)
		
	}

    @Transactional
    def save(UserUpload userUploadInstance) {
        if (userUploadInstance == null) {
            notFound()
            return
        }
		
		
		if(request instanceof MultipartHttpServletRequest)
		{
			MultipartHttpServletRequest mpr = (MultipartHttpServletRequest)request;
			MultipartFile file = mpr.getFile('uploadFile')
			def sourceFileName = file?.getOriginalFilename()
			if (!file?.isEmpty()) {
					userUploadInstance.fileName = sourceFileName
					def userInstance = User.get(2)
					def cal = Calendar.instance
					def dt = "${cal.get(Calendar.YEAR)}${cal.get(Calendar.MONTH) + 1}${cal.get(Calendar.DATE)}_${cal.get(Calendar.HOUR_OF_DAY)}${cal.get(Calendar.MINUTE)}${cal.get(Calendar.SECOND)}"
					println "dt ${dt}"
					def targetDirName = "files//attachments//extension//${userInstance?.id?:'unknown_sizing_request'}"
					userUploadInstance.filePath = fileUploaderService.uploadFile(file, dt + "." + sourceFileName, targetDirName)
					userUploadInstance?.user = userInstance
					userUploadInstance.fileType = file.getContentType()
					//userUploadInstance.fileSize = new File(userUploadInstance.destinationFile).length()
					userUploadInstance.save(failOnError:true)
					//def g = new ApplicationTagLib()
					//def fileLink = g.createLink(controller: 'dataFile', action: 'get', id : dataFileInstance.id, absolute: 'true')
					//def fileUri = "<a href=\"${fileLink}\"> ${sourceFileName} </a>"
					
			}
		} else {
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

	def get(Long id) {
		def userUploadInstance = UserUpload.get(id)
		if (userUploadInstance) {
			def file = new File(userUploadInstance.filePath)
			if (file) {
				response.setContentType("application/octet-stream")
				response.setHeader("Content-disposition", "attachment;filename=${file.getName()}")
				response.outputStream << file.newInputStream()
			}
		}
		return
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
