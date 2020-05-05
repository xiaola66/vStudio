---
category: Components
type: Basic
title: Iconfont
---

## When to use

Iconfont

## API

Iconfont Component properties:

properties | description | type | default | isRequire
-----|-----|-----|------
icon | icon name | string | - | true
iconClass | icon other class | object | - | false
text | icon text | any (string || tsx) | - | false
direction | icon and text direction | string | - | false
onClick | icon onClick function | func | - | false
onShow | table show | boolean | - | false
close | icon | any | - | false
## example

```
<Iconfont icon="icon-error" text="error" direction="column">
```