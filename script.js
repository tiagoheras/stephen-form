const form = document.querySelector('form');

let partnerCount = 0;

function createPartner() {
    partnerCount += 1;

    const partnerDiv = document.createElement('div');
    partnerDiv.id = `partner-${partnerCount}`;
    partnerDiv.className = 'partner';

    let addressCount = 1;

    const heading = document.createElement('h1');
    heading.className = 'partner-heading';
    heading.innerText = `Partner Nº ${partnerCount}`;

    partnerDiv.appendChild(heading);
    if (partnerCount > 1) {
        console.log(partnerCount);
        partnerDiv.appendChild(createCloseBtn());
    }
    partnerDiv.appendChild(createFormSection('Business Partner Details', ['Business Partner Name', 'Type', 'Trade', 'Reg Number', 'VAT Number', 'Credit', 'Discount', 'Uplift', 'Rebate']));
    partnerDiv.appendChild(createFormSection('Supplier Account Details', ['Supplier Account Number', 'Bank Name', 'Bank Account Number', 'Sort Code']));
    partnerDiv.appendChild(createFormSection('Primary Contact', ['First Name', 'Last Name', 'Position', 'Telephone', 'Mobile', 'Email']));
    partnerDiv.appendChild(createFormSection(`Account Address ${addressCount}`, ['Address Line 1', 'Address Line 2', 'Address Line 3', 'City', 'Country', 'Postcode'], 'address'));

    form.appendChild(partnerDiv);

    const addressBtn = document.createElement('button');
    addressBtn.innerText = 'Add Address';
    addressBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addressCount = partnerDiv.querySelectorAll('section.account-address').length + 1;
        const addressSection = createFormSection(`Account Address ${addressCount}`, ['Address Line 1', 'Address Line 2', 'Address Line 3', 'City', 'Country', 'Postcode'], 'address');
        partnerDiv.insertBefore(addressSection, addressBtn);
    })

    partnerDiv.appendChild(addressBtn);

    createButtons();
}

function formatText(text) {
    return text.replace(/\s+/g, "-").toLowerCase();
}

function createButtons() {
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit';

    const addpartner = document.createElement('button');
    addpartner.innerText = 'New partner';

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const obj = {};
        const data = new FormData(document.forms[0]);
        const value = Object.fromEntries(data.entries());
        console.log({ value });
    })

    addpartner.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn.remove();
        addpartner.remove();
        createpartner();
    })

    form.appendChild(addpartner);
    form.appendChild(submitBtn);
}

function createCloseBtn() {
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'X';
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeBtn.parentNode.remove();
    })
    return closeBtn
}

function createFormSection(title, fields, type) {
    const section = document.createElement('section');
    const header = document.createElement('h2');

    section.id = formatText(title);
    header.innerText = title;

    if (type === 'address') {
        section.className = 'account-address';
        section.appendChild(createCloseBtn());
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
            input.name = `partner[${partnerCount}]address[${title.charAt(title.length - 1)}][${formatText(field)}]`;
        } else {
            input.name = `partner[${partnerCount}][${formatText(field)}]`;
        }

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        fieldsContainer.appendChild(fieldContainer);
    });

    return section;
}

createPartner();