let answer = [];
let maxTries = -1;
let minTries = 999999999;
makeAnswer();
// history
let histories = [];
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let index = 1;
rl.on("line", function (line) {
    // 1. 사용자가 터미널에 입력하는 숫자(띄어쓰기 없이)를 배열로 변환한다.
    if (line === "history") {
        record();
    } else if (!/^[1-9]{3}$/.test(line)) {
        console.log(":경고: 세자리의 숫자만, 띄어쓰기 없이 입력해주세요.");
    } else {
        const input = line.split("");
        const inputSet = new Set();
        input.forEach((a) => inputSet.add(a));
        if (inputSet.size !== 3) {
            console.log("중복된 숫자는 입력 불가합니다.");
        } else {
            const ballCount = judgment(input);
            histories.push([ballCount, index, line]);
            index++;
            if (ballCount.strike == 3) {
                console.log("성공했습니다");
                updateTries();
                // 성공한 이후 인덱스 초기화
                index = 1;
                makeAnswer();
                histories = [];
                console.log(
                    `최대 시도 횟수는 ${maxTries}번, 최소 시도 횟수는 ${minTries}번`
                );
            } else {
                console.log(ballCount);
            }
        }
    }
}).on("close", function () {});
function record() {
    // 사용자가 CLI로 기록 요청을 한 경우
    // 출력형태 : n번째, 입력값: 123, 결과: {strike: ball: out:}
    histories.forEach((history) => {
        const [a, b, c] = history;
        console.log(`${b}번째, 입력값: ${c}, 결과:`, a);
    });
}
function judgment(input) {
    let score = { strike: 0, ball: 0, out: 0 };
    //   console.log(answer);
    input.forEach((element) => {
        const checkBall = answer.includes(parseInt(element));
        if (checkBall) {
            if (answer.indexOf(parseInt(element)) == input.indexOf(element)) {
                score.strike += 1;
            } else {
                score.ball += 1;
            }
        } else {
            score.out += 1;
        }
    });
    return score;
}
function updateTries() {
    if (maxTries < histories.length) {
        maxTries = histories.length;
    }
    if (minTries > histories.length) {
        minTries = histories.length;
    }
}
function makeAnswer() {
    answer = [];
    while (answer.length < 3) {
        const numb = Math.floor(Math.random() * 9) + 1;
        if (!answer.includes(numb)) {
            answer.push(numb);
        }
    }
    console.log(answer);
}


