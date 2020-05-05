---
category: Components
type: Basic
title: Table Layout
---

category: Components
type: Basic
title: Tree
---

## When to use

Tree

## API

Tree Component properties:

properties | description | type | default | isRequire
-----|-----|-----|------
treeData | tree data | Array | - | true
type | tree data | number | - | true
onDrop | drop | - | - | false
handleValue | path value | - | - | false


## TreeData


const tree = {
            code: "12",
            data:[{
                id: "1",
                title: "算子",
                child: [{
                    id: "2",
                    typeName: "输入",
                    total: "10",  
                    icon: "2",
                    type: "as",
                    child: [{
                        id: "3",
                        type: "input",
                        icon: "3",
                        name: "项目一",
                        length: "12",
                        size: "32",
                        inputs: [{
                            id: "4",
                            name: "dw",
                            type: "1s",
                        }],
                        outputs: [{
                            id: "5",
                            name: "33",
                            type: "dw",
                        }]
                    },
                    {
                        id: "6",
                        type: "ouput",
                        icon: "4",
                        name: "项目二",
                        length: "12",
                        size: "42",
                        inputs: [{
                            id: "7",
                            name: "er",
                            type: "wr",
                        }],
                        outputs: [{
                            id: "8",
                            name: "er",
                            type: "34",
                        }]
                    }]
                },
                {
                    id: "9",
                    typeName: "输出",
                    total: "102",  
                    icon: "2",
                    type: "as",
                    child: []
                    
                }]       
            }]
}
