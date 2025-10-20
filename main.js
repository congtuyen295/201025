function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.innerText = '🌸';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 6000);
}
setInterval(createPetal, 300);

const msg = document.getElementById('msg');
setTimeout(() => {
    msg.classList.add('rainbow');
    msg.style.borderRight = "none";
}, 5200);
const openBtn = document.getElementById('openBtn');
const container = document.getElementById('container');

openBtn.addEventListener('click', () => {
    container.classList.add('flipped');
});


const video = document.getElementById('videoPoem');
const page2Text = document.getElementById('page2Text');

const poemLines = [
    "20 - 10 tặng em",
    "Tặng em 1 tấm chân tình",
    "Nếu mà chưa đủ thân mình cũng trao",
    "Tặng em ngàn vạn ngôi sao",
    "Mỗi đêm bên cạnh cùng nhau ngắm trời",
    "Em là cô gái tuyệt vời",
    "Tặng em thêm 1 bạn đời là anh",
    "Nhìn hoa thì ở trên cành",
    "Nhìn em chỉ muốn ta thành 1 đôi",
];

// Khi mở thiệp, start video và typing
// openBtn.addEventListener('click', () => {
//   container.classList.add('flipped');

//   // start video
//   video.play();

//   // typing từng dòng theo thời gian (giả sử 4s/line)
//   poemLines.forEach((line, index) => {
//     setTimeout(() => {
//       page2Text.innerHTML += line + "<br>";
//     }, index * 1700);
//   });
// });


function typeText(element, text, delay = 50, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            // nếu gặp <br/> thì thêm xuống dòng
            if (text.substring(i, i + 5) === "<br/>") {
                element.innerHTML += "<br>";
                i += 5;
            } else {
                element.innerHTML += text[i];
                i++;
            }
            setTimeout(typing, delay);
        } else if (callback) {
            callback();
        }
    }
    typing();
}
openBtn.addEventListener('click', () => {
    container.classList.add('flipped');

    setTimeout(() => { // delay 1s trước khi video + typing
        video.play();

        let fullText = poemLines.join("<br/>") + "<br/>";
        let totalChars = fullText.length;
        const readingDuration = 15; // 15s video đọc thơ

        video.addEventListener('timeupdate', function handler() {
            let progress = Math.min(video.currentTime / readingDuration, 1);
            let charsToShow = Math.floor(progress * totalChars);
            page2Text.innerHTML = fullText.substring(0, charsToShow).replace(/<br\/>/g, "<br>");

            // khi typing xong tất cả ký tự
            if (charsToShow >= totalChars) {
                video.removeEventListener('timeupdate', handler);

                // Chờ 2 giây rồi chuyển cảnh
                setTimeout(() => {
                    page2Text.style.display = 'none';
                    const girlImg = document.getElementById('girlImg');
                    girlImg.style.display = 'block';
                    girlImg.style.opacity = 0;
                    girlImg.style.transition = 'opacity 1.5s ease';
                    setTimeout(() => { girlImg.style.opacity = 1; }, 50);
                }, 2000); // delay 2s
            }
        });
    }, 1000); // delay 1s trước khi chạy
});