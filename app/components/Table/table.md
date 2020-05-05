---
category: Components
type: Basic
title: Table Layout
---

## When to use

Table Layout

## API

BasicTable Component properties:

properties | description | type | default | isRequire
-----|-----|-----|------
columnData | columns | array | - | true
data | list data | array | - | true
emptyText | empty text for has no data | string | - | true
page | page | object | - | false
type | table type: 1: has title 2: small table, 3: waterfall, 4: fold table | number | 1 | false
title | title render when noStyle is false | - | false
caption | caption render when  noStyle is false | - |  false
setting | action buttons at the top of the table when noStyle is false | - | false
scrollHeight | scroll height for waterfall | number | 300 | false
key | table key | string | - | false
onChange | on change page | function | - | false
getScrollData | get waterfall data when scroll to bottom | function | - | false
