//constructor for Person
function Person(person) {
    this.id = person.id;
    this.firstname = person.firstname;
    this.lastname = person.lastname;
    this.age = person.age;
    this.likes = [];
    for (let book in person.likes){
        this.likes.push(new Book(person.likes[book]));
    }
}

//constructor for book
function Book(book) {
    this.id = book.id;
    this.title = book.title;

    try{
        this.author = book.author[0].id;
    }
    catch (e){
        this.author = "unknown";
    }

    try{
        this.publisher = new Publisher(book.publisher[0]);
    }
    catch (e){
        this.publisher = "unknown";
    }
}

//constructor for Publisher
function Publisher(publisher) {
    this.id = publisher.id;
    this.name = publisher.name;
    this.president = publisher.president[0].id;
}