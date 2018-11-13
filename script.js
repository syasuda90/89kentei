const grade  = document.querySelector('.grade');
const title  = document.querySelector('.verification-title');
const label  = document.querySelector('.verification-question_label');
const answer = document.querySelector('.verification-question_answer strong');

const questionFirst  = document.querySelector('.verification-question_select:nth-child(1) strong');
const questionSecond = document.querySelector('.verification-question_select:nth-child(2) strong');
const questionThird  = document.querySelector('.verification-question_select:nth-child(3) strong');
const questionFour   = document.querySelector('.verification-question_select:nth-child(4) strong');

function fetchVerificationItems(index, type) {
  const xhr = new XMLHttpRequest();
  const path = 'items.json';

  xhr.open('GET', path, true);
  xhr.onreadystatechange = function () {
    if (xhr.status === 200) {
      const res = xhr.responseText;
      const data = JSON.parse(res);

      switch (type) {
        case 'question':
          title.innerHTML = data.items[index].title;
          label.innerHTML = data.items[index].label;
          questionFirst.innerHTML = data.items[index].text.first;
          questionSecond.innerHTML = data.items[index].text.second;
          questionThird.innerHTML = data.items[index].text.third;
          questionFour.innerHTML = data.items[index].text.four;
          break;
        case 'answer':
          answer.innerHTML = data.items[index].answer;
          break;
        default:
          break
      }
    }
  };
  xhr.send();
}

function getAnswer() {
  const index = grade.dataset.index;
  fetchVerificationItems(index, 'answer');
}

function fetchNextQuestion() {
  const prevIndex = parseInt(grade.dataset.index);
  const nextIndex = prevIndex + 1;
  fetchVerificationItems(nextIndex, 'question');
}

window.onload = function () {
  const defaultIndex = 0;
  fetchVerificationItems(defaultIndex, 'question');
}