(function(win, doc, edWui){

    win.tpl = function(view) {
        console.log(view + '-viewtpl');
        console.log(doc.getElementById(view + '-viewtpl'));
        
      return _.template(doc.getElementById(view + '-viewtpl').innerHTML);
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





})(window, window.document, window.edWui || (window.edWui = {}));