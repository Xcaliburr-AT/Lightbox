const fileInput = document.getElementById("file-input");
const gallery = document.getElementById("gallery");

const supportedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

fileInput.addEventListener("change", () => {
    const files = fileInput.files;

    Array.from(files).forEach((file) => {
        if (!supportedTypes.includes(file.type)) {
            alert(`Unsupported file type: ${file.name}`);
            return;
        }

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

                const imageUrl = data.filePath;


                const link = document.createElement("a");
                link.href = imageUrl;
                link.setAttribute("data-lightbox", "gallery");


                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = file.name;


                link.appendChild(img);
                gallery.appendChild(link);
            }
        })
        .catch(error => {
            console.error('Error uploading the image:', error);
            alert('Error uploading image.');
        });
    });
});
