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
        console.log('verify the number of cards remaining');
        }

    },
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
