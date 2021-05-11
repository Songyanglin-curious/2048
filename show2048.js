function showNumberWithAnimation(i, j, randNumber) {
    let numberCell = $("#numberCell-" + i + "-" + j);

    numberCell.css("background-color", getNumberbackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    // 动画
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        lef: getPosLeft(i, j),
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    let numberCell = $("#numberCell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

function updateScore(score) {
    $("#score").text(score);
}