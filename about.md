##关于是否需要重新构建一个基于kissy的bootstrap v3？ 
---
### about
---
kissy是集团的公用前端库， 已经算是大而全。但是kissy对于html结构， css样式的关注度却很低，导致的结果是各个项目的html结构不统一， 各个公司都在不断重新造轮子。 在bts中， kissy对应了JQ，bts的作用就是像胶水一样，将jQuery和html以及样式粘在了一起。 这就是为什么bts简单易用。  

说是重新构建是因为目前已经有一个[kissy-bootstrap](https://github.com/dxq613/kissy-bootstrap) .  last commit已经是2 years ago，bts 是v2.
并且这里说bootstrap只是举例，因为大家都了解bootstrap，类似bootstrap的框架很多， 如semantic－ui， foundation. 各有优劣。 所以如果说重新构建， 不会只是更改bts代码。 

### problems
----
1. **后端开发同学需求**  <br>
集团有很多内部系统， 通常很多小系统都是后台开发人员编写。其中的问题就是开发人员对前端了解甚少，所以只能使用bts来做基础框架，然而bts使用的是jquery，而后端同学不仅要懂jQuery还要懂Kissy， 这样的提高了开发成本。 

2. **mobile** <br>
mobile化已成为必然， 然后开发mobile页面的同学都了解，mobile和pc的巨大差异， 导致原先的很多组件都得重写， 然后重写过程中没有一个标准。各个项目都在不断的重造轮子重写这些组件。  

3. **responsive需求** <br>
目前响应式的页面需求越来越多，但是kissy却没有一个可用的responsive grid system。 


### conclusion
---

如果能够为kissy构建一个mobile first的前端基础框架， 这些问题都能够解决， 不知道集团内部有没有在解决这些问题的现有项目， 如果有求告知 && I want to join in.
