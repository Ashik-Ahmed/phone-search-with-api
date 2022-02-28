const loadPhones = () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(response => response.json())
        .then(data => showPhones(data.data))
}


const showPhones = (phones) => {
    phones.forEach(phone => {
        const name = phone.phone_name;
        const photo = phone.image;
        console.log(name);
    });
}