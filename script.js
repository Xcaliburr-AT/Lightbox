const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");
const gallery = document.getElementById("gallery");

const supportedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

function initializeLightbox() {
    lightGallery(gallery, {
        selector: 'a',
        mode: 'lg-fade',
        speed: 600
    });
}

window.addEventListener("DOMContentLoaded", () => {
    fetch('gallery.php')
        .then(response => response.json())
        .then(images => {
            images.forEach(imageName => {
                const imageUrl = 'images/' + imageName;

                const link = document.createElement("a");
                link.href = imageUrl;
                link.setAttribute("data-lightbox", "gallery"); 

                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = imageName;

                link.appendChild(img);
                gallery.appendChild(link);
            });


            initializeLightbox();
        })
        .catch(error => {
            console.error('Error loading images:', error);
        });
});

uploadButton.addEventListener("click", (event) => {
    event.preventDefault();

    const file = fileInput.files[0];

    if (file && supportedTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append("file", file);

        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                alert(data.message);
            } else {
                const imageUrl = 'images/' + data.filename;

                const link = document.createElement("a");
                link.href = imageUrl;
                link.setAttribute("data-lightbox", "gallery");


                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = file.name;


                link.appendChild(img);
                gallery.appendChild(link);


                initializeLightbox();
            }
        })
        .catch(error => {
            console.error('Error uploading the image:', error);
            alert('Error uploading image.');
        });
    } else {
        alert("Please select a valid image file.");
    }
});
