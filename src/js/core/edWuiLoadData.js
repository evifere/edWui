$(document).ready (
function ()
 {

  
  //$.loadBoard = function (xml,node,title,boarddescription,name,deckdesc,hideunselected,autoshuffle,css,cssCard,undefined)
 /* $.loadBoard = function (jsonUrl,deckIndex,undefined)
  {
  
  $.ajax({
      url: jsonUrl ,
      type:'GET',
      async:false,
      context: document.body,
      dataType:'json',
      crossDomain:true,
      success: function(data){
        console.log(data);
       $.__DATA = data['board']['decks'][0]['deck'][deckIndex];//jQuery.parseJSON(data);

       console.log($.__DATA);
       },
      error: function(xhr, ajaxOptions, thrownError){
       console.error("Erreur json", "Status " +xhr.status + " thrownError : " + thrownError + "jsonUrl " + jsonUrl);
                }
     });
*/
  /*
  $('#edui-bar-board-title').text(title).val(title);
  $('#edui-bar-board-description').text(boarddescription).val(boarddescription);
 
  $('#edui-bar-espace').html("&nbsp;:&nbsp;");
  $('#edui-bar-deck-name').text(name).val(name);
  $('#edui-bar-deck-description').text(deckdesc).val(deckdesc);
  $('#edui-bar-deck-hideunselected').attr('checked', hideunselected);
  
  
  
  var edUIOpts = {
        	data:$.__DATA,
  	      hideunselected:hideunselected,
  	      autoconfirm:false,
          autoshuffle:autoshuffle};
          
  if (css !== undefined)
      $.extend(edUIOpts,{css:css});

  if (cssCard !== undefined)
      $.extend(edUIOpts,{cssCard:cssCard});
     
 

  $('#board-memo')
   .data('xml',xml)
   .data('nbd',node)
   
   .edUIMemory(edUIOpts);
     
  };*/
  
 });//fin ready