// http://backbonejs.org/#View
(function(win, doc, edWui){

  edWui.Views.MemoIndexAccordion = Backbone.View.extend({

    el: '#edWuiMenu',

    template: tpl('memory-board-accordion'),

    events: {
        "click .deckLauncher":"launchMemo"
    },

    initialize: function() {
    },

    render: function() {
      console.log('render before');

      this.$el.html(this.template({'boards' : edWui.Collections.Instances.memoryBoard.toJSON()} ));

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

      return this;
    },

    launchMemo:function(ev)
    {
        console.log(ev);
        var datas = this.$(ev.currentTarget).data();
        console.log(datas);

        this.loadBoard(datas.boardfile,datas.deck)
    },

    loadBoard:function(jsonUrl,deckIndex){
    var _self = this;

    $.ajax({
      url: jsonUrl ,
      type:'GET',
      async:false,
      context: document.body,
      dataType:'json',
      crossDomain:true,
      success: function(data){
        console.log(data);
       _self.currentBoardData = data['board']['decks'][0]['deck'][deckIndex];//jQuery.parseJSON(data);

       _self.drawBoard();
       },
      error: function(xhr, ajaxOptions, thrownError){
       console.error("Erreur json", "Status " +xhr.status + " thrownError : " + thrownError + "jsonUrl " + jsonUrl);
                }
     });

    },

    drawBoard:function(){

     var edwuiOpts = {
          data:$.booleanBridge(this.currentBoardData.couple),
          hideunselected:$.booleanBridge(this.currentBoardData.$.hideunselected,false),
          autoconfirm:false,
          autoshuffle:$.booleanBridge(this.currentBoardData.$.autoshuffle,true)};


    console.log(edwuiOpts);
    console.log(this.currentBoardData.$);

    $('#edWuiBoardMemo').edUIMemory(edwuiOpts);

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
