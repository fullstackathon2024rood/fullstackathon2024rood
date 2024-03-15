package com.jdriven.obfuscator.services.obfuscate

import org.slf4j.LoggerFactory
import java.io.InputStream

class Obfuscator {
    fun obfuscate(file: InputStream): InputStream? {
        // TODO call an external tool to obfuscate the provided file
        val obfuscatedFilename = "plain_black.jpeg"
        logger.info("Generating obfuscated file $obfuscatedFilename")
        val obfuscatedFile = ClassLoader.getSystemResourceAsStream(obfuscatedFilename)
        return obfuscatedFile
    }

    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }
}
