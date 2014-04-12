$(document).ready (
function ()
 {

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

 /**
  * this function shuffle has been inspired by http://james.padolsey.com/javascript/shuffling-the-dom/
  * and simplified with underscorejs
  */
  $.fn.shuffle = function() {
    var shuffled = _.shuffle(this.get());

    this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

    return $(shuffled);
    };

 });//fin ready