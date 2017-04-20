window.View = (function() {
    function View(model) {
        this.model = model;
        this.setup(this.model.getData());
    }

    View.prototype = {
        setup : function(data) {
            var self = this;
            var hash = window.location.hash;
            var state = !!hash ? hash.slice(1) : 'start';

            this.view = new Vue({
                el : "main",

                methods : {
                    go : function(state) {
                        this.state = state;
                    },

                    setEmotion : function(emotion) {
                        this.emotion = emotion;
                    },

                    setFact : function(fact) {
                        this.fact = fact;
                        this.go('fact');
                    },

                    setImage : function(image) {
                        this.image = image;
                        this.go('emotion');
                    }
                },

                data : {
                    meta : data.meta,
                    facts : data.facts,
                    images : data.images,
                    emotions : data.emotions,
                    state : state,
                    fact : null,
                    image : null,
                    emotion : null,
                    fontsloaded : false
                }
            });
        }
    };

    return View;
})();