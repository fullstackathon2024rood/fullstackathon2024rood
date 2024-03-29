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
- Documentation Guru - 5 pts (README with instructions)
- Code Fusion - 5 pts (a frontender commited to backend, and a backender commited to frontend)
- Code buddy - 5 pts (all reviewed pull requests)

### cyber sentinel
- Hotfix haste - 5 pts (GitHub Actions deployt changes binnen 2 minuten)
- Geolocation Guardian - 5 pts (Digital Ocean Amsterdam; Tensorflow modellen van jsdeliver CDN Amsterdam; mavencentral cache in Amsterdam)
- Compliance champion - 5 pts (uplodaded en rendered files worden niet opgeslagen voor of na obfuscation)

### doctor stack
- NoSQL Navigator - 5 pts (we kiezen bewust voor geen relationale database)
- Server lesser - 5 pts (not allowed objects detection voor Tensorflow)
- Simon Drown - 5 pts (System en Container diagram in README is C4)
- Shift left extremist - 5 pts (DependaBot van GitHub Actions toevoegen)
- AI Explorer - 5 pts (object detection and classification wordt door TensorflowJS gedaan, wat AI is)

### Pixel Boy
- The Chroma Explorer - 5 pts (night vision)
- Jakob Nielsen’s Nightmare - 5 pts (nightmare mode)
- Pixel Pioneer - 5 pts (reusable component)
- Adaptive mastermind - 5 pts (tot >23px)
- User Maestro - 5 pts (standaard HTML; keyboard-only via tabs)

### To claim later on (but already implemented)
- (Cyber Sentinel) Crypto Alchemist - 5 pts (Images are sent via HTTPS)

### In the process of implementing
- (Cyber Sentinel) Fortress Builder - 5 pts (Digital Ocean droplet exposet niets; infra details & credentials staan niet in de repo; non-compliant images worden genegeerd; obfuscated JavaScript)

## Architecture

### C4

#### System

![C4 System Context](fullstackathon2024rood-c4-system.png)

#### Container

![C4 Container](fullstackathon2024rood-c4-container.png)

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
- file. This must be a JPEG file (extension .jpg or .jpeg)
- message-text. This is a String that is entirely ignored.

#### Run and use

Build using `./gradlew build`

Run using `./gradlew run`

The application will run at port 8080, will only accept a PUT request.

Example call using cURL:
`curl -X PUT -v -F message-text=testmessage -F file=@backend/src/main/resources/plain_black.jpeg localhost:8080/obfuscate`

### Frontend

#### dev environment
- npm install
- npm run

#### Goal

#### Key technology
* Lit
* Tensorflow
