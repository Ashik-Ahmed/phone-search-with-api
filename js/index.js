const loadPhones = () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(response => response.json())
        .then(data => showPhones(data.data))
}


const showPhones = (phones) => {

    const searchResultContainer = document.getElementById("search-result");

    phones.forEach(phone => {
        const name = phone.phone_name;
        const photo = phone.image;

        const phoneContainer = document.createElement("div");
        phoneContainer.classList.add("col-12", "col-md-6", "col-lg-4")

        phoneContainer.innerHTML = `
            <div class="card mb-3" style="width: 18rem;">
                <img src="${photo}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <button class="btn btn-primary">See Details</button>
                </div>
            </div>
        `
        searchResultContainer.appendChild(phoneContainer);
        console.log(name);
    });
}