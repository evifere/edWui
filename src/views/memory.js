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
    "click .edWuiNotEditable":"clickOnCard"
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

      if(this.memoryOpts.autoshuffle === true)
        this.$('div').shuffle();

      return this;
    }
    ,
    clickOnCard:function(evt)
    {
    evt.stopPropagation();
    console.log(evt.currentTarget);
    console.log('before toggleState');
    if(this.toggleState($(evt.currentTarget),this.memoryOpts.hideunselected,this.memoryOpts.maxSelected) === true)
        {
         if (this.$('.cardselected').length == this.memoryOpts.maxSelected){
                    this.onCardsSelected();
         }
        
        }

    },
    /**
     * [onCardsSelected process what to do when the number of card to select is reached
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

    onConfirmSelection:function()
    {
    console.log('onConfirmSelection');
    var _self = this;
    var dlgId = this.$el.attr('id');

    console.log(dlgId);

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

    onControlCardGroup:function()
    {
    console.log('onControlCardGroup');
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
        console.log($card);
        console.log($card.hasClass('ui-state-highlight'));
        if ($card.hasClass('ui-state-highlight') === true)
          {
          $card.removeClass('ui-state-highlight');
          $card.removeClass('cardselected');

          if (hideunselected === true)
             $card.find(':first-child').css({'display':'none'});
            
          return true;  
          }
       else
         {
         console.log($('.cardselected').length);
         console.log(maxselected);
         
         if ($('.cardselected').length < maxselected )
            {
            $card.addClass('ui-state-highlight'); 
            $card.addClass('cardselected'); 
          //  $card.css('border-width','2px');
          
            if (hideunselected === true)
               $card.find(':first-child').css({'display':'block'});
            
            console.log('hightlight done');
            return true;  
            }
     }
     
  return false;    
  }

  });


})(window, window.document, window.edWui || (window.edWui = {}));
