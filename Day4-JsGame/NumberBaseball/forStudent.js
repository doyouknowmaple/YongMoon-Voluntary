const ANSWER = [];
const ANSWERSHEET = [];
var tryCount = 0;

const makeAnswer = () => {
  getRandomAnswerList();
  console.log(ANSWER);
};

const getRandomAnswerList = () => {
  let answer;
  for (i = 1; i <= 4; i++) {
    answer = randomNumber(1, 9);
    while (isAnswerDuplicate(answer, ANSWER)) {
      answer = randomNumber(1, 9);
    }
    ANSWER.push(answer);
  }
};

const randomNumber = (n, m) => {
  return Math.floor(Math.random() * (m - n + 1)) + n;
};

const isAnswerDuplicate = (answer, ANSWER) => {
  return ANSWER.includes(answer);
};

//-------------------- main code --------------------
makeAnswer();

function result() {
  var ballList = getBallList();
  if (isAllBallExist(ballList)) {
    checkAnswer(ballList);
  }
}

const checkAnswer = (ballList) => {
  const ball = checkStrikeBall(ballList);

  if (ball.strike === 4) {
    document.getElementById("modal").style.display = "flex";
  }

  let savingBallList = {
    balls: ballList,
    strike: ball.strike,
    ball: ball.ball,
  };

  if (!isBallInANSWERSHEET(savingBallList)) {
    tryCount++;
    document.getElementById("try").innerText = tryCount;
    ANSWERSHEET.push(savingBallList);
    addLog(savingBallList);
    console.log(ANSWERSHEET);
  } else {
    alert("이미 한번 제출하신 볼입니다!");
  }
};
//-------------------- main code --------------------

const getBallList = () => {
  let ballList = [];
  for (i = 1; i <= 4; i++) {
    try {
      const ballNumber = parseInt(document.getElementById("list" + i).childNodes.item(0).getAttribute("id"));
      if (isNaN(ballNumber)) {
        throw new Error("모든 공을 넣어주세요!");
      }
      ballList.push(ballNumber);
    } catch (error) {
      alert(error.message);
      break;
    }
  }
  console.log("[getBallList] ", ballList);
  return ballList;
};

const isAllBallExist = (ballList) => {
  return ballList.length === 4;
};

const checkStrikeBall = (ballList) => {
  let strikeCount = checkStrike(ballList);
  let ballCount = checkBall(ballList, strikeCount);
  console.log("스트라이크: " + strikeCount + ", 볼: " + ballCount);
  return { strike: strikeCount, ball: ballCount };
};

const checkStrike = (ballList) => {
  let strikeCount = 0;
  for (let i = 0; i < 4; i++) {
    if (ANSWER[i] === ballList[i]) {
      strikeCount++;
    }
  }
  return strikeCount;
};

const checkBall = (ballList, strikeCount) => {
  let ballCount = 0;
  for (let i = 0; i < 4; i++) {
    if (ANSWER.includes(ballList[i]) && ballList[i] !== ANSWER[i]) {
      ballCount++;
    }
  }
  return ballCount;
};

const isBallInANSWERSHEET = (savingBallList) => {
  for (i = 0; i < ANSWERSHEET.length; i++) {
    if (JSON.stringify(ANSWERSHEET[i].balls) === JSON.stringify(savingBallList.balls)) {
      return true;
    }
  }
  return false;
};

const addLog = (savingBallList) => {
  let addHTML = `<div id="answer">`;
  for (i = 0; i < 4; i++) {
    addHTML += `<div class="answerzone">
    <img
      src="img/`+ savingBallList.balls[i] + `.png"
      id="image"
      width="70"
      height="70"
    />
    </div>`;
  }

  addHTML += `<div><span>스트라이크: ` + savingBallList.strike;
  addHTML +=
    `</span><span>, 볼: ` + savingBallList.ball + `</span></div></div>`;

  document.getElementById("answers").innerHTML =
    addHTML + document.getElementById("answers").innerHTML;
};
