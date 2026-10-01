const categoryVideos = document.getElementById("categoryVideos");
const videosContainer = document.getElementById("videosContainer");

function renderVideos(videoList) {
  videosContainer.innerHTML = "";

  if (videoList.length === 0) {
    videosContainer.innerHTML = "<p>Δεν υπάρχουν διαθέσιμα βίντεο.</p>";
    return;
  }

  videoList.forEach(video => {
    const card = document.createElement("article");
    card.classList.add("video-card");

    card.innerHTML = `
      <h4>${video.title}</h4>
      <iframe width="100%" height="200" src="${video.src}" frameborder="0" allowfullscreen></iframe>
    `;

    videosContainer.appendChild(card);
  });
}

function applyVideoFilter() {
  const selectedCategory = categoryVideos.value;

  const filtered = videos.filter(v => {
    return selectedCategory ? v.category === selectedCategory : true;
  });

  renderVideos(filtered);
}

// Events
categoryVideos.addEventListener("change", applyVideoFilter);

// Αρχική εμφάνιση
renderVideos(videos);
