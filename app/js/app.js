(function() {
    var model = new Model(CONF);
    var view;

    function main() {
        FastClick.attach(document.body);
        vk.setupTouchClasses();

        model.loadData(function() {
            window.view = new View(model);
        });
    }

    main();
})();