console.log("Yessir");

const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "cHpftkS3cyvdnlg9KiPeoqraMWu8WQ-MrWK7U4-HgbSC5DHfS8");
myHeaders.append("x-apihub-host", "Vehicle-Hub-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "b9ea652b-1692-478e-bff3-31cce31199d7");

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

// Fetch data from the Vehicle Hub API
async function fetchVehicleData() {
    try {
        const response = await fetch("https://Vehicle-Hub-API.proxy-production.allthingsdev.co/api/vehicles/GetMakesForManufacturerAndYear/Porsche?year=2024&format=json", requestOptions);
        const data = await response.json();
        console.log("Raw API data:", data); // Log the raw API data
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// Display vehicle models on the page
async function displayVehicleModels() {
    const vehicleData = await fetchVehicleData();

    if (vehicleData && vehicleData.length >= 2) {
        // Create a new variable with only the relevant information for two models
        const relevantInfo = vehicleData.slice(0, 2).map(model => ({
            name: model.name,
            id: model.id
        }));

        console.log("Relevant information:", relevantInfo); // Log the relevant information

        // Display two car models from the API
        const modelsContainer = document.getElementById('models');
        modelsContainer.innerHTML = ''; // Clear previous content
        relevantInfo.forEach((model, index) => {
            modelsContainer.innerHTML += `
                <div class="model">
                    <h2>Model ${index + 1}: ${model.name}</h2>
                    <p>ID: ${model.id}</p>
                </div>
            `;
        });
    } else {
        document.getElementById('models').innerHTML = "<p>Not enough data available or error occurred.</p>";
    }
}

// Call the function to display vehicle models when the page loads
document.addEventListener('DOMContentLoaded', displayVehicleModels);