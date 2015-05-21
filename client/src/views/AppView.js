define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var io = require('../socket.io/socket.io');

    var socket = io.connect('http://localhost:8081');

    socket.on('news', function (data) {
        console.log(data);        
    });

    function AppView(size) {

        View.apply(this, arguments);   

        this.options.size = size;

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.mainNode = this.add(this.rootModifier);       

        _createBackground.call(this);
        _createListeners.call(this);  
  
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;


    AppView.DEFAULT_OPTIONS = {
        placeholder: null
    };

    //----------------------Helper Functions--------------------


    function _createBackground (){

        this.surface = new Surface({
            size: this.options.size,
            properties: {
                backgroundColor: 'rgba(200,200,200,1)'
            }
        });

        this.surfaceModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.mainNode.add(this.surfaceModifier).add(this.surface);

    }


    function _createListeners (){

    }


    module.exports = AppView;

});





