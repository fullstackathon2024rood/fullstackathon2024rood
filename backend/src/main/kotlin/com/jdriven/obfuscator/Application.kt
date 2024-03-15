package com.jdriven.obfuscator

import io.javalin.Javalin

fun main() {
    // Add pages & actions to Javalin
    val app =
        Javalin.create {
                config ->
            config.useVirtualThreads // Use virtual threads (based on Java Project Loom)
        }

    app.post("/obfuscate") { ctx ->
        val messageText = ctx.formParam("message-text") // ignore for now
        val fileContent = ctx.uploadedFile("file")?.content()

        // TODO send the file to the obfuscator tool, and fetch the result

        fileContent?.let { ctx.result(fileContent) } ?: ctx.status(500)
    }

    app.start(7070)
}
