// script.js
let isPlaying = false;

function handleAvatarError() {
    console.error("Ошибка загрузки аватарки. Проверьте путь к файлу.");
    const avatar = document.querySelector('.avatar');
    avatar.src = "https://via.placeholder.com/150"; // Заглушка
}

async function updateContent() {
    try {
        const response = await fetch('bio-data.json');
        const data = await response.json();
        
        const contentDiv = document.getElementById('dynamic-content');
        contentDiv.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.text}</p>
            ${data.images.map(img => `<img src="assets/${img}" style="max-width: 300px; margin: 10px;">`).join('')}
        `;
    } catch (error) {
        console.error('Ошибка загрузки контента:', error);
    }
}

// Обновляем контент каждые 5 секунд
setInterval(updateContent, 5000);
updateContent(); // Инициальная загрузка

// Функция для включения музыки
function playMusic() {
    const audio = document.getElementById('bg-music');
    const button = document.querySelector('.music-button');
    
    if (!isPlaying) {
        audio.play().catch(error => {
            console.error("Ошибка воспроизведения музыки:", error);
            alert("Пожалуйста, нажмите на сайт, чтобы разрешить звук");
        });
        button.textContent = "⏸️";
    } else {
        audio.pause();
        button.textContent = "▶️";
    }
    isPlaying = !isPlaying;
}
