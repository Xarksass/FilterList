/*! ========================================================================
 * FilterList: filterlist.js v1.1.0
 * ========================================================================
 * Copyright 2015, Salvatore Di Salvo (disalvo-infographiste[dot]be)
 * ======================================================================== */

(function ($) {
    'use strict';


    // SELECT FILTER PUBLIC CLASS DEFINITION
    // ====================================

    var FilterList = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, this.defaults(), options)
        this.structure = $.extend({}, this.parts())
    }

    FilterList.VERSION  = '1.2.0'

    FilterList.DEFAULTS = {
        method : 'recursive',
        items  : '.items'
    }

    FilterList.prototype.defaults = function() {
        return {
            select      : FilterList.DEFAULTS.select,
            method      : this.$element.attr('data-method') || FilterList.DEFAULTS.method,
            items       : this.$element.attr('data-items') || FilterList.DEFAULTS.items
        }
    }

    FilterList.prototype.parts = function() {
        return {
            $items : $(this.options.items, this.$element)
        }
    }

    FilterList.prototype.filter = function( section, val ) {
        var $select = this.$element;

        if ( val && $select.data('bs.dropdownselect') ) {
            var $selected = $('.items.selected', $select);

            if($selected.length) {
                $selected.each(function(){
                    if( $(this).data(section) != val ) {
                        $select.bootstrapSelect('clear');
                    }
                });
            }
        }

        this.filterItem( section, val, this.options.method );

        if ( $('.live-filtering', $select).data('liveFilter') )
            $('.live-filtering', $select).liveFilter('initAC');
    }

    FilterList.prototype.filterItem = function( section, val, method ) {
        this.structure.$items.each(function(){
            var ref = $(this).data('ref'),
                valid = $(this).data('valid');

            if( ref != undefined && valid != undefined ) {
                ref = ref.split(',');
                valid = valid.split(',');

                if ( ref.length == valid.length ) {
                    if (val != null && val != '') {
                        if (ref.indexOf(section) > -1) {
                            valid[ref.indexOf(section)] = val;
                        }else {
                            ref = ref.concat([section]);
                            valid = valid.concat([val]);
                        }
                    } else {
                        valid.splice(ref.indexOf(section),1);
                        ref.splice(ref.indexOf(section),1);
                    }
                }
            } else if (val != null && val != '') {
                ref = [section];
                valid = [val];
            }

            if( method == 'recursive' ) {
                var skip = true;
                for( var c = 0; c < ref.length; c++ ) {
                    if ( valid[c] != $(this).data(ref[c])) {
                        skip = false;
                    }
                }
            } else if ( method == 'additionnal' ) {
                var skip = false;
                for( var c = 0; c < ref.length; c++ ) {
                    if ( valid[c] == $(this).data(ref[c])) {
                        skip = true;
                    }
                }
            }

            if (ref.length > 0) {
                $(this).data('ref',ref.toString()).data('valid',valid.toString());
            } else {
                $(this).removeData('ref').removeData('valid');
            }

            if ( !skip ) {
                $(this).addClass('disabled').hide();
            } else {
                $(this).removeClass('disabled').show();
            }
        });
    }


    // SELECT FILTER PLUGIN DEFINITION
    // ==============================

    function Plugin() {
        var arg = arguments;
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('FilterList');
            var method = arg[0];

            if( typeof(method) == 'object' || !method ) {
                var options = typeof method == 'object' && method;
                $this.data('FilterList', (data = new FilterList(this, options)));
            } else {
                if (data[method]) {
                    method = data[method];
                    arg = Array.prototype.slice.call(arg, 1);
                    if(arg != null || arg != undefined || arg != [])  method.apply(data, arg);
                } else {
                    $.error( 'Method ' +  method + ' does not exist on jQuery.FilterList' );
                    return this;
                }
            }
        })
    }

    var old = $.fn.listFilter

    $.fn.listFilter             = Plugin
    $.fn.listFilter.Constructor = FilterList


    // SELECT FILTER NO CONFLICT
    // ========================

    $.fn.toggle.noConflict = function () {
        $.fn.listFilter = old
        return this
    }


    // SELECT FILTER DATA-API
    // =====================

    /*$(function() {
        $('[data-filter]').listFilter();
    });*/
}(jQuery));