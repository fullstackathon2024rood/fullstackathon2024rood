plugins {
    kotlin("jvm") version ("1.9.23")
    id("application")
}

group = "com.jdriven"
version = "1.0-SNAPSHOT"
application.mainClass = "com.jdriven.obfuscator.ApplicationKt"

kotlin {
    jvmToolchain(21)
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.javalin:javalin:6.1.3")
    implementation(platform("org.eclipse.jetty:jetty-bom:11.0.17")) // Use Jetty BOM
    implementation("org.reflections:reflections:0.9.11") // Allows looking up annotated classes
    implementation("org.slf4j:slf4j-simple:2.0.7") // Add logging
    testImplementation("org.jetbrains.kotlin:kotlin-test:1.8.10")
}

tasks.test {
    useJUnitPlatform()
}
