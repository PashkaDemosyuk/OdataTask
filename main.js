window.onload = function () {
    setConfig('http://samples.databoom.space/api1/sampledb/collections');
    document.getElementById("getBtn").addEventListener("click", getData);

};

function setConfig(path) {
    o().config({
        endpoint: path,
        format: JSON,
        withCredentials: true
    });
}

function setFilter() {
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let age = document.getElementById("age").value;

    let filter = "";
    if (firstname !== ""){
        if (filter !== "")
            filter += " and ";
        filter += `firstname eq \'${firstname}\'`
    }
    if (lastname !== ""){
        if (filter !== "")
            filter += " and ";
        filter += `lastname eq '${lastname}'`
    }
    if (age !== ""){
        if (filter !== "")
            filter += " and ";
        filter += `age eq ${age}`;
    }

    return filter;
}

let personList = [];
function getData() {
    let filter = setFilter();
    if (filter !== "") {
        personList = [];
        o('persons').filter(filter).expand('likes').expand('likes/publisher').get(function (data) {
            for (let i = 0; i < data.d.results.length; i++) {
                personList.push(new Person(data.d.results[i]));
            }
            displayData();
        });
    }
    else {
        personList = [];
        o('persons').expand('likes').expand('likes/publisher').get(function(data) {
            for (let i = 0; i < data.d.results.length; i++){
                personList.push(new Person(data.d.results[i]));
            }

            displayData();
        });
    }
}

function displayData() {
    if (personList !== undefined){
        document.getElementById("data").innerHTML = "";
        if (personList.length === 1)
            document.getElementById("data").appendChild(toForm(personList[0]));
        else
            document.getElementById("data").appendChild(toGrid(personList));
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
    form.id = "resultForm";

    for (let key in elem) {
        form.appendChild(createLabel(key));
        if (Array.isArray(elem[key])){
            for (let obj in elem[key]){
                form.appendChild(createInput(key, objToString(elem[key][obj]), false));
            }
        }
        else
            form.appendChild(createInput(key, elem[key], false));
    }

    form.appendChild(createButton("putBtn", "Put"));

    return form;
}

function objToString(obj) {
    let result = "";
    for (let key in obj){
        if (typeof obj[key] === "object")
            result += `${key} : ${objToString(obj[key])}`;
        else
            result +=  `${key}: ${obj[key]}, `;
    }
    return result.slice(0, -2);
}

function createLabel(key) {
    let label = document.createElement('label');
    label.innerText = key;
    return label;
}

// function createInput(elem, disabled) {
//     let input = document.createElement('input');
//     input.setAttribute('type', "text");
//     input.setAttribute('placeholder', key + "..");
//     input.value = elem;
//     input.disabled = disabled;
//     input.id = key + "Result";
//     return input;
// }

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
            cell.appendChild(toGrid(elem[key]));
        else if (typeof elem[key] === "object")
            cell.appendChild(toGrid([elem[key]]));
        else
            cell.innerHTML = elem[key];

        row.appendChild(cell);
    }

    return row;
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

