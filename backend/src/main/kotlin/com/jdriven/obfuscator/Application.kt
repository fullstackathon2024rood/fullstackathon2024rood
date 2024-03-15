package com.jdriven.obfuscator

import io.javalin.Javalin
import io.javalin.util.FileUtil

fun main() {

    // Add pages & actions to Javalin
    val app = Javalin.create()

    app.post("/obfuscate-me") { ctx ->
        ctx.uploadedFiles("files").forEach {
            FileUtil.streamToFile(it.content(), "upload/${it.filename()}")
        }
        ctx.html("Upload successful")
    }

    app.start(7070)
}

