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


    edWui.AppRouter = Backbone.Router.extend({
     routes: {
      '': 'home',
      'memo': 'memo',
      '*path': 'redirect404' // ALWAYS MUST BE THE LAST ROUTE
        },

        /**
     * Router init
     * @return {void}
     */
    initialize: function() {},

    /**
     * Used before every action
     * @return {void}
     */
    before: function() {},

    /**
     * Used after every action
     * @return {void}
     */
    after: function() {},

    home: function() {
      this.before();

      edWui.Views.Instances.HomeIndex = new edWui.Views.HomeIndex();
      edWui.Views.Instances.HomeIndex.render();

      this.after();
        },

     memo: function() {
      this.before();

      edWui.Views.Instances.MemoIndex = new edWui.Views.MemoIndex();
      edWui.Views.Instances.MemoIndex.render();

      this.after();
        }

    });

})(window, window.document, window.edWui || (window.edWui = {}));