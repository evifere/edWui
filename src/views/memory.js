// http://backbonejs.org/#View
(function(win, doc, edWui){

  /**
   * Root View
   * @type {object}
   */
  edWui.Views.Memory = Backbone.View.extend({

    el: '#edWuiBoardMemo',

    template: tpl('memory-deck'),

    events: {
    "click .edWuiNotEditable":"clickOnCard"
    },

    initialize: function(options) {
    /*this.couples = options.couples;
    this.hideunselected = options.hideunselected;
    this.autoconfirm = options.autoconfirm;
    this.autoshuffle = options.autoshuffle;*/
    this.memoryOpts = options;
    },

    render: function() {
      this.$el.html(this.template(this.memoryOpts));

      if(this.memoryOpts.autoshuffle === true)
        this.$('div').shuffle();

      return this;
    }
    ,
    clickOnCard:function(evt)
    {
    evt.stopPropagation();
    console.log(evt.currentTarget);
    }

  });


})(window, window.document, window.edWui || (window.edWui = {}));
