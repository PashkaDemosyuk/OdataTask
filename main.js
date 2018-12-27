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
    this.author = book.author[0].id;
    this.publisher = [];
    for (let publisher in book.publisher) {
        this.publisher.push(new Publisher(book.publisher[publisher]));
    }
}

//constructor for Publisher
function Publisher(publisher) {
    this.id = publisher.id;
    this.name = publisher.name;
}

window.onload = function () {
    setConfig('http://samples.databoom.space/api1/sampledb/collections');
    getData();
};

function setConfig(path) {
    o().config({
        endpoint: path,
    });
}

let personList = [];
function getData() {
    o('persons').expand('likes').expand('likes/publisher').get(function(data) {
        for (let i = 0; i < data.d.results.length; i++){
            personList.push(new Person(data.d.results[i]));
        }

        displayData();
    });
}

function displayData() {
    if (personList !== undefined){
        if (personList.length === 1)
            document.body.appendChild(toForm(personList[0]));
        else
            document.body.appendChild(toGrid(personList));
    }
}

function toGrid(list) {
    let table = document.createElement('table');

    if (list !== undefined)
        table.appendChild(createHeadRow(list[0]));

    for (let elem in  list)
        table.appendChild(createRow(list[elem]));

    return table;
}

function toForm(elem) {
    let form = document.createElement('form');

    for (let key in elem) {
        form.appendChild(createLabel(key));
        form.appendChild(createInput(elem[key], true));
    }

    return form;
}

function createLabel(key) {
    let label = document.createElement('label');
    label.innerText = key;
    return label;
}

function createInput(elem, disabled) {
    let input = document.createElement('input');
    input.setAttribute('type', "text");
    input.setAttribute('placeholder', key + "..");
    input.value = elem;
    input.disabled = disabled;
    return input;
}

function createHeadRow(elem) {
    let row = document.createElement('tr');

    for (let key in elem) {
        let cell = document.createElement('th');
        cell.innerText = key;
        row.appendChild(cell);
    }
    return row;
}

function createRow(elem) {
    let row = document.createElement('tr');
    for (let key in elem) {
        let cell = document.createElement('td');
        if (Array.isArray(elem[key]))
            cell.appendChild(arrayToGrid(elem[key]));
        else
            cell.innerHTML = elem[key];
        row.appendChild(cell);
    }
    return row;
}

function arrayToGrid(list) {
    let table = document.createElement('table');
    table.appendChild(createHeadRow(list[0]));

    for (let elem in list){
        let row = document.createElement('tr');
        for (let key in list[elem]){
            let cell = document.createElement("td");
            cell.innerHTML = list[elem][key];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}


// POST, PUT, DELETE and PATCH is not working because we needed credentials: password and login...

// // Create db object
// var db = databoom('https://samples.databoom.space', 'sandboxdb');
// function SaveAnObject(){
//     var John = { name: 'John' }, Jane = { name: 'Jane' };
//
//     John.wife = Jane;
//     Jane.husband = John;
//
//     //save data even with cyclic links
//     db.save( 'persons', John ).then( function( data ){
//         $('#save').html('Data saved successfully')
//     }, function( error ){
//         $('#save').html('Data saving error')
//     });
// }
//
//
// // // load collection 'persons'
// // db.load( 'persons').then( function( data ){
// //     $('#load').html('Persons loaded:\n' + JSON.stringify(data, null, 4))
// // }, function( error ){
// //     $('#load').html('Data loading error')
// // });
//
// // load collection 'persons'
// db.load( 'persons').then( function( data ){
//     var table = document.createElement("table");
//
// //Add a header
//     var header = document.createElement("tr");
//
//     var idHeaderCell = document.createElement("th");
//     var nameHeaderCell = document.createElement("th");
//     var relevanceHeaderCell = document.createElement("th");
//
//     header.appendChild(idHeaderCell);
//     header.appendChild(nameHeaderCell);
//     header.appendChild(relevanceHeaderCell);
//
//     table.appendChild(header);
//
// //Add the rest of the data to the table
//     for(var i = 0; i < data.length; i++) {
//         var id = (i + 1);
//         var name = data[i].key;
//         var relevance = data[i].value;
//
//         var tr = document.createElement("tr");
//
//         var idCell = document.createElement("td");
//         var nameCell = document.createElement("td");
//         var relevanceCell = document.createElement("td");
//
//         idCell.appendChild(document.createTextNode(id));
//         nameCell.appendChild(document.createTextNode(name));
//         relevanceCell.appendChild(document.createTextNode(relevance));
//
//         tr.appendChild(idCell);
//         tr.appendChild(nameCell);
//         tr.appendChild(relevanceCell);
//
//         table.appendChild(tr);
//     }
// });

