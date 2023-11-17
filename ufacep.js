const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");
require('dotenv').config();

const OPENAI_API_KEY = process.env.API_KEY;
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelector(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        const aiGeneratedImg = `data:image/jpeg;base64, ${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href", aiGeneratedImg);
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`)
        }
    })
}

const generateAiImages = async (userPrompt, userImageQuantity) => {
    try{
        const response = await fetch ("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImageQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if(!reponse.ok) throw new Error("Failed to generate images! Please try again");

        const { data } = await response.json();
        updateImageCard([...data]);
    } catch(error) {
        alert(error.message);
    } finally {
        isImageGenerating = false;
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    if(isImageGenerating) return;
    isImageGenerating = true;

    const userPrompt = e.srcElement[0].value;
    const userImageQuantity = e.srcElement[1].value;

    const imgCardMarkup = Array.from({ lenght: userImageQuantity }, () =>
        `<div class="img-card">
          <img src="images/img-1.jpg" alt="image">
          <a href="#" class="download-btn">
           <img src="images/download.svg" alt="download icon">
          </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImageQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);