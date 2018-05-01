// http://backbonejs.org/#View
(function(win, doc, edWui){


  /**
   * Root View
   * @type {object}
   */
  edWui.Views.HomeIndex = Backbone.View.extend({

    el: '#edWuiContainer',

    template: tpl('home'),

    events: {
        "click #gotoMemoryBoard":"gotoMemoryBoard"
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template);

      return this;
    },

    gotoMemoryBoard:function(){
    edWui.AppRouter.Instance.navigate("memo/pair", {trigger: true});
    }

  });


})(window, window.document, window.edWui || (window.edWui = {}));
