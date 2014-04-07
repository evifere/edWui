$(document).ready (
function ()
 {
   $.__DATA = {};	     
  	 
  $.__STDCSS =  {'position':'absolute',
                 'top':'50px',
                 'left':'250px',
                 'width':'880px',
                 'min-height':'280px'
                 };
                 
  $.__ADMINCSS =  {'position':'absolute',
                 'top':'200px',
                 'left':'250px',
                 'width':'300px',
                 'min-height':'280px'
                 };
                 
  $.__PREVIEW_CARD =  {'position':'relative',
         'width':'128px',
         'min-height':'128px',
         'text-align':'center',
         'vertical-align':'middle',
         'display':'inline-block',
         'margin':'5px',
         'line-height':'400%',
          'border-width':'4px'
      
         
        };               
       

 /**
  * booleanBridge patch the json generated from xml
  * @param  string val       value coming from the json converted from xml
  * @param  bool default value to return
  * @param  undefined ghost undefined
  * @return bool           return a real boolean
  */
 $.booleanBridge = function (val,defaultVal,undefined){

    if (defaultVal === undefined)
        defaultVal = false;

    if(typeof val === "string")
        {
        if (val === "false")
            return false;
        else
            return true;
        }

 if(val === undefined || val === null)
    {
    return defaultVal;
    }
 return val;
 };
 //this function shuffle has been taken from http://james.padolsey.com/javascript/shuffling-the-dom/
  $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
  
  $.fn.toggleState = function (hideunselected,maxselected)
  {
   if ($(this).hasClass('ui-state-highlight') === true)
      {
      $(this).removeClass('ui-state-highlight');
      $(this).removeClass('cardselected');
      //$(this).css('border-width','2px');
      
      if (hideunselected === true)
         $(this).find(':first-child').css({'display':'none'});
        
      return true;  
      }
   else
     {
     if ($('.cardselected').length < maxselected )
        {
        $(this).addClass('ui-state-highlight'); 
        $(this).addClass('cardselected'); 
      //  $(this).css('border-width','2px');
      
        if (hideunselected === true)
           $(this).find(':first-child').css({'display':'block'});
          
        return true;  
        }
     }
     
  return false;    
  };
   
    
   $.fn.transformPreviewCard = function (opts)
  {
  $(this).attr('class',"");

  return $(this)
          .css(opts.cssCard)
          .addClass('ui-widget')
          .addClass('ui-corner-all')
          .addClass((opts.hideunselected) ? 'ui-widget-header':'ui-state-default')         
              ;
 
  }; 
  
  $.fn.createPreviewCard = function (cssCard,hideunselected)
  {
  $val = $('<img></img>')
           .attr('src',$(this).data('url')); 
   
  //console.log($val.attr('src'));         
           
  if (!(!!$val.get(0) && !!$val.get(0).tagName))   
     $val = $('<span>'+$(this).data('url')+'</span>');
  
  
  $center = $('<center></center>')
                 .addClass('cardcontainer')
                 .append($val.css('vertical-align','middle'));  
    
  return $(this)
          .css(cssCard)
          .addClass('ui-widget')
          .addClass('ui-corner-all')
          .addClass((hideunselected) ? 'ui-widget-header':'ui-state-default')         
          .html($center.css({'display':(hideunselected) ? 'none':'block'})
           
         
           
                
               );
 
  }; 
  
  $.fn.createTextCard = function (idcouple,val,cssCard,hideunselected,editable)
  {
  $val = $(val); 

  if (!(!!$(val).get(0) && !!$(val).get(0).tagName))   
     $val = $('<span>'+val+'</span>');
  
  
  $center = $('<center></center>')
                 .addClass('cardcontainer')
                 .append($val.css('vertical-align','middle'));  
    
  return $(this)
          .css(cssCard)
          .addClass('ui-widget')
          .addClass('ui-corner-all')
          .addClass((hideunselected) ? 'ui-widget-header':'ui-state-default')
          .addClass(idcouple)
          .data('group',idcouple)          
          .html($center.css({'display':(hideunselected && !editable) ? 'none':'block'})
           
         
           
                
               );
 
  }; 
  
 });//fin ready