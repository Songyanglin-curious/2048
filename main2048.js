// 主数据
let board = new Array();
// 分数
let score = 0;
let hasConflicted = new Array();

let startx = 0;
let starty = 0;
let endx = 0;
let endy = 0;

$(document).ready(function () {
    prepareForMobile();
    newGame();
});

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    else {

        $('#gridContainer').css('width', gridContainerWidth - 2 * cellSpace);
        $('#gridContainer').css('height', gridContainerWidth - 2 * cellSpace);
        $('#gridContainer').css('padding', cellSpace);
        $('#gridContainer').css('border-radius', 0.02 * gridContainerWidth);

        $('.grid-cell').css('width', cellSideLength);
        $('.grid-cell').css('height', cellSideLength);
        $('.grid-cell').css('board-radius', 0.02 * cellSideLength);
    }
}

function newGame() {
    // 初始化棋盘格子
    init();
    // 在随机两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $("#gridCell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    // 将bord初始化为一个二维数组，储存每个格子的数据
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (let j = 0; j < 4; j++) {
            // 初始化
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}


function updateBoardView() {
    $(".number-cell").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#gridContainer").append('<div class = "number-cell" id = "numberCell-' + i + '-' + j + '"></div>')
            let theNumberCell = $('#numberCell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                // ????????????????
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));
            }
            else {
                theNumberCell.css("width", cellSideLength);
                theNumberCell.css("height", cellSideLength);
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));
                theNumberCell.css("background-color", getNumberbackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
}

function generateOneNumber() {

    if (nospace(board)) {
        return false;
    }
    else {
        // 随机一个位置
        let randx = parseInt(Math.floor(Math.random() * 4));
        let randy = parseInt(Math.floor(Math.random() * 4));

        let times = 0;
        while (times < 50) {
            if (board[randx][randy] == 0) {
                break;
            }
            else {
                randx = parseInt(Math.floor(Math.random() * 4));
                randy = parseInt(Math.floor(Math.random() * 4));
            }

            times++;
        }
        if (times == 50) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j] == 0) {
                        randx = i;
                        randy = j;
                    }
                }
            }
        }
        // 随机一个数字
        let randNumber = Math.random() < 0.5 ? 2 : 4;
        // 在随机位置里显示随机数字
        board[randx][randy] = randNumber;
        showNumberWithAnimation(randx, randy, randNumber);

        return true;
    }
}

$(document).keydown(function (event) {

    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                // if (true) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            // console.log(moveLeft)
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            };
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            };
            break;
        default: //default
            break;
    }
})

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove', function (event) {
    event.preventDefault();
});

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    let deltax = endx - startx;
    let deltay = endy - starty;

    if (Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltax) < 0.1 * documentWidth)
        return;

    // x
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            // x正方向，右
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            };
        }
        else {
            // 左
            if (moveLeft()) {
                // if (true) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
    // y
    else {
        if (deltay > 0) {
            // y正，下
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            };
        }
        else {
            // 上
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
});


function isGameOver() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
function gameover() {
    alert("GameOver");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    else {
        // moveLeft
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (let k = 0; k < j; k++) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                            // move
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                            // move
                            showMoveAnimation(i, j, i, k);
                            // add
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            // add score 
                            score += board[i][k];
                            updateScore(score);
                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView() ", 200);
        return true;
    }
}


function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    else {
        // moveUp
        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (board[i][j] != 0) {
                    // 有可能上移，分为两种情况
                    for (let k = 0; k < i; k++) {
                        if (board[k][j] == 0 && noBlockHorizontalUp(j, k, i, board)) {
                            // move
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            // 如果不加continue会如何?
                            continue;
                        }
                        else if (board[k][j] == board[i][j] && noBlockHorizontalUp(j, k, i, board) && !hasConflicted[k][j]) {
                            // move
                            showMoveAnimation(i, j, k, j);
                            // add
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            // add score
                            score += board[k][j];
                            hasConflicted[k][j] = true;
                            updateScore(score);
                            continue;
                        }
                    }

                }
            }
        }
        // updateBoardView();
        setTimeout("updateBoardView()", 200);
        return true;
    }
}

function moveRight() {
    if (!canMoveRight) {
        return false;
    }
    else {
        // move
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j > -1; j--) {
                if (board[i][j] != 0) {
                    // 有可能右移
                    for (let k = 3; k > j; k--) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                            // move
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                            // move
                            showMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            // add score
                            score += board[i][k];
                            hasConflicted[i][k] = true;
                            updateScore(score);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()", 200);
        return true;
    }
}

function moveDown() {
    if (!canMoveDown) {
        return false;
    }
    else {
        // move
        for (let j = 0; j < 4; j++) {
            for (let i = 2; i > -1; i--) {
                if (board[i][j] != 0) {
                    for (let k = 3; k > i; k--) {
                        if (board[k][j] == 0 && noBlockHorizontalUp(j, i, k, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if (board[k][j] == board[i][j] && noBlockHorizontalUp(j, i, k, board) && !hasConflicted[k][j]) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            // add score
                            score += board[k][j];
                            hasConflicted[k][j] = true;
                            updateScore(score);
                            continue;
                        }

                    }
                }
            }
        }
        setTimeout("updateBoardView()", 200);
        return true;
    }
}





