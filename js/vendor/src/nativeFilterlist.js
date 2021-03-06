/*! ========================================================================
 * FilterList for nativeFilterlist.js v1.0.0
 * ========================================================================
 * Copyright 2019, Salvatore Di Salvo (disalvo-infographiste[dot]be)
 * ======================================================================== */
'use strict';
/**
 * FilterList for nativeFilterlist.js v1.0.0
 */
class filterList {
    /**
     * Constructor
     * @param {Element} element
     * @param {Object} options
     */
    constructor(element, options) {
        this.version = '1.0.0';
        this.element = element;
        this.defaults = {
            method : 'recursive',
            items  : '.items'
        };
        this.options = Object.assign({}, this.parseData(), options);
        this.structure = Object.assign({}, this.parts());
        this.element.filterList = this;
    }

    /**
     * Parse structure data to override default settings
     * @returns Object
     */
    parseData() {
        return {
            select : this.defaults.select,
            method : this.element.dataset.method || this.defaults.method,
            items  : this.element.dataset.items || this.defaults.items
        }
    }

    /**
     * Return structure elements
     * @returns Object
     */
    parts() {
        return {
            $items : this.element.querySelectorAll(this.options.items)
        }
    }

    /**
     * Verification and starting the filter function
     * @param {String} section
     * @param {String} val
     */
    filter(section, val) {
        let $select = this.element;

        if ( val && $select.bootstrapSelect !== undefined && $select.bootstrapSelect instanceof bootstrapSelect) {
            let $selected = $select.querySelectorAll('.items.selected');

            if($selected.length) {
                $selected.forEach(function(is){
                    if( is.dataset[section] !== val ) $select.bootstrapSelect.clear();
                });
            }
        }

        this.filterItem( section, val, this.options.method );
        $select.querySelectorAll('.live-filtering').forEach(function(lf){
            if(lf.liveFilter instanceof liveFilter) lf.livefilter.initAC();
        });
    }

    /**
     * Filter list base on value
     * @param {String} section
     * @param {String} val
     * @param {String} method
     */
    filterItem(section, val, method) {
        this.structure.$items.forEach(function(i){
            let ref = i.dataset.ref,
                valid = i.dataset.valid;

            if(typeof ref === 'string' && typeof valid === 'string') {
                ref = ref.split(',');
                valid = valid.split(',');

                if(ref.length === valid.length) {
                    if (val !== null && val !== '') {
                        if (ref.indexOf(section) > -1) {
                            valid[ref.indexOf(section)] = val;
                        }
                        else {
                            ref = ref.concat([section]);
                            valid = valid.concat([val]);
                        }
                    }
                    else {
                        valid.splice(ref.indexOf(section),1);
                        ref.splice(ref.indexOf(section),1);
                    }
                }
            }
            else if (val !== null && val !== '') {
                ref = [section];
                valid = [val];
            }

            let skip = method === 'recursive';
            if( method === 'recursive' ) {
                for( var c = 0; c < ref.length; c++ ) {
                    if ( valid[c] !== i.dataset[ref[c]] ) skip = false;
                }
            }
            else if ( method === 'additionnal' ) {
                for ( var c = 0; c < ref.length; c++ ) {
                    if (valid[c] === i.dataset[ref[c]]) skip = true;
                }
            }

            if (ref.length > 0) {
                i.dataset.ref = ref.toString();
                i.dataset.valid = valid.toString();
            }
            else {
                delete(i.dataset.ref);
                delete(i.dataset.valid);
            }

            i.classList.toggle('disabled',!skip);
            i.classList.toggle('hide',!skip);
        });
    }
}