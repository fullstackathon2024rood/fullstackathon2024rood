package com.jdriven.obfuscator.services.file

import io.javalin.http.UploadedFile
import org.slf4j.LoggerFactory
import java.io.InputStream

class FileExtractor {
    fun extractOriginalFile(uploadedFile: UploadedFile): InputStream {
        logger.info("Found uploaded file ${uploadedFile.filename()}")
        return uploadedFile.content()
    }

    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }
}
