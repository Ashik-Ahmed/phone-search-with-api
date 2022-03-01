

const searchResultContainer = document.getElementById("search-result");
const detailsContainer = document.getElementById("phone-details");
const errorMessage = document.getElementById("error-message");
const searchValue = document.getElementById("search-box");

const loadPhones = () => {


    if (document.getElementById("search-box").value != "") {

        // fetching data dynamically from api
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.data.length != 0) {
                    showPhones(data.data)
                    searchValue.value = ``;
                }
                else {
                    errorMessage.style.display = "block";
                    // clear previous search result 
                    searchResultContainer.textContent = ``;
                    detailsContainer.textContent = ``;
                    searchValue.value = ``;
                }
            })
    }
    else {
        alert("PLease write something");
        // clear previous search result 
        searchResultContainer.textContent = ``;
        detailsContainer.textContent = ``;
        errorMessage.style.display = "none";

        searchValue.value = ``;
    }
}


const showPhones = (phones) => {

    // clear previous search result 
    searchResultContainer.textContent = ``;
    detailsContainer.textContent = ``;
    errorMessage.style.display = "none";

    phones.forEach(phone => {

        const id = phone.slug;
        const name = phone.phone_name;
        const photo = phone.image;
        const brand = phone.brand;

        // createing data container 
        const phoneContainer = document.createElement("div");
        phoneContainer.classList.add("col-12", "col-md-6", "col-lg-4")

        // adding info to card 
        phoneContainer.innerHTML = `
            <div class="card mb-3" style="width: 18rem;">
                <img src="${photo}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Model: <span class="text-secondary">${name}</span></h5>
                    <h5 class="card-title">Brand: <span class="text-secondary">${brand}</span></h5>
                    <button onclick="showDetails('${id}')" class="btn btn-primary">See Details</button>
                </div>
            </div>
        `
        // showing search result in web page 
        searchResultContainer.appendChild(phoneContainer);
    });
}


const showDetails = async (id) => {

    console.log(id);

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data)

    const name = data.data.name;
    const release = data.data.releaseDate;
    const photo = data.data.image;

    const { chipSet, displaySize, memory, storage, sensors } = data.data.mainFeatures;
    /*
    const chipset = data.data.mainFeatures.chipSet;
    const displaySize = data.data.mainFeatures.displaySize;
    const memory = data.data.mainFeatures.memory;
    const storage = data.data.mainFeatures.storage;
    const sensors = [...data.data.mainFeatures.sensors];
    */

    const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = data.data.others;

    /*
    const bluetooth = data.data.others.Bluetooth;
    const gps = data.data.others.GPS;
    const nfc = data.data.others.NFC;
    const radio = data.data.others.Radio;
    const usb = data.data.others.USB;
    const wlan = data.data.others.WLAN;
    */


    // console.log(chipSet, displaySize, sensors, memory, storage);
    console.log(Bluetooth, GPS, NFC, Radio, USB, WLAN);


    detailsContainer.textContent = ``;
    setDetailsData(name, release, photo, chipSet, displaySize, memory, storage, sensors, Bluetooth, GPS, NFC, Radio, USB, WLAN);


}


const setDetailsData = (name = "No data found", release = "No data found", photo = "No data found", chipset = "No data found", displaySize = "No data found", memory = "No data found", storage = "No data found", sensors = "No data found", bluetooth = "No data found", gps = "No data found", nfc = "No data found", radio = "No data found", usb = "No data found", wlan = "No data found") => {

    /*
    if (release == "" || name == "") {
        this.value = "Not found";
        console.log(this.value);
    }
    */

    const phoneInfo = document.createElement("div");

    phoneInfo.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-12 col-lg-4">
                        <img src="${photo}" class="h-75 rounded-start p-3 m-3" alt="...">
                    </div>
                    <div class="col-12 col-lg-8">
                        <div class="card-body ms-lg-4">
                            <h5 class="card-title">Model: ${name}</h5>
                            <p class="card-text"><span class="fw-bold">Release: </span>${release}</p>
                            <p class="card-text"><span class="fw-bold">Chipset: </span>${chipset}</p>
                            <p class="card-text"><span class="fw-bold">Display: </span>${displaySize}</p>
                            <p class="card-text"><span class="fw-bold">Memory: </span>${memory}</p>
                            <p class="card-text"><span class="fw-bold">Storage: </span>${storage}</p>
                            <p class="card-text"><span class="fw-bold">Sensors: </span>${sensors}</p>
                            <p class="card-text"><span class="fw-bold">Bluetooth: </span>${bluetooth}</p>
                            <p class="card-text"><span class="fw-bold">GPS: </span>${gps}</p>
                            <p class="card-text"><span class="fw-bold">NFC: </span>${nfc}</p>
                            <p class="card-text"><span class="fw-bold">Radio: </span>${radio}</p>
                            <p class="card-text"><span class="fw-bold">USB: </span>${usb}</p>
                            <p class="card-text"><span class="fw-bold">WLAN: </span>${wlan}</p>

                        </div>
                    </div>
                </div>
            </div>
    `
    detailsContainer.appendChild(phoneInfo);

}