package com.jdriven.obfuscator.services.exif

import org.apache.commons.imaging.formats.jpeg.exif.ExifRewriter
import java.io.ByteArrayOutputStream
import java.io.InputStream

class ExifRemover {
    fun removeExif(
        fileInputStream: InputStream,
        extension: String,
    ): ByteArrayOutputStream {
        val outputStream = ByteArrayOutputStream()
        if (extension == ".jpeg" || extension == ".jpg") {
            ExifRewriter().removeExifMetadata(fileInputStream, outputStream)
        }
        return outputStream
    }
}
