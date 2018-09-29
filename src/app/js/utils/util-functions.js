function isNumber(n) {
    !isNaN(parseFloat(n)) && isFinite(n);
}

function fixNavbarOnScroll () {
    var hlm = $('.header-links-menu');
    var hlu = $('.header-links-user');
    var fixedNav = 'fixed-navbar';
    if (hlu) {
        var hluHeight = $("ul").height();
        // console.log(hluHeight);
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > hluHeight ) {
            hlm.addClass(fixedNav);
        }
        else {
            hlm.removeClass(fixedNav);
        }
    });
}

var treeObjByCode = {};
var treeObjById = {};

function treeObj (tree) {
    if(tree.subcats === undefined) {
        treeObjByCode[tree.code] = tree;
        treeObjById[tree.id] = tree;
    }
    else {
        treeObjByCode[tree.code] = tree;
        treeObjById[tree.id] = tree;

        for(var i = 0; i < tree.subcats.length; ++i) {
            treeObj(tree.subcats[i]);
        }
    }
}

function hashmapByCode (tree) {
    if(tree.subcats === undefined) {
        treeObjByCode[tree.code] = tree;
    }
    else {
        treeObjByCode[tree.code] = tree;

        for(var i = 0; i < tree.subcats.length; ++i) {
            hashmapByCode(tree.subcats[i]);
        }
    }
}

function hashmapById (tree) {
    if(tree.subcats === undefined) {
        treeObjById[tree.id] = tree;
    }
    else {
        treeObjById[tree.id] = tree;

        for(var i = 0; i < tree.subcats.length; ++i) {
            hashmapById(tree.subcats[i]);
        }
    }
}

function parentsByCode (code, array) {
    if(treeObjByCode[code].parent !== undefined) {
        array.push(treeObjByCode[code]);
        parentsByCode(treeObjByCode[code].parent, array);
    }
    else {
        array.push({name: "Collection"});
    }

    return array;
}

function parentsById (id, array) {
    parentsByCode(treeObjById[id].code, array);
}

function childrenByCode (code, array) {
    if (treeObjByCode[code].subcats !== undefined) {
        for (var i = 0; i < treeObjByCode[code].subcats.length; ++i) {
            array.push(treeObjByCode[treeObjByCode[code].subcats[i].code]);
        }
    }
    return array;
}

function childrenById (id, array) {
    childrenByCode(treeObjById[id].code, array);
}

function getKeys (object) {
    if (!object) {
        return;
    }
    var arr = [];
    for (var key in object) {
        arr.push(key);
    }
    return arr;
}

function removeEmptyKeys (object) {
    if (!object) {
        return;
    }
    for (var key in object) {
        if (!object[key]) {
            delete object[key];
        }
    }
    return object;
}
