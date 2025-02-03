[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="features" type="java.util.ArrayList" --]
[#import "../../views/toggle/toggle.ftl" as Toggle]

[#setting locale=locale]

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="view-transition" content="same-origin" />

  <link rel="icon" href="[@assetUrl path='images/icon.svg'/]">
  <link rel=”mask-icon” href=”[@assetUrl path='images/icon.svg'/]” color=”#000000">
  <link rel="stylesheet" href="[@assetUrl path='styles/main.min.css'/]" />

  <script type="module" src="[@assetUrl path='hotwired__turbo/8.0.12/dist/turbo.es2017-esm.js'/]"></script>

  <title>${title}</title>
</head>
<body>
<div class="feature-toggles">
  <div class="layout--header">
    [#include "../../views/header/header.ftl"]
  </div>
  <div class="layout--content">
      [#list features as feature]
        [#assign toggleId="toggle-${feature_index}" /]

        <label class="feature--label" for="${toggleId}">
          <span class="feature--name">${feature._name}</span>
          <span class="feature--description">[@localize key="feature-toggles.created" locale=locale /] ${feature.createdDate.format("MEDIUM_DATE")} ${feature.createdDate.format("SHORT_TIME")}</span>
        </label>
        <form class="feature-toggles--form-toggle">
          [@Toggle.render
            id=toggleId
            name=feature._name
            checked=feature.enabled /]
        </form>

        <form class="feature-toggles--form-publish">
          <button
            class="button theme-accent"
            type="submit"
            name="publish"
            [#-- TODO Use id --]
            value="${feature._name}">

            Publish
          </button>
        </form>
      [/#list]
  </div>
</div>
</body>
</html>
