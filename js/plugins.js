// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
window.addEventListener('load',function(){
    let toFilter = document.getElementById('toFilter');
    let filter = new filterList(toFilter,{});
    let exemple = document.getElementById('exemple');
    exemple.addEventListener('change',function(){
        toFilter.filterList.filter(exemple.getAttribute('id'),exemple.value);
    });

});
/*$(function(){
    $('#toFilter').listFilter();

    $('#exemple').change(function(){
        $('#toFilter').listFilter( 'filter', $(this).attr('id'), $(this).val());
    });
});*/
