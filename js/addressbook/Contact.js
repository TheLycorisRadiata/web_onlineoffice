class Contact
{
    constructor(lastname, firstname, id, email, phone, is_active)
    {
        this.lastname = lastname;
        this.firstname = firstname;
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.is_active = is_active;
    }

    static present_contact(contact)
    {
        alert(`Hello! My name is ${contact.firstname} ${contact.lastname}. You can contact me at ${contact.email} or on ${contact.phone}.`);
    }
}

class ContactPro extends Contact
{
    constructor(lastname, firstname, id, email, phone, is_active, linkedin)
    {
        super(lastname, firstname, id, email, phone, is_active);
        this.link = linkedin;
    }

    static present_contact(contact)
    {
        const do_redirect = confirm(`Hello! My name is ${contact.firstname} ${contact.lastname}. You can contact me at ${contact.email} or on ${contact.phone}.` + 
            `\r\n\r\n` + 
            `You can also find me on LinkedIn! Click on "OK" to be redirected to my account.`);

        if (do_redirect)
            open(contact.link, '_blank');
    }
}

class ContactPerso extends Contact
{
    constructor(lastname, firstname, id, email, phone, is_active, facebook)
    {
        super(lastname, firstname, id, email, phone, is_active);
        this.link = facebook;
    }

    static present_contact(contact)
    {
        const do_redirect = confirm(`Hello! My name is ${contact.firstname} ${contact.lastname}. You can contact me at ${contact.email} or on ${contact.phone}.` + 
            `\r\n\r\n` + 
            `You can also find me on Facebook! Click on "OK" to be redirected to my account.`);

        if (do_redirect)
            open(contact.link, '_blank');
    }
}

