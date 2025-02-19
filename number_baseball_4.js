// 정답
let answer = [];
makeAnswer();
// 승리/패배 정보
let winner;
let user = { win: 0, lose: 0 };
let computer = { win: 0, lose: 0 };
// 기준
let computerStandard= 0;
let cntArr = [];
// 최대, 최소, 평균
const INF = 987654321;
let maxTries = -1;
let minTries = INF;
let minIndex = 0;
let maxIndex = 0;
let sumCnt = 0;
let sumStandard = 0;
// history
let histories = [];
const hisMap = new Map();
const hisDetailMap = new Map();
let gameCnt = 1;
let index = 1;
// history - 날짜
let startDate = "";
// input 관련
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let prevSelect = "";
// 게임의 시작 전 console
startMessage()
rl.on("line", function (line) {
    if (prevSelect == "2") {
        if (hisDetailMap.has(parseInt(line))) {
            console.log(hisDetailMap.get(parseInt(line)));
            console.log("확인할 게임 번호를 입력하세요. (종료하려면 0 입력)");
            console.log(hisMap);
        } else if (line == "0") {
            prevSelect = "";
            console.log("기록보기를 종료합니다.");
            startMessage()
        } else {
            console.log("확인할 게임 번호가 존재하는지 다시 확인해주세요.");
            console.log(hisMap);
        }
    } else if (prevSelect == "1" && computerStandard == 0) {
        computerStandard = line;
        cntArr.push(computerStandard);
        sumStandard += parseInt(computerStandard);
        console.log("게임을 시작합니다.");
        if (startDate == "") startDate = getDate();
    } else if (line == "9") {
        console.log("게임이 종료되었습니다.");
        rl.close();
    } else if (line == "1") {
        prevSelect = "1";
        console.log("컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요?");
    } else if (line == "2") {
        prevSelect = "2";
        console.log("확인할 게임 번호를 입력하세요. (종료하려면 0 입력)");
        console.log(hisMap);
    } else if (line == "3") {
        if (minTries == 987654321) {
            console.log('게임을 시도하고 기록을 확인하실 수 있어요.')
        } else {
            console.log(
                `최대시도 : ${maxTries}-[${maxIndex}], 최소시도 : ${minTries}-[${minIndex}], 평균시도 : ${
                    sumCnt / (gameCnt - 1)
                } \n컴퓨터 전적:[승: ${computer.win} 패: ${
                    computer.lose
                } 승률: ${Math.round(
                    (computer.win / gameCnt) * 100
                )} %] \n사용자 전적:[승:${user.win} 패: ${user.lose} 승률 ${Math.round(
                    (user.win / gameCnt) * 100
                )} %], \n가장 많은 횟수 : ${Math.max(
                    ...cntArr
                )} \n가장 적은 횟수 : ${Math.min(...cntArr)}, \n적용된 승리/패패 횟수 평균: ${
                    (sumStandard / cntArr.length).toFixed(2)
                }회`
            );
        }
        startMessage()
    } else if (prevSelect == "1") {
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
                if (computerStandard == index && ballCount.strike !== 3) {
                    winner = "컴퓨터";
                    endGame();
                } else {
                    if (input.length >= 3) {
                        index++;
                        if (ballCount.strike == 3) {
                            winner = "사용자";
                            endGame(ballCount, line);
                        } else {
                            console.log(ballCount);
                        }
                    }
                }
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
function getDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}.${currentDate.getMonth()}.${currentDate.getDay()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}
function makeAnswer() {
    answer = [];
    while (answer.length < 3) {
        const numb = Math.floor(Math.random() * 9) + 1;
        if (!answer.includes(numb)) {
            answer.push(numb);
        }
    }
}
function updateTries(gameCnt) {
    if (maxTries < histories.length) {
        maxTries = histories.length;
        maxIndex = gameCnt;
    }
    if (minTries > histories.length) {
        minTries = histories.length;
        minIndex = gameCnt;
    }
}
function startMessage() {
    console.log(
        "1을 입력하면 게임을 시작, 2를 입력하면 기록, 3을 입력하면 최대/최소/평균 기록, 9를 입력하면 종료합니다."
    );
}
function updateHistory(ballCount, line) {
    const stringData = `${startDate} / ${getDate()} / ${
        histories.length
    }/ 승리자: ${winner}`;
    hisMap.set(gameCnt, stringData);
    hisDetailMap.set(gameCnt, histories);
    updateTries(gameCnt);
    gameCnt++;
    sumCnt += histories.length;
}
function resetGame() {
    index = 1;
    startMessage() // 시작 메세지
    makeAnswer();
    computerStandard = 0;
    histories = [];
    prevSelect = 0;
}
function endGame() {
    console.log(`${winner}가 승리하였습니다.`); // 승리정보 출력
    updateHistory();
    resetGame();
    if (winner == "컴퓨터") {
        computer.win++;
        user.lose++;
    } else if (winner == "사용자") {
        computer.lose++;
        user.win++;
    }
}