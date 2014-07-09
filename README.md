# Timothy
=======
> responsive and  mobile first  front end framework


### 介绍 

 ....
 

### Timothy设计
---
#### 命名

基于BEM（block， element，modifier）和 OOCSS 的方式来命名 ，用过bts都知道bts的语义化很差， 使用组件以及布局的过程中，类名复杂。 Timothy将会借用BEM以及借鉴semantic-ui的命名方式来实现。 


#### 网格系统 
网格系统：

1. grid 
2. blockgrid


网格系统和传统的网格系统有些不同，会利用media query做responsive的网格设计， 将屏幕分为small, media, large三个level， 统一12格布局， 网格系统的设计借鉴foundation的设计。 ［文档］（todo）


#### 基础元素

基础元素，常用的基本inline元素的基本样式， 针对基本元素将设计不同的theme。 

1. buttons
2. form els
3. table
4. list
5. icon
6. image
7. progress
8. label
9. header
...

#### 组件

组件的设计将会利用现有的kissy gallery来整合 

1. navigation
2. navbar
3. form group
4. modal
5. menu
....

todo 文档

### 开发

#### 开发工具 
1. gulp
2. nodemon
3. **command**: `nodemon gulpfile.js -e less,js` 

#### 测试
使用karma，mocha来做BDD


### 已完成 

*  ~~grid~~ 
*  ~~block grid~~ 
*  ~~visibility~~  
*  ~~basic button~~


### todo
---
-  [] typography (2014-7-9) 
-  [] icons
-  [] icon-button
-  [] form els
-  [] list
...
 
 