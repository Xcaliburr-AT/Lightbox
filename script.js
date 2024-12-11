const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", () => {
    const files = fileInput.files;

    console.log("Selected files:", files);
});
