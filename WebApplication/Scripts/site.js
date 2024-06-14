/*jshint esversion: 6 */

// controller focus outline
// Let the document know when the mouse is being used
document.body.addEventListener("mousedown", function () {
  document.body.classList.add("used-mouse");
})
// Re-enable focus styling when Tab is pressed
document.body.addEventListener("keydown", function (event) {
  if (event.keyCode === 9) {
    document.body.classList.remove("used-mouse");
  }
})
