package com.jdriven.obfuscator

import com.jdriven.obfuscator.services.exif.ExifRemover
import com.jdriven.obfuscator.services.file.FileExtractor
import com.jdriven.obfuscator.services.obfuscate.Obfuscator
import io.javalin.Javalin
import io.javalin.http.ContentType
import java.io.InputStream

fun main() {
    // Add pages & actions to Javalin
    val app =
        Javalin.create { config ->
            config.useVirtualThreads // Use virtual threads (based on Java Project Loom)
        }.start(8080)

    val obfuscator = Obfuscator()
    val fileExtractor = FileExtractor()
    val exifRemover = ExifRemover()

    app.put("/obfuscate") { ctx ->
        val messageText = ctx.formParam("message-text") // ignore for now
        val uploadedFile = ctx.uploadedFile("file")
        var imageFileContent: InputStream? = null
        var imageFileType = ""

        uploadedFile?.let {
            imageFileContent = fileExtractor.extractOriginalFile(it)
            imageFileType = it.extension()
        }

        imageFileContent?.let {
            obfuscator.obfuscate(exifRemover.removeExif(it, imageFileType).toByteArray().inputStream())
                ?.let { obfuscatedFile ->
                    ctx.contentType(ContentType.IMAGE_JPEG)
                    ctx.result(obfuscatedFile)
                }
        } ?: {
            ctx.status(500)
        }
    }
}
