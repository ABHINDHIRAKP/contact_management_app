const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Retrieve a contact
//@route GET /api/contacts/:id
//access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if (!contact.user_id.equals(req.user.id)){
        res.status(403);
        throw new Error("user not authorized to view this contact");
    }

    res.status(200).json(contact);
});

//@desc Create a contact
//@route POST /api/contacts/
//access Public
const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    
    if (!contact.user_id.equals(req.user.id)){
        res.status(403);
        throw new Error("user not authorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if (!contact.user_id.equals(req.user.id)){
        res.status(403);
        throw new Error("user not authorized to delete this contact");
    }
    
    await Contact.findByIdAndDelete(req.params.id); 
    res.status(200).json({ message: "delete contact " + req.params.id});
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};