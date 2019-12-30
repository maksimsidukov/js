"use strict";

function saveInLocalStorage(obj){
    localStorage.setItem('contactBook', JSON.stringify(obj))
}

function downloadOfLocalStorage() {
    if(localStorage.getItem('contactBook') === null){
        saveInLocalStorage({});
    }
    return JSON.parse(localStorage.getItem('contactBook'))

}

function addContact(){
    let contacts = downloadOfLocalStorage();

    function cleanAddContactInputs(){
        document.getElementById('contactName').value = null;
        document.getElementById('contactNumber').value = null;
        document.getElementById('contactAddress').value = null;
        document.getElementById('file').value = null;
    }

    let contactName = document.getElementById('contactName').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let contactAddress = document.getElementById('contactAddress').value;
    let img = document.getElementById('file').files[0];
    // console.log(img);


    if(contactName === '' && contactNumber === '' && contactAddress === ''){
        console.log('Ничего не введено');
        return
    }
    if(img !== undefined) {
        let reader = new FileReader();
        reader.readAsDataURL(document.getElementById('file').files[0]);

        reader.onload = function () {
            // console.log(reader.result);
            contacts[contactName] = {number: contactNumber, address: contactAddress, img: reader.result};
            // console.log(contacts);

            saveInLocalStorage(contacts);

            cleanAddContactInputs();

            printContactsList(contacts);
        };
    }else{
        contacts[contactName] = {number: contactNumber, address: contactAddress, img: 'img/stock.png'};
        saveInLocalStorage(contacts);

        cleanAddContactInputs();

        printContactsList(contacts);
    }
}

function deleteContact(name){
    let contacts = downloadOfLocalStorage();
    let deleteContactName = name;
    delete contacts[deleteContactName];
    saveInLocalStorage(contacts);

    printContactsList(contacts);
    document.getElementById('contactInfoImg').src = '';
    document.getElementById('contactInfoName').innerText = '';
    document.getElementById('contactInfoNumber').innerText = '';
    document.getElementById('contactInfoAddress').innerText = '';
    document.getElementById('deleteButton').style.display = 'none';
}

function createContactListItem(name, imgSrc){

    let div = document.createElement('div');
    div.className = 'contact-item';

    let a = document.createElement('a');
    let p = document.createElement('p');
    let img = document.createElement('img');
    a.onclick = function () {
        return printContactInfo(name);
    };


    p.innerText = name;
    img.src = imgSrc;
    a.appendChild(img);
    a.appendChild(p);

    div.appendChild(a);

    // console.log(div);
    return div
}

function printContactsList(obj){
    let contactsList = document.getElementsByClassName("contacts-list")[0];
    contactsList.innerText = '';

    obj = sortObj(obj);

    for(let contact in obj) {

        let div = createContactListItem(contact, obj[contact].img);
        // console.log(div);
        contactsList.appendChild(div);
    }
}

function printContactInfo(name) {
    let contactInfoName = document.getElementById('contactInfoName');
    let contactInfoNumber = document.getElementById('contactInfoNumber');
    let contactInfoAddress = document.getElementById('contactInfoAddress');
    let contactInfoImg = document.getElementById('contactInfoImg');
    let contacts = downloadOfLocalStorage();
    document.getElementById('deleteButton').style.display = 'block';
    document.getElementById('deleteButton').onclick = function(){
        return deleteContact(name);
    };


    contactInfoName.innerText = `Имя: \n ${name}`;
    contactInfoNumber.innerText = `Номер: \n ${contacts[name].number}`;
    contactInfoAddress.innerText = `Адрес: \n ${contacts[name].address}`;
    contactInfoImg.src = contacts[name].img;

}

function searchContact() {
    let attr = document.getElementById("searchContactName").value.toLowerCase();
    // console.log(attr);
    if(attr === ''){
        printContactsList(downloadOfLocalStorage());
        console.log('search');
        return
    }
    let contacts = downloadOfLocalStorage();
    let searchContacts = {};
    let contact = [];
    // console.log(attr);

    for(let i in contacts){
        contact = [];
        contact.push(i);
        for(let j in contacts[i]){
            if(j === 'img'){
                continue
            }
            contact.push(contacts[i][j]);
        }
        // console.log(contact);
        contact.forEach(function(item){
            if(item.toLowerCase().indexOf(attr) !== -1){
                searchContacts[i] = contacts[i];
            }
        });
    }
    //console.log(searchContacts);
    printContactsList(searchContacts);
    // console.log('search');
    return searchContacts;

}

function sortObj(obj){
    let result = {};
    let names = [];

    for(let i in obj){
        names.push(i);
    }

    names.sort();

    names.forEach(function(item){
        result[item] = obj[item]
    });
    return result
}