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
                var data = atob(state.replace('json:', ''));
                data = JSON.parse(data);
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
                        this.downloadText = 'Wait a second...';

                        var json = {
                            fact : this.fact,
                            emotion : this.emotion,
                            image : this.image
                        };

                        var data = btoa(JSON.stringify(json));
                        var url = 'https://projects.haykranen.nl/greenmemes/#json:' + data;


                        var payload = {
                            width : 1000,
                            height : 500,
                            url : url
                        };

                        var data = new FormData();
                        data.append("json", JSON.stringify(payload));

                        fetch("http://greenmemes.herokuapp.com/memeify_img", {
                            method: "POST",
                            body: data
                        }).then(function(res) {
                            return res.json();
                        }).then(function(data) {
                            console.log(data);
                            var url = 'data:application/octet-stream;base64,' + data;
                            window.location = url;
                        });
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

                        var data = btoa(JSON.stringify(json));

                        window.location.hash = 'json:' + data;
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
                    downloadText : 'Download',
                    emotion : initialEmotion,
                    fontsloaded : false
                }
            });
        }
    };

    return View;
})();