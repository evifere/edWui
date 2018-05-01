// http://backbonejs.org/#View
(function(win, doc, edWui) {

  /**
   * Memory View
   * @type Backbone.View
   */
  edWui.Views.Memory = Backbone.View.extend({

    el: '#edWuiBoardMemo',

    template: tpl('memory-deck'),

    events: {
      "click .edWuiNotEditable": "clickOnCard",
      "click a.confirmNo": "clickOnConfirmNo",
      "click #confirmYes": "clickOnConfirmYes",
      "click .btn.btn-clear":"closeMsgToast"
    },

    initialize: function(options) {

      var _self = this;
      this.memoryOpts = options;
      this.iCards = 0;

      this.memoryOpts.couples.forEach(function(cards) {
        _self.iCards += cards.card.length;
      });

      this.currentDataGroup = -1;

      this.clearMessages();
    },

    render: function() {
      $memocontent = this.$('.memocontent');
      $memocontent.html(this.template(this.memoryOpts));

      if (this.memoryOpts.autoshuffle === true) {
        var shuffled = _.shuffle($memocontent.find('.edWuiCard').get());
        $memocontent.html(shuffled);
      }

      return this;
    },

    /**
     * clickOnCard what to do when click on a card
     * @param  click event 
     */
    clickOnCard: function(evt) {
      evt.stopPropagation();
      $couple = $(evt.currentTarget);
      this.currentDataGroup = $couple.data('group');

      if (this.toggleState($couple, this.memoryOpts.hideunselected, this.memoryOpts.maxSelected) === true) {
        if (this.$('.cardselected').length == this.memoryOpts.maxSelected) {
          this.onCardsSelected();
        }
      }

    },

    /**
     * closeMsgToast - close the toast
     * @param  Event evt - click on close button
     */
    closeMsgToast:function(evt){
      evt.stopPropagation();
      $(evt.currentTarget).parent().addClass('hiddenMsg');
    },

    /**
     * [onCardsSelected process what to do when the number of card to form a couple to select is reached
     **/
    onCardsSelected: function() {
      if (this.memoryOpts.autoconfirm === false) {
        this.onConfirmSelection();
        return true;
      }

      this.onControlCardGroup();
    },

    /**
     * clearDlgContent - empty the modal content
     * @return void
     */
    clearDlgContent: function() {
      this.$('.modal-body .content').html('');
    },

    /**
     * clearMessages - remove error and succes notifications
     * @return {[type]} [description]
     */
    clearMessages: function() {
      this.$('.toast-success').addClass('hiddenMsg');
      this.$('.toast-error').addClass('hiddenMsg');
    },

    /**
     * openDlg - open the confirmation modal for matching cards
     * @return void
     */
    openDlg: function() {
      this.$('.modal').addClass('active');
    },

    /**
     * closeDlg - close the confirmation modal
     * @return void
     */
    closeDlg: function() {
      this.$('.modal').removeClass('active');
    },

    /**
     * clickOnConfirmYes - the user confirms his choice
     * @return {[type]} [description]
     */
    clickOnConfirmYes: function() {
      this.onControlCardGroup();
      this.closeDlg();
    },

    /**
     * clickOnConfirmNo - the user is not sure of his choice the cancel
     * @return void
     */
    clickOnConfirmNo: function() {
      this.clearDlgContent();
      this.clearMessages();
      this.toggleSelectedCards();
      this.closeDlg();
    },

    /**
     * onConfirmSelection open a dialog box to ask the user if he is sure
     * @return boolean
     */
    onConfirmSelection: function() {
      var _self = this;

      this.openDlg();
      this.clearDlgContent();

      //display selected cards into the modal content
      this.$('.cardselected').each(function() {
        _self.$('.modal-body .content').append($(this).clone().removeClass('cardselected'));
      });

    },

    /**
     * [onControlCardGroup control if the selected card group match
     */
    onControlCardGroup: function() {
      var ok = true;
      var g = this.currentDataGroup;

      this.$('.cardselected').each(function() {
        ok = ok && $(this).hasClass(g);
      });

      if (ok === true)
        this.onControlCardMatch();
      else
        this.onControlCardNotMatch();

    },

    /**
     * onControlCardMatch - process what to do if the cards match
     *
     * hide the cards
     * triggers onBoardEmpty if the wole board is empty
     */
    onControlCardMatch: function() {
      this.$('.toast-error').addClass('hiddenMsg');
      this.$('.toast-success.cardMatch').removeClass('hiddenMsg');

      this.$('.cardselected').each(function() {
        $card = $(this);
        $card.removeClass('active');
        $card.removeClass('cardselected');
        $card.addClass('cardfound');
        $card.css('visibility', 'hidden');
      });

      if (this.iCards === this.$('.cardfound').length)
        this.onBoardEmpty();

    },

    /**
     * [onBoardEmpty display winning notification
     */
    onBoardEmpty: function() {
      this.$('.toast-success.endBoard').removeClass('hiddenMsg');
    },

    /**
     * onControlCardNotMatch display a user notification to say that he is wrong
     * restores unselected card state
     */
    onControlCardNotMatch: function() {
      var _self = this;

      this.$('.toast-error').removeClass('hiddenMsg');
      this.$('.toast-success.endBoard').addClass('hiddenMsg');
      this.$('.toast-success.cardMatch').addClass('hiddenMsg');
      this.toggleSelectedCards();

    },

    /**
     * toggleSelectedCards - restore the state of deselected cards
     * @return void
     */
    toggleSelectedCards:function(){
      var _self = this;

      _self.$('.cardselected').each(function() {
        _self.toggleState($(this), _self.memoryOpts.hideunselected, _self.memoryOpts.maxSelected);
      });
    },

    /**
     * [toggleState switch between un/hightlight mode and trigger couple selection
     * @param  {[type]} $card          [description]
     * @param  {[type]} hideunselected [description]
     * @param  {[type]} maxselected    [description]
     * @return {[type]}                [description]
     */
    toggleState: function($card, hideunselected, maxselected) {
      //hide card reselected
      if ($card.hasClass('active') === true) {
        $card.removeClass('active');
        $card.removeClass('cardselected');

        if (hideunselected === true)
          $card.find(':first-child').css({
            'display': 'none'
          });

        return true;
      } else { //hightlight card
        if ($('.cardselected').length < maxselected) {
          $card.addClass('active');
          $card.addClass('cardselected');

          if (hideunselected === true)
            $card.find(':first-child').css({
              'display': 'block'
            });

          return true;
        }
      }

      return false;
    },

    destroy: function() {
      this.$el.off();
    }

  });


})(window, window.document, window.edWui || (window.edWui = {}));