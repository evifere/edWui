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
      this.$('#gotoMemoryBoard').button();

      return this;
    },

    gotoMemoryBoard:function(){
    console.log("gotoMemoryBoard");
    edWui.AppRouter.Instance.navigate("memo", {trigger: true});
    }

  });


})(window, window.document, window.edWui || (window.edWui = {}));
