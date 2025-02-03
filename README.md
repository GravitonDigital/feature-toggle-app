# Feature Toggle

This is a feature toggle application for Enonic XP. It allows you to create feature toggles and use them in your applications.

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/xp-feature-toggle)](https://repo.itemtest.no/#/releases/no/item/xp-feature-toggle)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/ItemConsulting/feature-toggle-app/raw/main/src/main/resources/admin/tools/featuretoggle/featuretoggle.svg?sanitize=true">
  <img alt="Logo" src="https://github.com/ItemConsulting/feature-toggle-app/raw/main/src/main/resources/application.svg?sanitize=true" width="150">
</picture>

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
