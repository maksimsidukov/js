function saveInLocalStorage(obj){
    localStorage.setItem('contactBook', JSON.stringify(obj))
} //+

function downloadOfLocalStorage() {
    if(localStorage.getItem('contactBook') === null){
        saveInLocalStorage({});
    }
    return JSON.parse(localStorage.getItem('contactBook'))

} //+

function addContact(){
    let contacts = downloadOfLocalStorage();

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

            document.getElementById('contactName').value = null;
            document.getElementById('contactNumber').value = null;
            document.getElementById('contactAddress').value = null;
            document.getElementById('file').value = null;

            printContactsList(contacts);
        };
    }else{
        contacts[contactName] = {number: contactNumber, address: contactAddress, img: 'img/stock.png'};
        saveInLocalStorage(contacts);

        document.getElementById('contactName').value = null;
        document.getElementById('contactNumber').value = null;
        document.getElementById('contactAddress').value = null;
        document.getElementById('file').value = null;

        printContactsList(contacts);
    }
} //+

function deleteContact(){
    let contacts = downloadOfLocalStorage();
    let deleteContactName = document.getElementById('contactInfoName').innerText;
    delete contacts[deleteContactName];
    saveInLocalStorage(contacts);

    printContactsList(contacts);
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
} //+

function printContactsList(obj){
    let contactsList = document.getElementsByClassName("contacts-list")[0];
    let contacts = obj;
    contactsList.innerText = '';

    for(let contact in contacts) {

        let div = createContactListItem(contact, contacts[contact].img);
        // console.log(div);
        contactsList.appendChild(div);
    }
} //+

function printContactInfo(name) {
    let contactInfoName = document.getElementById('contactInfoName');
    let contactInfoNumber = document.getElementById('contactInfoNumber');
    let contactInfoAddress = document.getElementById('contactInfoAddress');
    let contactInfoImg = document.getElementById('contactInfoImg');
    let contacts = downloadOfLocalStorage();
    document.getElementById('deleteButton').style.display = 'block';


    contactInfoName.innerText = name;
    contactInfoNumber.innerText = contacts[name].number;
    contactInfoAddress.innerText = contacts[name].address;
    contactInfoImg.src = contacts[name].img;

} //+

function searchContact() {
    let attr = document.getElementById("searchContactName").value.toLowerCase();
    if(attr === ''){
        printContactsList(downloadOfLocalStorage());
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
            contact.push(contacts[i][j])
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

function imgToBase64() {
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        let base = reader.result;
        console.log(base);
        return base
    };

}