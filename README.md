# Timothy
=======
> responsive and  mobile first  front end framework


### 介绍 

鉴于kissy只是一个类JQ库，虽然大而全， 但在html结构以及css样式方面并没有做相应的统一标准。 在集团内部， 各个公司标准也不统一， 也并且也没有一个完善的前端库。

与此同时mobile和responsive的需求越来越多，却没有统一的解决方案，在相关业务上开发都在不断的重写组件。 有人提出不是有bts吗，有，但是bts是基于jquery的，和kissy不统一。 除了内部系统能用以外，业务上面基本不能使用。 

那集团难道就没有一个bootstrap for kissy，也有， source在github上，不过已经有两年没有更新的。 这意味着bts版本已经很低。 

从另外一个角度来讲， bts v3虽然也是mobile first， 但对于mobile开发并不是首选，bts下面有一个新的rachet框架的专门针对mobile开发。 另外一些如foundation, semantic-ui很多方面都比bts优秀。 

timothy要做的就是做一个kissy版本的mobile first ui框架。 意解决开发过程中mobile和responsive统一的问题， kissy兼容问题。

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
 
 