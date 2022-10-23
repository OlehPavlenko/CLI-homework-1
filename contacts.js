const fs = require("fs").promises;
const uuid = require('uuid');
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const dataString = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(dataString);
    return data;
}

async function getContactById(contactId) {
    const constatsAll = await listContacts();
    const contactFind = constatsAll.find((constat) => constat.id === contactId);
    return contactFind ? contactFind : null;
}

async function removeContact(contactId) {
    const constatsAll = await listContacts();
    const index = constatsAll.findIndex((contact) => contact.id === contactId);
    const deletedContact = constatsAll[index];
    if (index !== -1) {
        constatsAll.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(constatsAll));
    }
    return deletedContact ? constatsAll : null;
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    };
    const constatsAll = await listContacts();
    constatsAll.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(constatsAll));
    console.log(constatsAll)
}

module.exports = { listContacts, getContactById, removeContact, addContact };