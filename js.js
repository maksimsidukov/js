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

    let contactName = document.getElementById('contactName').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let contactAddress = document.getElementById('contactAddress').value;

    contacts[contactName] = {number: contactNumber, address: contactAddress};
    console.log(contacts);

    saveInLocalStorage(contacts);

    document.getElementById('contactName').value = null;
    document.getElementById('contactNumber').value = null;
    document.getElementById('contactAddress').value = null;

    printContact();
}

function DeleteContact(key){
    let contacts = downloadOfLocalStorage();
    delete contacts[key];
    saveInLocalStorage(contacts);

    printContact();
}

function createContactTr(name, number, address){
    let trContact = document.createElement('tr');
    trContact.className = 'contact';

    let tdContactName = document.createElement('td');
    let tdContactNumber = document.createElement('td');
    let tdContactAddress = document.createElement('td');
    let tdDeleteContact = document.createElement('td');
    let deleteContact = document.createElement('button');

    tdContactName.className = 'contactName';
    tdContactNumber.className = 'contactNumber';
    tdContactAddress.className = 'contactAddress';
    tdDeleteContact.className = 'deleteContact';
    deleteContact.onclick = function (){ return DeleteContact(name)};
    tdDeleteContact.appendChild(deleteContact);

    tdContactName.innerText = name;
    tdContactNumber.innerText = number;
    tdContactAddress.innerText = address;
    deleteContact.innerText = "Удалить";

    trContact.appendChild(tdContactName);
    trContact.appendChild(tdContactNumber);
    trContact.appendChild(tdContactAddress);
    trContact.appendChild(tdDeleteContact);

    return trContact
}

function printContact(){
    let tableContact = document.getElementById("tableContact");
    let contacts = downloadOfLocalStorage();

    tableContact.innerHTML = '<tr class="contact tableHead"><td class="contactName">Имя</td><td class="contactNumber">Номер</td><td class="contactAddress">Адрес</td><td class="deleteContact">Удалить</td></tr>';
    for(let contact in contacts) {
        let contactName = contact;
        let contactNumber = contacts[contact].number;
        let contactAddress = contacts[contact].address;

        let trContact = createContactTr(contactName, contactNumber, contactAddress);

        tableContact.appendChild(trContact);
    }
}

function searchContact() {
    let attr = document.getElementById("searchContactName").value;
    let contacts = downloadOfLocalStorage();
    let searchContacts = {};

    for(let contact in contacts){
        if(attr === contact.toLowerCase() || attr === contacts[contact].number || attr === contacts[contact].address){
            searchContacts[contact] = contacts[contact];
            console.log('yes')
        }
    }
    console.log(searchContacts);
    printSearchContact(searchContacts);
    return searchContacts;
}

function createSearchContactTr(name, number, address){
    let trContact = document.createElement('tr');
    trContact.className = 'contact';

    let tdContactName = document.createElement('td');
    let tdContactNumber = document.createElement('td');
    let tdContactAddress = document.createElement('td');

    tdContactName.className = 'contactSearchName';
    tdContactNumber.className = 'contactSearchNumber';
    tdContactAddress.className = 'contactSearchAddress';

    tdContactName.innerText = name;
    tdContactNumber.innerText = number;
    tdContactAddress.innerText = address;

    trContact.appendChild(tdContactName);
    trContact.appendChild(tdContactNumber);
    trContact.appendChild(tdContactAddress);

    return trContact
}

function printSearchContact(obj) {

    let tableSearchContact = document.getElementById("tableSearchContact");
    let searchContacts = obj;

    tableSearchContact.innerHTML = '<tr class="contact tableHead"><td class="contactSearchName">Имя</td><td class="contactSearchNumber">Номер</td><td class="contactSearchAddress">Адрес</td></tr>';
    for(let contact in searchContacts) {
        let contactName = contact;
        let contactNumber = searchContacts[contact].number;
        let contactAddress = searchContacts[contact].address;

        let trContact = createSearchContactTr(contactName, contactNumber, contactAddress);

        tableSearchContact.appendChild(trContact);
    }
}

