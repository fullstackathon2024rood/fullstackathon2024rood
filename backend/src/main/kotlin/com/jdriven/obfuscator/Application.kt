package com.jdriven.obfuscator

import io.javalin.Javalin

fun main() {

    // Add pages & actions to Javalin
    val app = Javalin.create()
    app.start(7070)
}

