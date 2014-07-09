
基本的grid方式
---
```html 
    <div class="row display">
      <div class="small-2 large-4 columns">
        <span class="show-for-small">2</span>
        <span class="hide-for-small">4</span>
      </div>
      <div class="small-4 large-4 columns">4</div>
      <div class="small-6 large-4 columns">
        <span class="show-for-small">6</span>
        <span class="hide-for-small">4</span>
      </div>
    </div>
```  

philosophy
---
小屏幕到到屏幕的适配
Small grids expand to large screens easier than large grids cram into small screens.

Medium sized screens will inherit styles from small, unless you specify a different layout, using the medium grid classes.


nested
---
```html 
<div class="row">
  <div class="small-8 columns">8
    <div class="row">
      <div class="small-8 columns">8 Nested
        <div class="row">
          <div class="small-8 columns">8 Nested Again</div>
          <div class="small-4 columns">4</div>
        </div>
      </div>
      <div class="small-4 columns">4</div>
    </div>
  </div>
  <div class="small-4 columns">4</div>
</div>
``` 

Incomplete Rows
---
最后一个column float right
 <div class="medium-3 columns end">3 end</div> 阻止
In order to work around browsers' different rounding behaviors, Foundation will float the last column in a row to the right so the edge aligns. If your row doesn't have a count that adds up to 12 columns, you can tag the last column with a class of end in order to override that behavior.


居中
---
<div class="row">
  <div class="small-3 small-centered columns">3 centered</div>
</div>
<div class="row">
  <div class="small-6 large-centered columns">6 centered</div>
</div>
<div class="row">
  <div class="small-9 small-centered large-uncentered columns">9 centered</div>
</div>
<div class="row">
  <div class="small-11 small-centered columns">11 centered</div>
</div>

offset， pull ， push
---
也是分large， medium， small






##asdfasd


sad
