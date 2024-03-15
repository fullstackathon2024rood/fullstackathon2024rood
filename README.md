# fullstackathon2024rood

## Authors

- Emil van Galen
- Jasper Bogers
- Rick Suijkerbuijk
- Quinton Weenink
- Gerald van den Hengel

## Documentation

## Achievements

### captain unity
- Brainwave Conductor - 5 pts (brainstoremed)
- Team Harmony - 5 pts (all pushed something)
- Documentation Guru - 5 pts

### cyber sentinel
- none

### doctor stack
- none

### Pixel Boy
- The Chroma Explorer - 5 pts (night vision)
- Jakob Nielsen’s Nightmare - 5 pts (nightmare mode)
- Pixel Pioneer - 5 pts (reusable component)

### To claim later on (but already implemented)
- Adaptive mastermind - 5 pts (Pixel Boy)

## Architecture

### Backend

#### Goal
This application should accept an HTTP request containing an image, provide it to a tool for image AI obfuscation, and
return the obfuscated image in its response. It should not store either the original nor the obfuscated image.

#### Key technology
* Gradle
* Kotlin
* Javalin

#### API
The application can receive a multipart POST request that contains 2 fields:
- file
- message-text

#### Run and use

Build using `./gradlew build`
Run using `./gradlew run`

Example call using cURL:
`curl -v -F message-text=testmessage -F file=@src/main/resources/plain_black.jpeg localhost:7070/obfuscate`

### Frontend

#### dev environment
- npm install
- npm run

#### Goal

#### Key technology
* Lit
*
