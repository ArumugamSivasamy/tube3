/* ****************************************************************************************************
 **  Copyright 2014 by Vyoog Information Pvt Ltd. All rights reserved.                                   **
 **                                                                                                      **
 **    This software is the confidential and proprietary information of Vyoog Information Pvt Ltd.       **
 **    You shall not disclose such confidential and proproprietary information and                       **
 **    shall use it only in accordance with the terms of the license agreement you entered into with     **
 **    Vyoog Information Pvt Ltd.                                                                        **
 **
 ********************************************************************************************************* */
 
 /* *********************************************************************************************************
 ** Revision summary:
 **     File name              : FileUploaderService.groovy
 **     Revision number        : v1.6.4
 **     Created By             : Vyoog Team
 **     Created Date           : Fri Dec 12 2014 11:34:43 PM
 **     Last Modified by       : Vyoog Team
 **     Last Modified date     : Mon Dec 22 2014 04:41:00 PM
 ********************************************************************************************************* */

package com.tube.upload

import org.springframework.web.multipart.MultipartFile
import org.codehaus.groovy.grails.web.context.ServletContextHolder
import org.apache.commons.lang.StringUtils;
import groovy.util.logging.*

@Log4j
class FileUploaderService {

	boolean transactional = true

	def String uploadFile(MultipartFile file, String name, String destinationDirectory) {

		def servletContext = ServletContextHolder.servletContext
		def storagePath = servletContext.getRealPath(destinationDirectory)
		log.debug "DEBUG: FileUploaderService:uploadFile - storage dir: ${storagePath}"

		// Create storage path directory if it does not exist
		def storagePathDirectory = new java.io.File(storagePath)
		if (!storagePathDirectory.exists()) {
			print "DEBUG: FileUploaderService:uploadFile - Creating directory : ${storagePath}"
			if (!storagePathDirectory.mkdirs()) {
				log.debug "ERROR: FileUploaderService:uploadFile - Creating directory : ${storagePath}"
				return null
			}
		}

		// Store file
		if (!file.isEmpty()) {
			log.debug "DEBUG: original file name is: ${file.getOriginalFilename()}"
			name = StringUtils.deleteWhitespace(name)
			def trgt = new java.io.File("${storagePath}/${name}")
			file.transferTo(trgt)
			
			/*
			def cfg = new ConfigSlurper().parse(trgt.toURL())
			cfg.each() {
				if (it.key.equals("Data") ||it.key.equals("Advanced") || it.key.equals("Activity") || it.key.equals("SizingData")) {
					it.value.each() { it2 ->
						log.debug "	${it2.key} = ${it2.value}"
					}
				} else {
					log.debug "${it.key} = ${it.value}"
				}
			}
			*/

			log.debug "DEBUG: FileUploaderService:uploadFile - Saved file: ${storagePath}/${name}"
			return trgt.getAbsolutePath()

		} else {
			log.debug "File ${file.inspect()} was empty!"
			return null
		}
	}
	
	
	def configFromFile(MultipartFile file) {
		def servletContext = ServletContextHolder.servletContext
		if (!file.isEmpty()) {
			log.debug "DEBUG: original file name is: ${file.getOriginalFilename()}"
			File tmpFile = new File("tmptmptmp.cfg")
			file.transferTo(new File("tmptmptmp.cfg"))
			
			if (!tmpFile.isEmpty()) {
				def cfg = new ConfigSlurper().parse(tmpFile.toURL())
				return cfg
			}
		} else {
			log.debug "File ${file.inspect()} was empty!"
			return null
		}
	}
		
}
