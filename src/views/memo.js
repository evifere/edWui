// http://backbonejs.org/#View
(function(win, doc, edWui){

  edWui.Views.MemoIndexAccordion = Backbone.View.extend({

    el: '#edWuiMenu',

    template: tpl('memory-board-accordion'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template);

      menuselector = 'edWuiMenu';

      var active_tabindex = ($.cookie('active_tabindex_'+menuselector) === null) ? 0 : parseInt($.cookie('active_tabindex_'+menuselector),10);

     

     this.$el.accordion({'autoHeight':false,
                'clearStyle': true,
                'icons':false,
                'active':active_tabindex,
                'animated': "bounceslide",
                change: function (e, ui) {
                var iSection = $(this).find('h3').index(ui.newHeader[0]);

                $.cookie('active_tabindex_'+menuselector, iSection);

                console.log($(this).find('div:eq('+iSection+')').data('xmldeckfile'));
      }});

      console.log(active_tabindex);
      console.log( this.$el.html());

      return this;
    }
  });

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
