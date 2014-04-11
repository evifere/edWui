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
      return this;
    }
  });


})(window, window.document, window.edWui || (window.edWui = {}));
