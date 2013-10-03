// Backbone definition

// Model and view
var Book = Backbone.Model.extend({
  url: "a",
  initialize: function () {
     localStorage.clear();
     console.log('!book model initialized!');
 },
 defaults: {
     id: -1,
     title: 'no title yet',
     units: 10
 }
});

var BookView = Backbone.View.extend({
    tagName: "tr",
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        "click button" : "onRemove"
    },
    render: function() {
        this.$el.append($('<td>' + this.model.get('title') + '</td>')).append($('<td>' + this.model.get('units') + '</td>')).append('<td><button>Remove</button></td>');
        return this;
    },
    onRemove : function() {
        this.model.destroy();
    }
});

// Collection and View

var Library = Backbone.Collection.extend({
    model: Book,
    // localStorage: new Backbone.LocalStorage("LibraryLS")
});

var LibraryView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);

    },
    events: {

    },
    render: function() {
        
    }
});





var myBook = new Book({
  id: 101,
  title: 'Theft of swords'
});

var yourBook = new Book({
  id: 102,
  title: 'The Inimitable Jeeves'
});



var myBookView = new BookView({model:myBook});




