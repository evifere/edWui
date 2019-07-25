(function(win, doc, edWui){

    win.tpl = function(view) {
      return _.template(doc.getElementById('/' + view + '-viewtpl').innerHTML);
    };

    win.jsonData = function(name) {
      try{
      return doc.querySelector("[data-path='" +name + ".json']").getAttribute('src');
        }
      catch(e){
      console.error(e);
      console.log('Error on loading jsonData '+name+".json");
      }
    };

    edWui.Models = {};
    edWui.Models.Instances = {};
    edWui.Collections = {};
    edWui.Collections.Instances = {};
    edWui.Views = {};
    edWui.Views.Instances = {};
    edWui.AppRouter = {};
    edWui.AppRouter.Instance = {};
    edWui.Events = {};
    edWui.version = "1.1.2";

})(window, window.document, window.edWui || (window.edWui = {}));