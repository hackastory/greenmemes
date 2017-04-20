window.Model = (function() {
    return vk.subclass(vk.FieldbookModel, {
        constructor : function() {
            vk.FieldbookModel.apply(this, arguments);
        },

        parseData : function(data) {
            data.meta = this.parseMeta(data.meta);
            return data;
        }
    });
})();