import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';

export default function menu(component){
    component.innerHTML = '';

    var header = document.createElement('h1');
    header.textContent = 'Menu';
    header.classList.add('page-block');
    component.appendChild(header);

    var dishes = [
        {
            name: 'name 1',
            desc: 'desc 1',
            price: '1',
            imageSrc: image1,
            imageAlt: 'alt 1',
        },
        {
            name: 'name 2',
            desc: 'desc 2',
            price: '2',
            imageSrc: image2,
            imageAlt: 'alt 2',
        },
        {
            name: 'name 3',
            desc: 'desc 3',
            price: '3',
            imageSrc: image3,
            imageAlt: 'alt 3',
        },
    ]

    for(let d of dishes) {
        var dish = document.createElement('div');
        dish.classList.add('page-block');

        var name = document.createElement('h2');
        name.textContent = d.name;
        dish.appendChild(name);
        
        var desc = document.createElement('p');
        desc.textContent = d.desc;
        dish.appendChild(desc);
        
        var dishInnerDiv = document.createElement('div');
        dishInnerDiv.classList.add('dish-inner-div');

        var price = document.createElement('p');
        price.textContent = '$' + d.price;
        dishInnerDiv.appendChild(price);
    
        var image = document.createElement('img')
        image.src = d.imageSrc;
        image.alt = d.imageAlt;
        dishInnerDiv.appendChild(image);
    
        dish.appendChild(dishInnerDiv);
        component.appendChild(dish);
    }
}