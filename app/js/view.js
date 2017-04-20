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
            var initialFact = {};
            var initialEmotion = {};
            var initialImage = {};

            if (state.indexOf('json:') === 0) {
                var data = JSON.parse(state.replace('json:', ''));
                initialFact = data.fact;
                initialEmotion = data.emotion;
                initialImage = data.image;
                state = 'static';
            }

            this.view = new Vue({
                el : "main",

                methods : {
                    again : function() {
                        window.location.hash = '';
                        window.location.reload();
                    },

                    download : function() {
                        // not yet..
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

                    share : function() {
                        var json = {
                            fact : this.fact,
                            emotion : this.emotion,
                            image : this.image
                        };

                        window.location.hash = 'json:' + JSON.stringify(json);
                        window.location.reload();
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
                    fact : initialFact,
                    image : initialImage,
                    emotion : initialEmotion,
                    fontsloaded : false
                }
            });
        }
    };

    return View;
})();