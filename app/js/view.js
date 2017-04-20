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
                    again : function() {
                        window.location.hash = '';
                        window.location = window.location;
                    },

                    go : function(state) {
                        this.state = state;
                        window.scrollTo(0, 0);
                    },

                    setEmotion : function(emotion) {
                        this.emotion = emotion;
                        window.scrollTo(0, 0);
                    },

                    setFact : function(fact) {
                        this.fact = fact;
                        this.go('meme');
                    },

                    setImage : function(image) {
                        this.image = image;
                        this.go('fact');
                    },

                    start : function() {
                        this.go('image');
                    }
                },

                computed : {
                    memeStyle : function() {
                        if (this.image) {
                            return {
                                'background-image' : 'url(' + this.image.image + ')'
                            }
                        }
                    }
                },

                data : {
                    meta : data.meta,
                    facts : _.shuffle(data.facts),
                    images : _.shuffle(data.images),
                    emotions : data.emotions,
                    state : state,
                    fact : {},
                    image : null,
                    emotion : null,
                    fontsloaded : false
                }
            });
        }
    };

    return View;
})();