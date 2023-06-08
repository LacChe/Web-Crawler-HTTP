export default function contact(component){
    component.innerHTML = '';

    var header = document.createElement('h1');
    header.textContent = 'Contact';
    header.classList.add('page-block');
    component.appendChild(header);

    var contacts = [
        {
            name: 'name 1',
            title: 'title 1',
            phone: '111-111-111'
        },
        {
            name: 'name 2',
            title: 'title 2',
            phone: '222-222-222'
        },
        {
            name: 'name 3',
            title: 'title 3',
            phone: '333-333-333'
        },
    ]

    for(let c of contacts) {
        var contact = document.createElement('div');
        contact.classList.add('page-block');

        var name = document.createElement('h2');
        name.textContent = c.name;
        contact.appendChild(name);
        
        var title = document.createElement('p');
        title.textContent = c.title;
        contact.appendChild(title);
        
        var phone = document.createElement('p');
        phone.textContent = c.phone;
        contact.appendChild(phone);

        component.appendChild(contact);
    }
}