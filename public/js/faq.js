let individualFaqQuestion = document.getElementsByClassName('individual-faq-question');

for (let i = 0; i < individualFaqQuestion.length; i++) {
    let k = 1;
    let individualFaqAnswer = document.getElementsByClassName('individual-faq-answer')[i];
    let arrow = document.getElementsByClassName('arrow')[i];
    individualFaqQuestion[i].addEventListener('click', () => {
        individualFaqAnswer.classList.toggle('show-answer');
        if (k) {
            arrow.innerHTML = `<i class="fas fa-chevron-up"></i>`
            k = 1 - k;
        }
        else {
            arrow.innerHTML = `<i class="fas fa-chevron-down"></i>`
            k = 1 - k;
        }
    });
}