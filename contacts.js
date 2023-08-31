const fs = require("fs").promises;
const { error } = require("console");
const { v4: uuidv4 } = require("uuid");

const contactsPath = "./db/contacts.json";

function listContacts() {
  return fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data.toString());
  });
}

function getContactById(contactId) {
  return listContacts().then((list) => {
    const getId = list.find((contact) => contact.id === contactId);
    return getId;
  });
}

function removeContact(contactId) {
  return listContacts().then((list) => {
    const filterList = list.filter((contact) => contact.id !== contactId);
    return fs
      .writeFile(contactsPath, JSON.stringify(filterList), (error) => {
        if (error) {
          console.log(error);
        }
      })
      .then(() => `Contact with is ${contactId} was successfully removed`);
  });
}

function addContact(name, email, phone) {
  return listContacts().the((list) => {
    const addUserCnt = { id: uuidv4(), name, email, phone };
    list.push(addUserCnt);
    return fs
      .writeFile(contactsPath, JSON.stringify(list), (error) => {
        if (error) {
          console.log(error);
        }
      })
      .then(() => `Contact was successfully created`);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
