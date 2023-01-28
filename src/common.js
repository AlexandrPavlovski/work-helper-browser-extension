export function createElementButton(title, id, onClick) {
  const theButton = document.createElement("button");
  theButton.setAttribute("id", id);
  theButton.setAttribute("title", title);
  theButton.addEventListener("click", onClick);

  const imgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGcSURBVChTdZFLSyNBFIVPpTp21IaZhQp28BXf+BZEMIoiLkVnMci4Fxxcu9C9f8GF4N6V4B8QV240alQMgiCCG18kbR6dNt2da3V3EcjAfFBcOOdw69Yt/AuNxP86kwvrZxtbUvkPpHeSMRY/fhqN10vJR5G1wt7qGorkzn8amQiSpwUpIySrz87uQaMxNIRXPYrX5mapBlQFbdt57BsYBpgCrqhSDagKZnMFLf3xLoIhEONSDagK1tZpaGtvQTjEQaXCoZR9KsGbgfHpidQ19NQlBu8uoF8nZqVVzdvY5JHLa6i88ofMGpVStT9IWj6Vjj+pBLY4AxTz4lUOeDErnYBKsJy8As7vUc4bcMmFmFI6AX4w0dU9VVTVYQoT6PEZrjROln5ver6HH4zWab2KGulwLBNkWn4vJg7dJn55vgfv7OqnF8NYnjPSYKKVa5fE4m1YwrwPq62ZWE+DpreesFishzq+bMRzOdG+LIZlYtkuvsQuc5EIHhqakExn9lm0pa0XXHyX411oA5YDk6xtTa3fZYqaJc5hFvL4Bi92lRElTJWdAAAAAElFTkSuQmCC";
  const img = document.createElement("img");
  img.setAttribute("src", imgBase64);
  theButton.appendChild(img);

  return theButton;
}