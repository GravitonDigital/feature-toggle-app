# Feature Toggles


[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/xp-feature-toggle)](https://repo.itemtest.no/#/releases/no/item/xp-feature-toggle)

![Feature toggle logo](src/main/resources/application.svg)

## Deploying

### Building

To build the project run the following code

```bash
enonic project build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
./gradlew publishToMavenLocal
```

## Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
