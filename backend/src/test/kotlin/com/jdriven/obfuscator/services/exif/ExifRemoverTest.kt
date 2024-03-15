package com.jdriven.obfuscator.services.exif

import kotlin.test.Test
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ExifRemoverTest {
    @Test
    fun `exif metadata should be removed from a jpeg file`() {
        // Given
        val exifRemover = ExifRemover()
        val file = ClassLoader.getSystemResourceAsStream("plain_black_test.jpeg")!!

        // When
        val output = exifRemover.removeExif(file, ".jpeg")

        // Then
        assertNotNull(output)
        assertTrue { output.toByteArray().isNotEmpty() }
    }

    @Test
    fun `a non-jpeg file should be accepted but returns nothing`() {
        // Given
        val exifRemover = ExifRemover()
        val file = ClassLoader.getSystemResourceAsStream("nonsenseimage.nonsenseextension")!!

        // When
        val output = exifRemover.removeExif(file, ".nonsenseextension")

        // Then
        assertNull(output)
    }
}
