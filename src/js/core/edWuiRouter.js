
(function(win, doc, edWui){

    edWui.AppRouter = Backbone.Router.extend({
     routes: {
      '': 'home',
      'memo/:action': 'memo',
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

     memo: function(action) {
      if(action !== 'pair')
         return this.redirect404();

      this.before();

      $.get(jsonData('memo/'+action+'/boards'),function (data, textStatus, jqXHR){

        edWui.Collections.memoryBoard = Backbone.Collection.extend();;
        edWui.Collections.Instances.memoryBoard = new edWui.Collections.memoryBoard(data);

        edWui.Views.Instances.MemoIndex = new edWui.Views.MemoIndex();
        edWui.Views.Instances.MemoIndex.render();

        edWui.Views.Instances.MemoIndexAccordion = new edWui.Views.MemoIndexAccordion();
        edWui.Views.Instances.MemoIndexAccordion.render();

        });


      this.after();
        },

    redirect404:function(){
        console.warn('the requested route is unknown back to home');
        this.home();
        }

    });

})(window, window.document, window.edWui || (window.edWui = {}));