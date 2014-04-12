// http://backbonejs.org/#View
(function(win, doc, edWui){

  /**
   * Memory View
   * @type Backbone.View
   */
  edWui.Views.Memory = Backbone.View.extend({

    el: '#edWuiBoardMemo',

    template: tpl('memory-deck'),

    events: {
    "click .edWuiNotEditable":"clickOnCard"
    },

    initialize: function(options) {

    var _self = this;
    this.memoryOpts = options;
    this.iCards = 0;

    this.memoryOpts.couples.forEach(function(cards){
    _self.iCards += cards.card.length;
    });

    this.currentDataGroup = -1;
    },

    render: function() {
      this.$el.html(this.template(this.memoryOpts));

      if(this.memoryOpts.autoshuffle === true)
        {
         var shuffled = _.shuffle(this.$el.find('.edWuiCard').get());
         this.$el.html(shuffled);
        }

      return this;
    }
    ,

    /**
     * clickOnCard what to do when click on a card
     * @param  click event 
     */
    clickOnCard:function(evt)
    {
    evt.stopPropagation();

    $couple = $(evt.currentTarget);
    this.currentDataGroup = $couple.data('group');

    if(this.toggleState($couple,this.memoryOpts.hideunselected,this.memoryOpts.maxSelected) === true)
        {
         if (this.$('.cardselected').length == this.memoryOpts.maxSelected){
                    this.onCardsSelected();
         }
        }

    },

    /**
     * [onCardsSelected process what to do when the number of card to form a couple to select is reached
     **/
    onCardsSelected:function()
    {
    if (this.memoryOpts.autoconfirm === false)
       {
       this.onConfirmSelection();
       return true;
       }

     this.onControlCardGroup();
    },

    /**
     * onConfirmSelection open a dialog box to ask the user if he is sure
     * @return boolean
     */
    onConfirmSelection:function()
    {
    var _self = this;
    var dlgId = this.$el.attr('id');

    $('#dlgmsg_' + dlgId).html('');

    this.$('.cardselected').each(function (){
       $('#dlgmsg_' + dlgId).append($(this).clone().removeClass('cardselected'));
       });

     $('#dlgmsg_' + dlgId)
      .attr('title','Tu es sûr ?')
      .dialog({
        modal:true,
        minHeight: 130,
        minWidth: 320,
        buttons:
                { "Oui :)": function() { 
                          _self.onControlCardGroup();
                          $(this).dialog("close"); 
                      }
                  ,
                  "Non :(": function() { 
                  $(this).html('');
                  _self.$('.cardselected').each(function (){
                      _self.toggleState($(this),_self.memoryOpts.hideunselected,_self.memoryOpts.maxSelected);
                     });

                  $(this).dialog("close"); }
                }
              });//fin dialog

    },

    /**
     * [onControlCardGroup control if the selected card group match
     */
    onControlCardGroup:function()
    {
    var ok = true;
    var g  = this.currentDataGroup;

    this.$('.cardselected').each(function (){
       ok = ok && $(this).hasClass(g);
       });

    if (ok === true)
      this.onControlCardMatch();
    else
      this.onControlCardNotMatch();

    },

    /**
     * [onControlCardMatch process what to do if the cards match
     *
     * hide the cards
     * triggers onBoardEmpty if the wole board is empty
     */
    onControlCardMatch:function ()
    {

    this.$('.cardselected').each(function (){
       $card = $(this);
       $card.removeClass('ui-state-highlight');
       $card.removeClass('cardselected');
       $card.addClass('cardfound');
       $card.css('visibility', 'hidden');
       });

    if (this.iCards  === this.$('.cardfound').length)
        this.onBoardEmpty();

    },

    /**
     * [onBoardEmpty display winning dialog
     */
    onBoardEmpty:function()
    {
    var _self = this;

    $('#dlgmsgend_' + this.$el.attr('id'))
      .attr('title','Bravo tu as gagné !! \\0/ ')
      .dialog({
        modal:true,
            minHeight: 130,
            minWidth: 320,
        buttons:
                {
                  "Super :)": function() { 
                     _self.$el.trigger('defaultBoard');
                          $(this).dialog("close"); 
                    }
                }
              });//fin dialog
    },

    /**
     * [onControlCardNotMatch display a user dialog to say that he is wrong
     * restores unselected card state
     */
    onControlCardNotMatch:function ()
    {
    var _self = this;

    $('#dlgmsgerr_' + this.$el.attr('id'))
      .attr('title','C\'est faux !')
      .dialog({
        modal:true,
        buttons:
                { "Je retente :)": function() { 

                  _self.$('.cardselected').each(function (){
                 _self.toggleState($(this),_self.memoryOpts.hideunselected,_self.memoryOpts.maxSelected);
                     });

                 $(this).dialog("close"); } 

                }
              });//fin dialog

    },

    /**
     * [toggleState switch between un/hightlight mode and trigger couple selection
     * @param  {[type]} $card          [description]
     * @param  {[type]} hideunselected [description]
     * @param  {[type]} maxselected    [description]
     * @return {[type]}                [description]
     */
    toggleState:function ($card,hideunselected,maxselected)
    {
        //hide card reselected
        if ($card.hasClass('ui-state-highlight') === true)
          {
          $card.removeClass('ui-state-highlight');
          $card.removeClass('cardselected');

          if (hideunselected === true)
             $card.find(':first-child').css({'display':'none'});

          return true;
          }
       else
         {//hightlight card
         if ($('.cardselected').length < maxselected )
            {
            $card.addClass('ui-state-highlight');
            $card.addClass('cardselected');

            if (hideunselected === true)
               $card.find(':first-child').css({'display':'block'});

            return true;
            }
     }

  return false;
  }

  });


})(window, window.document, window.edWui || (window.edWui = {}));
