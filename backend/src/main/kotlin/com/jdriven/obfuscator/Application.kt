package com.jdriven.obfuscator

import io.javalin.Javalin
import io.javalin.http.UploadedFile
import org.slf4j.LoggerFactory
import java.io.InputStream

fun main() {
    // Add pages & actions to Javalin
    val app =
        Javalin.create {
                config ->
            config.useVirtualThreads // Use virtual threads (based on Java Project Loom)
        }

    val obfuscator = Obfuscator()

    app.post("/obfuscate") { ctx ->
        val messageText = ctx.formParam("message-text") // ignore for now
        val fileContent = ctx.uploadedFile("file")?.let { obfuscator.extractOriginalFile(it) }

        fileContent?.let {
            obfuscator.obfuscate(fileContent)?.let { obfuscatedFile -> ctx.result(obfuscatedFile) }
        } ?: {
            ctx.status(500)
        }
    }

    app.start(8080)
}

class Obfuscator {
    fun extractOriginalFile(uploadedFile: UploadedFile): InputStream {
        logger.info("Found uploaded file ${uploadedFile.filename()}")
        return uploadedFile.content()
    }

    fun obfuscate(file: InputStream): InputStream? {
        // TODO call an external tool to obfuscate the provided file
        val obfuscatedFile = "/resources/plain_black.jpeg"
        logger.info("Generating obfuscated file $obfuscatedFile")
        return ClassLoader.getSystemResourceAsStream(obfuscatedFile)
    }

    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }
}
