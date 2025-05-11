document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.getElementById("stars");
  let selectedRating = 0;

  if (starsContainer) {
    let stars = starsContainer.textContent.trim().split('');
    starsContainer.innerHTML = stars.map((_, i) =>
      `<span data-index="${i}">☆</span>`
    ).join('');

    starsContainer.addEventListener("click", (e) => {
      if (e.target.tagName === 'SPAN') {
        const index = parseInt(e.target.dataset.index);
        selectedRating = index + 1;
        const allStars = starsContainer.querySelectorAll('span');
        allStars.forEach((star, i) => {
          star.textContent = i <= index ? '★' : '☆';
        });
      }
    });
  }

  window.submitFeedback = function () {
    const username = document.getElementById("username").value.trim();
    const comment = document.getElementById("feedback-text").value.trim();
    const feedbackDisplay = document.getElementById("feedback-display");

    if (!username || !comment || selectedRating === 0) {
      alert("Please fill out all fields and select a rating.");
      return;
    }

    const feedbackEntry = document.createElement("div");
    feedbackEntry.className = "feedback-entry";
    feedbackEntry.innerHTML = `
      <strong>${username}</strong> rated <strong>${selectedRating}/5</strong><br>
      <p>${comment}</p>
      <hr>
    `;

    feedbackDisplay.prepend(feedbackEntry);

    // Optionally clear inputs
    document.getElementById("username").value = '';
    document.getElementById("feedback-text").value = '';
    const stars = starsContainer.querySelectorAll('span');
    stars.forEach(star => star.textContent = '☆');
    selectedRating = 0;

    alert("Thank you for your feedback!");
  };
});