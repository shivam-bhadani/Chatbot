const socket = io();

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let btns = document.getElementsByClassName('incomming-btn');

textarea.addEventListener("keyup", (e) => {
    if (!e.target.value.trim())
        return;
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
});

send.addEventListener('click', () => {
    if (!textarea.value.trim()) return;
    sendMessage(textarea.value)
})

function btnClick(btnId, btnTitle) {
    // console.log(btnTitle);
    appendMessage(btnTitle, "outgoing");
    socket.emit('btnClick', btnId);
}

function sendMessage(message) {
    let msg = message.trim();

    // Append

    appendMessage(msg, "outgoing");

    textarea.value = "";
    scrollToBotton();

    // Send to server
    socket.emit("message", msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, "message");

    let markup = `  
        <p>${msg}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on("message", (msg) => {
    appendMessage(msg, "incoming");
    scrollToBotton();
})

socket.on('btnClick', (subtitles) => {
    appendBtn(subtitles);
    scrollToBotton();
})

function scrollToBotton() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

function appendBtn(subtitles) {

    let buttons = [];
    subtitles.forEach(subtitle => {
        buttons.push(document.createElement('button'))
    })

    for (let i = 0; i < subtitles.length; i++) {
        buttons[i].innerHTML = subtitles[i].subtitle;
        buttons[i].setAttribute('onclick', `getBtnAnswer('${subtitles[i]._id}', '${subtitles[i].subtitle}')`);
        buttons[i].classList.add('incomming-btn')
    }

    let subTitleContainer = document.createElement('div');
    subTitleContainer.classList.add('btn-container', 'subtitle-container')


    for (let i = 0; i < subtitles.length; i++) {
        subTitleContainer.appendChild(buttons[i]);
    }

    messageArea.appendChild(subTitleContainer)
}

function getBtnAnswer(id, subtitle) {
    // console.log(id);
    appendMessage(subtitle, "outgoing");
    socket.emit('btnAnswer', id);
}