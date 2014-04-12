// http://backbonejs.org/#View
(function(win, doc, edWui){

  /**
   * MemoIndexAccordion View
   * @type Backbone.View
   */
  edWui.Views.MemoIndexAccordion = Backbone.View.extend({

    el: '#edWuiMenu',

    template: tpl('memory-board-accordion'),

    events: {
        "click .deckLauncher":"launchMemo"
    },

    initialize: function() {
    },

    /**
     * [render display accordion menu with memory launcher and the empty board default message
     */
    render: function() {

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

      return this;
    },

    /**
     * [launchMemo load memory config and display it in ajax all back
     * @param   ev  click event
     */
    launchMemo:function(ev)
    {
        var datas = this.$(ev.currentTarget).data();

        this.loadBoard(datas.boardfile,datas.deck)
    },

    /**
     * [loadBoard load json config for the selected board
     * @param  string jsonUrl   url of the json config file
     * @param  boolean deckIndex index of the deck
     */
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
       _self.currentBoardData = data['board']['decks'][0]['deck'][deckIndex];

       _self.drawBoard();
       },
      error: function(xhr, ajaxOptions, thrownError){
       console.error("Erreur json", "Status " +xhr.status + " thrownError : " + thrownError + "jsonUrl " + jsonUrl);
                }
     });

    },

    drawBoard:function(){

     var edWuiOpts = {
          data:$.booleanBridge(this.currentBoardData.couple),
          hideunselected:$.booleanBridge(this.currentBoardData.$.hideunselected,false),
          autoconfirm:false,
          autoshuffle:$.booleanBridge(this.currentBoardData.$.autoshuffle,true),
          editable:false,
          maxSelected:2
      };

    edWuiOpts.couples = edWuiOpts.data;

    edWui.Views.Instances.Memory = new edWui.Views.Memory(edWuiOpts);
    edWui.Views.Instances.Memory.render();

    }

  });

  /**
   * MemoIndex View
   * @type Backbone.View
   */
  edWui.Views.MemoIndex = Backbone.View.extend({

    el: '#edWuiContainer',

    template: tpl('memory-board'),

    events: {
      "defaultBoard #edWuiBoardMemo":"defaultBoard"
    },

    /**
     * [initialize load micro template of default board message
     */
    initialize: function() {
        this.defaultEmptyMemoryBoard = tpl('memory-board-default');
    },

    /**
     * [render main view of memory game section
     */
    render: function() {
      this.$el.html(this.template({'defaultMessage':this.defaultEmptyMemoryBoard()}));
      return this;
    },

    /**
     * [defaultBoard draw the empty board with inviting message to click on a link
     */
    defaultBoard:function()
    {
    this.$('#edWuiBoardMemo').html(this.defaultEmptyMemoryBoard());
    }
  });


})(window, window.document, window.edWui || (window.edWui = {}));
