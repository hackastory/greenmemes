(function(root) {
    var CONF = {
        'bookId' : '58f8ff185dbcf50300a4e3cb'
    };

    if (typeof module === 'object' && module.exports) {
        module.exports = CONF;
    } else {
        root.CONF = CONF;
    }
})(this);