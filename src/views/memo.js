// http://backbonejs.org/#View
(function(win, doc, edWui) {

  /**
   * MemoIndexAccordion View
   * @type Backbone.View
   */
  edWui.Views.MemoIndexAccordion = Backbone.View.extend({

    el: '#edWuiMenu',

    template: tpl('memory-board-accordion'),

    events: {
      "click .deckLauncher": "launchMemo",
      "click .nextMenu":"showNextMenu",
      "click .dropdown-toggle-btn":"onToggleMenu"
    },

    initialize: function() {},

    /**
     * [render display accordion menu with memory launcher and the empty board default message
     */
    render: function() {

      this.$el.html(this.template({
        'boards': edWui.Collections.Instances.memoryBoard.toJSON()
      }));

      menuselector = 'edWuiMenu';

      return this;
    },

    /**
     * launchMemo load memory config and display it in ajax all back
     * @param   ev  click event
     */
    launchMemo: function(ev) {
      var datas = this.$(ev.currentTarget).data();

      this.onToggleMenu(ev);
      this.loadBoard(datas.boardfile, datas.deck)
    },

    /**
     * onToggleMenu - open close corresponding menu
     * @param  click event ev
     */
    onToggleMenu:function(ev){
      this.$(ev.currentTarget).parents('.dropdown').toggleClass('active');
    },
    /**
     * showNextMenu - show next menu items
     */
    showNextMenu: function(){
      this.$('.btn-group').toggleClass('hiddenMenu')
    },

    /**
     * loadBoard load json config for the selected board
     * @param  string jsonUrl   url of the json config file
     * @param  boolean deckIndex index of the deck
     */
    loadBoard: function(jsonUrl, deckIndex) {
      var _self = this;

      if(typeof(_cordovaNative) === 'object'  || window.location.hostname === "evifere.github.io"){
        jsonUrl = jsonUrl.replace('/json/','json/');

        console.log('cordova detected', jsonUrl);
      }

      var jqXHR = $.getJSON(jsonUrl, function(data, textStatus, jqXHR) {

        _self.currentBoardData = data['board']['decks'][0]['deck'][deckIndex];
        _self.currentBoardTitle = data['board'].title;
        _self.currentBoardDescription = data['board'].description;

        _self.updateMemoryTitle();
        _self.drawBoard();
      }).fail(function() {
        console.error("Erreur json", "Status ", arguments, "jsonUrl " + jsonUrl);
      });
    },

    updateMemoryTitle: function() {
      var szDeckName = this.currentBoardData.$.name;

      if (this.currentBoardData.$.description)
        szDeckName += ':' + this.currentBoardData.$.description;

      $('#edWuiBoardTitle').text(this.currentBoardTitle + ' (' + this.currentBoardDescription + ')');

      $('#edWuiDeckName').attr('data-content',szDeckName);
    },

    /**
     * drawBoard display memory board
     */
    drawBoard: function() {

      var edWuiOpts = {
        data: $.booleanBridge(this.currentBoardData.couple),
        hideunselected: $.booleanBridge(this.currentBoardData.$.hideunselected, false),
        autoconfirm: false,
        autoshuffle: $.booleanBridge(this.currentBoardData.$.autoshuffle, true),
        editable: false,
        maxSelected: 2
      };

      edWuiOpts.couples = edWuiOpts.data;

      if (edWui.Views.Instances.Memory)
        edWui.Views.Instances.Memory.destroy();

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
      "defaultBoard #edWuiBoardMemo": "defaultBoard"
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
      this.$el.html(this.template({
        'defaultMessage': this.defaultEmptyMemoryBoard()
      }));
      return this;
    },

    /**
     * [defaultBoard draw the empty board with inviting message to click on a link
     */
    defaultBoard: function() {
      this.$('#edWuiDeckName').html(this.defaultEmptyMemoryBoard());
    }
  });


})(window, window.document, window.edWui || (window.edWui = {}));