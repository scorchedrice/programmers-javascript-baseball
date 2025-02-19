// 숫자야구 페어프로그래밍 , 김희영, 최희수, 한지웅
// 조건
// 1. 삼항연산자를 사용금지
// 2. for 문 사용 금지
// 3. 함수를 작성할 때 20줄 이상 넘는 것 금지
// 목적
// 1. 숫자야구를 플레이한다.
// 2. 1단계의 숫자야구이므로 입력 시도 횟수는 무한이다.
const answer = [];
while (answer.length < 3) {
    const numb = Math.floor(Math.random() * 10);
    if (!answer.includes(numb)) {
        answer.push(numb);
    }
}
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("1을 입력하면 게임을 시작합니다. 9를 입력하면 종료합니다.")
let controller;
rl.on("line", function (line) {
    if(line == "9") {
        console.log("게임이 종료되었습니다.")
        rl.close();
    } else if(line == "1"){
        controller = line;
        console.log("게임을 시작합니다.")
    } else if(controller == "1" && line.length == 3){
        // 1. 사용자가 터미널에 입력하는 숫자(띄어쓰기 없이)를 배열로 변환한다.
        const input = line.split("");
        const ballCount = judgment(input);
        if (ballCount.strike == 3) {
            console.log("성공했습니다");
            controller = "";
            console.log("1을 입력하면 게임을 시작합니다. 9를 입력하면 종료합니다.")
        } else {
            console.log(ballCount);
        }
    }
}).on("close", function () {});
function judgment(input) {
    let score = { strike: 0, ball: 0, out: 0 };
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