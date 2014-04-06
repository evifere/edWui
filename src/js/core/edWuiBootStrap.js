(function(win, doc, edWui){

    win.tpl = function(view) {
        console.log(view);
      return _.template(doc.getElementById(view + '-viewtpl').innerHTML);
    };

    win.jsonData = function(name) {
      return doc.querySelector("[data-path='" +name + ".json']").getAttribute('src');
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