// http://backbonejs.org/#View
(function(win, doc, edWui){


  /**
   * Root View
   * @type {object}
   */
  edWui.Views.MemoIndex = Backbone.View.extend({

    el: '#edWuiContainer',

    template: tpl('memory-board'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template);

      return this;
    }
  });


})(window, window.document, window.edWui || (window.edWui = {}));
