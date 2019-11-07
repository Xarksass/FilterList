# FilterList
## Description
FilterList allows you to filter a list based on a value passed (for exemple when choosing an option in a select).

Very useful to reduce the number of options in select list or simply filtering it based on option.

Two methods of filtering :
* Recursive : each filter will reduce the number of items in the list;
* Additionnal : all items that are valid for at least one filter will be shown.

## Requirements
No requirements except some polyfill like modernizr.

## Basic usage
This is the basic html structure needed to use this plugin

Exemple of list of filters
``` html
<label for="exemple">Choose an option to filter the list</label>
<select name="exemple" id="exemple">
    <option value selected>Choose a filter</option>
    <option value="animals">Animals</option>
    <option value="vegetals">Vegetals</option>
    <option value="materials">Materials</option>
</select>
```

Exemple of list to be filtered
``` html
<ul id="toFilter">
    <li class="items" data-exemple="animals">Firefox</li>
    <li class="items" data-exemple="vegetals">Rose</li>
    <li class="items" data-exemple="materials">Rock</li>
    <li class="items" data-exemple="vegetals">Tree</li>
    <li class="items" data-exemple="animals">Dog</li>
    <li class="items" data-exemple="materials">Water</li>
    <li class="items" data-exemple="animals">Cat</li>
    <li class="items" data-exemple="vegetals">Grass</li>
    <li class="items" data-exemple="materials">Air</li>
</ul>
```

Exemple of initialisation of the plugin
``` javascript
window.addEventListener('load',function(){
    let toFilter = document.getElementById('toFilter');
    new filterList(toFilter,{});
    let exemple = document.getElementById('exemple');
    exemple.addEventListener('change',function(){
        toFilter.filterList.filter(exemple.getAttribute('id'),exemple.value);
    });
});
```