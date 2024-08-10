// Set up the headers for the request
const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "cHpftkS3cyvdnlg9KiPeoqraMWu8WQ-MrWK7U4-HgbSC5DHfS8");
myHeaders.append("x-apihub-host", "Movies-Verse.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "5122e0f8-a949-45a9-aedf-5eaf61c6085b");

// Configure the request options
const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

// Fetching the data from the API
fetch("https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/top-box-office", requestOptions)
   .then((response) => {
      if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse response as JSON
   })
   .then((result) => {
      // console.log(result);
      const moviesContainer = document.getElementById('popmovies');
      // Checks if the movies/data is accessible
      if (result && result.movies && result.movies.length > 1) {
         moviesContainer.innerHTML += `
            <div class="movie-left box-box">
               <img src="${result.movies[0].image}" alt="${result.movies[0].title} poster" class="movie-poster"/>
               <h3 class="title">Title:</h3>
               <h3 class="movie-name-w-d">${result.movies[0].title}</h3>  
            </div>
         `; // This showcases the movie name and poster 
      } else {
         moviesContainer.innerHTML += `<p>No movies available.</p>`;
      }
      if (result && result.movies && result.movies.length > 2) {
         moviesContainer.innerHTML += `
            <div class="movie-right box-box">
               <img src="${result.movies[1].image}" alt="${result.movies[1].title} poster" class="movie-poster"/>
               <h3 class="title">Title:</h3>
               <h3 class="movie-name-t">${result.movies[1].title}</h3>
              
            </div>
         `; // This showcases the movie name and poster
      }
   })
   .catch((error) => console.error('Error:', error)); // Handles the possible errors