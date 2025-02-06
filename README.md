# Feature Toggles

This application provides an admin tool to interact with _feature toggles_ created by the [Feature Toggles Lib](https://github.com/ItemConsulting/lib-xp-feature-toggles).
A feature toggle is a boolean flag that can be used in the code to enable or disable features in your XP-application.

Common usages of feature toggles are:
 - Merging partially implemented features into your codebase, but not exposing them to the end users
 - A feature switch (kill switch?) that can be used by the admins/editors
 - Enable a feature on the `"draft"` branch, but not on `"master"`.

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/xp-feature-toggle)](https://repo.itemtest.no/#/releases/no/item/xp-feature-toggle)

![Feature toggle logo](src/main/resources/application.svg)

## Usage

### Application code

Install [Feature Toggles Lib](https://github.com/ItemConsulting/lib-xp-feature-toggles) in your application to create
new _feature toggles_ and check if the feature is enabled.

_Example:_

```typescript
import { create, isEnabled } from "/lib/feature-toggles";

// We recommend doing this in the main.{js,ts} file.
create({
  name: "my-feature",
  enabled: false,
  description: "Use new and experimental code for checkout form",
});

// ...later in the controller code

if (isEnabled("my-feature")) {
  // facilitate rendering of "my feature"
}
```

> [!TIP]
> See the [documentation](https://github.com/ItemConsulting/lib-xp-feature-toggles/blob/main/README.md) of the complete API-surface.

### Headless

This app also exposes a GraphQL-interface through the [Guillotine app](https://market.enonic.com/vendors/enonic/guillotine).

The following fields are exposed:
 - `isEnabled(spaceKey: string, featureKey: string, branch?: string, defaultValue?: string): boolean`
 - `getFeature(spaceKey: string, featureKey: string, branch?: string): Feature`
 - `getFeatures(spaceKey?: string, branch?: string): Feature[]`

_Example:_

```graphql
query {
  guillotine {
    # Check if a feature is enabled (returns Boolean)
    enableMyFeature: isEnabled(spaceKey: "com.example.app", featureKey: "my-feature")
    
    # List all features
    getFeatures {
      enabled
      name
      description
      spaceKey
    }
  }
}
```

## Roles

You give your users one of the following two roles to give access to the admin tool:
 
 1. `"no.item.feature-toggles.admin"`
 2. `"no.item.feature-toggles.viewer"` _(is not allowed to interact with the toggles)_

Users with the role `"system.admin"` also have the same rights as `"no.item.feature-toggles.admin"`.

## Deploying

### Building

To build the project run the following code

```bash
enonic project build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
enonic project deploy
```

### Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
