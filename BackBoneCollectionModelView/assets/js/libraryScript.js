function fetch() {
  console.log('!fetch!');
  myLibrary.fetch();
}
// Backbone definition

// Model and view
var Book = Backbone.Model.extend({
  // localStorage: new Backbone.LocalStorage("BookLS"),
  url: 'booksURL',
  initialize: function () {
     // localStorage.clear();
     console.log('!book model initialized!');
   },
   defaults: {
     // id: -1,
     title: 'no title yet',
     units: 10
   }
 });

var BookView = Backbone.View.extend({
  tagName: 'tr',
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
        // this.model.save();  
      },
      events: {
        "click #btnRem" : "onRemove"
      },
      render: function() {
        console.log('!bookview render called!');

        // this.$el.append($('<td>' + this.model.get('title') + '</td>')).append($('<td>' + this.model.get('units') + '</td>')).append('<td><button>Remove</button></td>');
        this.$el.html($('<td>' + this.model.get('title') + '</td><td>' + this.model.get('units') + '</td><td><input type="button" id="btnRem" value="Remove"></input></td>'));
        // this.$el.appendTo($('body'))

        return this;
      },
      onRemove : function() {
        this.model.destroy();
        console.log('!deleted!');
        this.render();
        this.remove(); 
        // console.log(this.model);
        // console.log(this.model.attributes);
      }
    });

// Collection and View

var Library = Backbone.Collection.extend({
  model: Book,
  localStorage: new Backbone.LocalStorage("LibraryLS")
});

var LibraryView = Backbone.View.extend({
  formTempId : '#formTemp',
  initialize: function() {
    this.listenTo(this.collection, 'all', this.render);

  },
  events: {
    "click #addBook" : "onAddBook"
  },
  render: function() {
    console.log('!libView render called!');
    var $content = $('<table>');
        // var content = '<table>';
        for (var i in this.collection.models){
        // console.log('for in called');
        var myModel = new BookView({model: this.collection.models[i]});
        // content += myModel.render().$el.html();
        $content.append(myModel.render().$el);
      }
      this.$el.html($(this.formTempId).html()).append($content);
        // this.$el.html($(this.formTempId).html() + content + '</table>');
        return this;
      },
      onAddBook : function() {
        console.log('!book added!');
        var newTitle = this.$el.find('#titleInput');
        var newUnits = this.$el.find('#unitsInput');
        this.collection.create({title: newTitle.val(), units: newUnits.val()}).save();
      // for (var i = 0; i<10; i++){
      // this.collection.create({title: newTitle.val(), units: newUnits.val()+i}).save();
      // console.log('call' + i);
      // }
    }

  });





// var myBook = new Book({
//   id: 101,
//   title: 'Theft of swords'
// });

// var yourBook = new Book({
//   id: 102,
//   title: 'The Inimitable Jeeves'
// });



// var myBookView = new BookView({model:myBook});

var myLibrary = new Library();

var myLibraryView = new LibraryView({collection: myLibrary});


myLibraryView.render().$el.appendTo($('body'));



