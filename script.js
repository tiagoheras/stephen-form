const form = document.querySelector('form');

let contactCount = 0;

function createContact() {
    contactCount += 1;

    const contactDiv = document.createElement('div');
    contactDiv.id = `contact-${contactCount}`;

    let addressCount = 1;

    const heading = document.createElement('h1');
    heading.className = 'contact-heading';
    heading.innerText = `Contact Nº ${contactCount}`;

    contactDiv.appendChild(heading);
    contactDiv.appendChild(createFormSection('Business Partner Details', ['Business Partner Name', 'Type', 'Trade', 'Reg Number', 'VAT Number', 'Credit', 'Discount', 'Uplift', 'Rebate']));
    contactDiv.appendChild(createFormSection('Supplier Account Details', ['Supplier Account Number', 'Bank Name', 'Bank Account Number', 'Sort Code']));
    contactDiv.appendChild(createFormSection('Primary Contact', ['First Name', 'Last Name', 'Position', 'Telephone', 'Mobile', 'Email']));
    contactDiv.appendChild(createFormSection(`Account Address ${addressCount}`, ['Address Line 1', 'Address Line 2', 'Address Line 3', 'City', 'Country', 'Postcode'], 'address'));

    form.appendChild(contactDiv);

    const addressBtn = document.createElement('button');
    addressBtn.innerText = 'Add Address';
    addressBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addressCount = contactDiv.querySelectorAll('section.account-address').length + 1;
        const addressSection = createFormSection(`Account Address ${addressCount}`, ['Address Line 1', 'Address Line 2', 'Address Line 3', 'City', 'Country', 'Postcode'], 'address');
        contactDiv.insertBefore(addressSection, addressBtn);
    })

    contactDiv.appendChild(addressBtn);

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
        console.log({ value });
    })

    addContact.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn.remove();
        addContact.remove();
        createContact();
    })

    btnContainer.appendChild(submitBtn);
    btnContainer.appendChild(addContact);

    return btnContainer;
}

function createFormSection(title, fields, type) {
    const section = document.createElement('section');
    const header = document.createElement('h2');

    section.id = formatText(title);
    header.innerText = title;

    if (type === 'address') {
        section.className = 'account-address';

        const closeBtn = document.createElement('button');
        closeBtn.innerText = 'X';
        closeBtn.className = 'close-btn';
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            section.remove();
        })

        section.appendChild(closeBtn);
    }

    const fieldsContainer = document.createElement('div');
    fieldsContainer.className = "fields-container";
    
    section.appendChild(header);
    section.appendChild(fieldsContainer);

    fields.forEach(field => {
        const fieldContainer = document.createElement('div');
        fieldContainer.id = formatText(field);
        fieldContainer.className = 'field-container';

        const label = document.createElement('label');
        label.innerText = field;

        const input = document.createElement('input');
        if (type === 'address') {
            input.name = `contact[${contactCount}]address[${title.charAt(title.length - 1)}][${formatText(field)}]`;
        } else {
            input.name = `contact[${contactCount}][${formatText(field)}]`;
        }

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        fieldsContainer.appendChild(fieldContainer);
    });

    return section;
}

createContact();