$(document).ready (
function ()
 {
  
  
  
  $.widget("ui.edUIMemory", {
      
     options:{
      data:{
      },
      confirm:false,
      hideunselected:false,
      maxselected:2,
      autoconfirm:false, 
      autoshuffle:true,
      editable:false,
      css:
         {'position':'absolute',
           'top':'50px',
           'left':'250px',
         'width':'880px',
           'min-height':'280px'
        },
     cssCard:
        {'position':'relative',
         'width':'128px',
         'min-height':'128px',
         'text-align':'center',
         'vertical-align':'middle',
         'display':'inline-block',
         'margin':'5px',
         'line-height':'400%',
          'border-width':'4px'
      
         
        },    
     
    onControlCardNotMatch:function (e,myUI)
    {
   
    $('#dlgmsgerr_' + $(myUI._e).attr('id'))
      .attr('title','C\'est faux !')
      .dialog({
      	modal:true,
      	buttons: 
      	        { "Je retente :)": function() { 
      	         
      	          $('.cardselected').each(function (){
                 $(this).toggleState(myUI._o.hideunselected);
                     });
      	         $(this).dialog("close"); } 

                }
              });//fin dialog
    
     
    }
    ,    
    onBoardEmpty:function (e,myUI)
     {
     $('#dlgmsgend_' + $(myUI._e).attr('id'))
      .attr('title','Bravo tu as gagné !! \\0/ ')
      .dialog({
      	modal:true,
      		minHeight: 130,
        	minWidth: 320,
      	buttons: 
      	        { 
      	          "Super :)": function() { 
      	             //   myUI._self._reload();
      	                  $(this).dialog("close"); }
                }
              });//fin dialog
     }
    ,
    onControlCardMatch:function (e,myUI)
    {
    $('.cardselected').each(function (){
       $(this).removeClass('ui-state-highlight');
       $(this).removeClass('cardselected');
       $(this).addClass('cardfound');
      
       
      // $(this).hide('slow');
       
       $(this).css('visibility', 'hidden');
       });
    
    console.log(myUI._self._iCards);
    console.log($('.cardfound').length);


    if ( myUI._self._iCards  === $('.cardfound').length)
         myUI._self._trigger("onBoardEmpty",null,myUI);
     
    
     
    }
    ,    
    onControlCardGroup:function (e,myUI)
    {
    var ok = true;
    var g = $(myUI._card).data('group');
    
    $('.cardselected').each(function (){
       ok = ok && $(this).hasClass(g);
       });

    if (ok === true)
      myUI._self._trigger("onControlCardMatch",null,myUI);     
    else  
      myUI._self._trigger("onControlCardNotMatch",null,myUI);
     
    },
    onConfirmSelection:function (e,myUI)
     {
      $('#dlgmsg_' + $(myUI._e).attr('id')).html('');
      
     $('.cardselected').each(function (){
       //ok = ok && $(this).hasClass(g);
       $('#dlgmsg_' + $(myUI._e).attr('id')).append($(this).clone().removeClass('cardselected'));
       });
     
     
     $('#dlgmsg_' + $(myUI._e).attr('id'))
      .attr('title','Tu es sûr ?')
      .dialog({
      	modal:true,
      	minHeight: 130,
        	minWidth: 320,
      	
      	buttons: 
      	        { "Oui :)": function() { 
      	                  myUI._self._trigger("onControlCardGroup",null,myUI);
      	                  $(this).dialog("close"); } 
      	          ,
      	          "Non :(": function() { 
      	          $(this).html('');
     
      	          $('.cardselected').each(function (){
                      $(this).toggleState(myUI._o.hideunselected);
      	             });
      	          
      	          $(this).dialog("close"); }
                }
              });//fin dialog
     
     },
    onCardsSelected:function (e,myUI)
    {
    //if (myUI._o.autoconfirm === false && confirm("Confirmer") === false) 
    if (myUI._o.autoconfirm === false) 
       {
       myUI._self._trigger("onConfirmSelection",null,myUI);   
       return true;
       }
       
     myUI._self._trigger("onControlCardGroup",null,myUI);        
    }    
    ,    
    onClickCard:function (e,myUI)
    {
    
     if ($(myUI._card).toggleState(myUI._o.hideunselected,myUI._o.maxselected) === true)
        {
        if ($('.cardselected').length == myUI._o.maxselected)
           myUI._self._trigger("onCardsSelected",null,myUI);  
         
        }
    },
    onAddClickControl:function (e,myUI)
    {
     $(myUI._e).find('div')
          .each(function (){
          	
          	    $(this).click(function ()
          	      {
          	       myUI._card = this;
          	        
          	      myUI._self._trigger("onClickCard",null,myUI);  
         
          	      }
          	    );
          	    });
           
          
    }
    ,    
    onShuffleBoard:function (e,myUI)
      {
      $(myUI._e).find('div').shuffle(); 
        
      },
        
     onDrawBoard:function (e,myUI)
      {
        console.log('onDrawBoard widget');
         console.log(myUI._o.data);

       for (var idcouple in myUI._o.data)
       {
        
        if (myUI._o.data[idcouple].length > 0)
          {
          var iMax = myUI._o.data[idcouple].length;
          
          for (i = 0;i < iMax;++i)
             {
             $(myUI._e)
              .append(
                     $('<div></div>')
                      .attr('id',idcouple + '_' + i)
                      .createTextCard(idcouple,myUI._o.data[idcouple][i],myUI._o.cssCard,myUI._o.hideunselected,myUI._o.editable)
                     
                      
                     );
              
             myUI._self._iCards++; 
             }

       }
       
       
      }
      },
      onDrawDialogBox:function (e,myUI)
       {
         var $dlg = $('<div></div>')
                   .attr('id','dlgmsg_' + $(myUI._e).attr('id'))
                   ;
       
       $('body').append($dlg);
      
        var $dlgerr = $('<div></div>').attr('id','dlgmsgerr_' + $(myUI._e).attr('id'));
       
       $('body').append($dlgerr);
       
       var $dlgend = $('<div></div>').attr('id','dlgmsgend_' + $(myUI._e).attr('id'));
       
       $('body').append($dlgend); 
       
       } 
          
     },//fin options
     _iCards:0,
     _create: function() {
       var _e = this.element;
       var _o = this.options;
       console.log('_create widget');

       $(_e)
        .addClass('ui-widget')
        .addClass('ui-corner-all')
        .addClass('ui-widget-content')
        .css(_o.css);

     
     //  alert($dlg.html());
       
      
     },
     _reload:function ()
     {
      var _e = this.element;
        
      $(_e).html();

     $(':ui-dialog').each(function(){$(this).dialog( "destroy" );});
                   
      this._init();
     }
     ,
     _init: function() {
       var _e = this.element;
       var _o = this.options;
       var _self = this;
      
      _self._iCards = 0; 
      
       $(_e).data('options',_o);
       
        if ($.isEmptyObject(_o.data) === true)
          $(_e).html(
           
          (_o.editable === false) ? 
           $('<span class="ui-state-error">Board data is empty</span>')
            .css({'position':'absolute',
                  'text-align':'center',
                  'vertical-align':'middle',
                  'padding':'20px',
                  'left':'35%',
                  'top':'40%'})
            
            : 
                 $('<span></span>')
            .css({'position':'absolute',
                  'text-align':'center',
                  'vertical-align':'middle',
                  'padding':'20px',
                  'left':'35%',
                  'top':'40%'})         
                     );
          
        else
         {
          $(_e).html('');
          
          var myUI = {_self:_self,_o:_o,_e:_e};
         
           _self._trigger("onDrawDialogBox",null,myUI);  
         
          _self._trigger("onDrawBoard",null,myUI);  
          
          if (_o.autoshuffle === true)
              _self._trigger("onShuffleBoard",null,myUI);
          
          if (_o.editable === false)
             _self._trigger("onAddClickControl",null,myUI);
          
         
         }
         
     if (_o.editable === true)  
        $(_e).sortable({revert: true,
        	             placeholder: 'ui-state-highlight',
        	             forcePlaceholderSize:true
        });      
       
     },
     destroy: function() {
         $.Widget.prototype.destroy.apply(this, arguments); // default destroy
          // now do other stuff particular to this widget
     }
   });
   
  
  
 });//fin ready