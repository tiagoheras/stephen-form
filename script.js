const form = document.querySelector('form');

let contactCount = 0;

function loadContactForm() {
    contactCount += 1;

    const contactDiv = document.createElement('div');
    contactDiv.id = `contact-${contactCount}`;

    const header = document.createElement('h1');
    header.className = 'contact-header';
    header.innerText = `Contact Nº ${contactCount}`;

    let addressCount = 1;

    const addressBtn = document.createElement('button');
    addressBtn.innerText = 'Add New Address';
    addressBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addressCount += 1;
        contactDiv.appendChild(createFormSection(`Account Address ${addressCount}`, ['Address Line 1', 'Address Line 2', 'Address Line 3', 'City', 'Country', 'Postcode']));
    })

    contactDiv.appendChild(header);
    contactDiv.appendChild(createFormSection('Business Partner Details', ['Business Partner Name', 'Type', 'Trade', 'Reg Number', 'VAT Number', 'Credit', 'Discount', 'Uplift', 'Rebate']));
    contactDiv.appendChild(createFormSection('Supplier Account Details', ['Supplier Account Number', 'Bank Name', 'Bank Account Number', 'Sort Code']));
    contactDiv.appendChild(createFormSection('Primary Contact', ['First Name', 'Last Name', 'Position', 'Telephone', 'Mobile', 'Email']));
    contactDiv.appendChild(createFormSection(`Account Address ${addressCount}`, ['Address Line 1', 'Address Line 2', 'Address Line 3', 'City', 'Country', 'Postcode']));
    contactDiv.appendChild(addressBtn);

    form.appendChild(contactDiv);
    form.appendChild(createButtons());
}

function formatText(text) {
    return text.replace(/\s+/g, "-").toLowerCase();
}

function createButtons() {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit';

    const addContact = document.createElement('button');
    addContact.innerText = 'Add Other Contact';

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const obj = {};
        const data = new FormData(document.forms[0]);
        const value = Object.fromEntries(data.entries());
        console.log({value});
    })

    addContact.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn.remove();
        addContact.remove();
        loadContactForm();
    })

    btnContainer.appendChild(submitBtn);
    btnContainer.appendChild(addContact);

    return btnContainer;
}

function createFormSection(title, fields) {
    const section = document.createElement('section');
    section.id = formatText(title);

    const header = document.createElement('h2');
    header.innerText = title;

    section.appendChild(header);

    fields.forEach(field => {
        const fieldContainer = document.createElement('div');
        fieldContainer.id = formatText(field);
        fieldContainer.className = 'field-container';

        const label = document.createElement('label');
        label.innerText = field;

        const input = document.createElement('input');
        input.name = `contact[${contactCount}][${formatText(field)}]`;

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        section.appendChild(fieldContainer);
    });

    return section;
}

loadContactForm();