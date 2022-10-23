const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsAll = await listContacts();
            console.table(contactsAll);
            break;

        case "get":
            const contact = await getContactById(String(id));
            console.log(contact);
            break;

        case "add":
            const creatContact = await addContact(name, email, phone);
            break;

        case "remove":
            const deletContact = await removeContact(String(id));
            console.log(deletContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);