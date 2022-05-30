window.onload = function () {
    //declare state
    let turn;
    let team1Pieces;
    let team2Pieces;
    //the elements will function as board state
    //it will look like this
    /*
    y 
    0)x 0 1 2 3 
    1)x 0 1 2 3
    2)x 0 1 2 3
    3)x 0 1 2 3
    */

    //buttons/elements
    const startBtn = $('#start');
    const board = $('#game-container');
    const turnText = $('#currentTurn');

    //custom event listeners
    $(document).on('changeTurn', function () {
        console.log('turn changed');
        if (turn === 1) {
            turn = 2;
            turnText.text('Team 2');
            turnText.css('color', 'rgb(34, 34, 116)');
        }
        else {
            turn = 1;
            turnText.text('Team 1');
            turnText.css('color', 'rgb(130, 58, 58)');
        }

    })

    //board event listeners
    //this is ugly but it seemed like the simplest solution
    //this event is how the player interacts with the board, when you click on a cell,
    //it will evaluate what moves (if any) can be done
    $('.cell').on('click', 'piece', function () {
        removePossibleMoves();
        //check what team the piece is on and assign team for later comparison
        let piece = $(this);
        let team;
        if (piece.hasClass('team1')) {
            team = 1;
        }
        else {
            team = 2
        }

        //if it is that pieces turn, proceed
        if (turn === team) {
            //determine the x and y coordinates from ids
            let x = Number($(this).parent().attr('id').slice(1));
            let y = Number($(this).parent().attr('id').slice(0, 1));

            //uncomment to check x
            //console.log('x:', x);
            //console.log('y:', y);


            //check availables moves
            if (team === 1) {
                team1Moves(x, y, piece);
            }
            else {
                team2Moves(x, y, piece);
            }
        }
    })

    $('#game-container').on('click', 'div.move', function () {
        let origPosX = $(this).text().slice(1, 2);
        let origPosY = $(this).text().slice(3, 4);
        let pieceTeam = $(this).text().slice(5, 6);
        let pieceKing = $(this).text().slice(7);
        if ($(this).hasClass('nohop')) {
            //replace piece
            if (pieceKing == 1) {
                $(this).parent().empty().append(`<piece class="team${pieceTeam} king"></piece>`);
            }
            else {
                $(this).parent().empty().append(`<piece class="team${pieceTeam}"></piece>`);
            }

            //remove old piece
            board.children().eq(origPosY).children().eq(origPosX).empty();

            //remove other moves
            removePossibleMoves();

            //change turn
            $(document).trigger('changeTurn');
        }
        else {
            //replace move with piece
            let cell = ($(this).parent());
            if (pieceKing == 1) {
                cell.empty().append(`<piece class="team${pieceTeam} king"></piece>`);
            }
            else {
                cell.empty().append(`<piece class="team${pieceTeam}"></piece>`);
            }

            //remove old pieces
            board.children().eq(origPosY).children().eq(origPosX).empty();
            let cellX = Number(cell.attr('id').slice(1));
            let cellY = Number(cell.attr('id').slice(0, 1));
            //and i thought i was being clever not tracking the board
            if (cellY > origPosY) {
                if (cellX > origPosX) {
                    board.children().eq(cellY - 1).children().eq(cellX - 1).empty();
                }
                else {
                    board.children().eq(cellY - 1).children().eq(cellX + 1).empty();
                }
            }
            else {
                if (cellX > origPosX) {
                    board.children().eq(cellY + 1).children().eq(cellX - 1).empty();
                }
                else {
                    board.children().eq(cellY + 1).children().eq(cellX + 1).empty();
                }
            }

            //update the state
            if (pieceTeam == 1) {
                team1Pieces -= 1;
                if (team1Pieces === 0) {
                    //to do: game over
                }
            }
            else {
                team2Pieces -= 2;
                if (team2Pieces === 0) {
                    //to do: game over
                }
            }


            //remove other moves
            removePossibleMoves();
        }
    })

    $('.cell').on('mouseenter', function () {
        //console.log('hover')
    })

    $('.cell').on('mouseleave', function () {

    })

    //button functionality
    startBtn.on('click', function () {
        startGame();
    });

    //function to begin a game
    function startGame() {
        //populate the board
        resetBoard();
        populateBoard();
        determineFirstTurn();

        //initialize state
        team1Pieces = 12;
        team2Pieces = 12;

    }

    //populates the board with pieces at default starting positions
    function populateBoard() {
        //populate team1 side
        let row = 0;
        //outer loops iterate through specific rows that will be populated
        for (row; row <= 2; row++) {
            //select the current row
            let currentRow = board.children().eq(row);

            //determine the startPoint for cell population to begin from - basically determines whether to indent the row
            let startPoint;
            if (row === 1) {
                startPoint = 0;
            }
            else {
                startPoint = 1;
            }

            //populates every other cell from starting point in current row
            for (let i = startPoint; i < 8; i += 2) {
                currentRow.children().eq(i).append(`<piece class="team1 king"></piece>`);

            }
        }

        //populate team2 side - same as team1 population, iterating over different rows
        row = 5;
        for (row; row <= 7; row++) {
            let currentRow = board.children().eq(row);

            let startPoint;
            if (row === 6) {
                startPoint = 1;
            }
            else {
                startPoint = 0;
            }

            for (let i = startPoint; i < 8; i += 2) {
                currentRow.children().eq(i).append(`<piece class="team2 king"></piece>`);
            }
        }

    }

    //resets the board
    function resetBoard() {
        for (let i = 0; i < 8; i++) {
            board.children().eq(i).each(function () {
                $(this).children().each(function (index) {
                    if ($(this).children().length > 0) {
                        $(this).empty();
                    }
                })
            })
        }
    }

    function removePossibleMoves() {
        //iterates through each row's children checking if it contains moves, and removing them
        for (let i = 0; i < 8; i++) {
            board.children().eq(i).each(function () {
                $(this).children().each(function (index) {
                    if ($(this).children().eq(0).hasClass('move')) {
                        $(this).empty();
                    }
                })
            })
        }
    }

    function determineFirstTurn() {
        //return either 1 or 2, which will determine who goes first
        turn = Math.ceil(Math.random() * 2);
        if (turn === 1) {
            turnText.text('Team 1');
            turnText.css('color', 'rgb(130, 58, 58)');
        }
        else {
            turnText.text('Team 2');
            turnText.css('color', 'rgb(34, 34, 116)');
        }
    }

    //since y axis is inverted, team 1 (top) navigate to y + 1
    //team 2 (bottom) will navigate to y - 1
    //kings wont be restricted
    //team 1 pieces can turn into kings at a y of 7
    //team 2 pieces can turn into kings at a y of 0
    //repeat clicks on a piece will not re-append because
    //the conditionals are checking for child elements
    //data will be hidden in the text of moves for the the move event listener to read
    //for readability i created a lot of variables here because dear god it's already bad enough

    function team1Moves(x, y, piece) {
        //repeat clicks on a piece will not re-append because
        //the conditionals are checking for child elements

        let king = Number(piece.hasClass('king'));

        //forward cells
        let frontRow = board.children().eq(y + 1);

        //front left
        //if piece is present in leftward cell
        let leftCell = frontRow.children().eq(x - 1);
        if (leftCell.children().length > 0 ) {
            //if it is a piece of another team and not on the edge
            let leftCellXVal = Number(leftCell.attr('id').slice(1));
            if (leftCell.children().eq(0).hasClass('team2') && leftCellXVal !== 0 && leftCellXVal !== 7) {
                //left cell is now on the other side of piece
                leftCell = board.children().eq(y + 2).children().eq(x - 2);
                //if new leftcell is not occupied, a move is available append
                if (leftCell.children().length === 0) {
                    leftCell.append(`<div class="move hop">x${x}y${y}t1k${king}</div>`);
                }
            }
        }
        //else it is open and you can move normally
        else {
            if(x - 1 >= 0){
                leftCell.append(`<div class="move nohop">x${x}y${y}t1k${king}</div>`);
            }
        }

        //front right - same deal, x and y modified
        let rightCell = frontRow.children().eq(x + 1);
        if (rightCell.children().length > 0) {
            let rightCellXVal = Number(rightCell.attr('id').slice(1));
            if (rightCell.children().eq(0).hasClass('team2') && rightCellXVal !== 0 && rightCellXVal !== 7) {
                rightCell = board.children().eq(y + 2).children().eq(x + 2);
                if (rightCell.children().length === 0) {
                    rightCell.append(`<div class="move hop">x${x}y${y}t1k${king}</div>`);
                }
            }
        }
        else {
            if(x + 1 <= 7) {
                rightCell.append(`<div class="move nohop">x${x}y${y}t1k${king}</div>`);
            }
        }

        //backward movement
        //check if king
        if (king === 1) {
            let backRow = board.children().eq(y - 1);

            //back left
            let backLeftCell = backRow.children().eq(x - 1);

            if (backLeftCell.children().length > 0) {
                let backLeftCellXVal = Number(backLeftCell.attr('id').slice(1));

                if (backLeftCell.children().eq(0).hasClass('team2') && backLeftCellXVal !== 0 && backLeftCellXVal !== 7) {
                    backLeftCell = board.children().eq(y - 2).children().eq(x - 2);
                    console.log(backLeftCell);

                    if (backLeftCell.children().length === 0) {
                        backLeftCell.append(`<div class="move hop">x${x}y${y}t1k${king}</div>`);
                    }
                }
            }
            else {
                if(x - 1 >= 0){
                    backLeftCell.append(`<div class="move nohop">x${x}y${y}t1k${king}</div>`);
                }
            }

            //back right
            let backRightCell = backRow.children().eq(x + 1);
            if (backRightCell.children().length > 0) {
                let backRightCellXVal = Number(backRightCell.attr('id').slice(1));

                if (backRightCell.children().eq(0).hasClass('team2') && backRightCellXVal !== 0 && backRightCellXVal !== 7) {
                    backRightCell = board.children().eq(y - 2).children().eq(x + 2);
                    console.log('t1r')
                    console.log(backRightCell);

                    if (backRightCell.children().length === 0) {
                        backRightCell.append(`<div class="move hop">x${x}y${y}t1k${king}</div>`);
                    }
                }
            }
            else {
                if(x + 1 <= 7){
                    backRightCell.append(`<div class="move nohop">x${x}y${y}t1k${king}</div>`);
                }
            }
        }
    }

    function team2Moves(x, y, piece) {
        let king = Number(piece.hasClass('king'));

        //forward cells
        let frontRow = board.children().eq(y - 1);

        //front left
        //if piece is present in leftward cell
        let leftCell = frontRow.children().eq(x - 1);
        if (leftCell.children().length > 0) {
            //if it is a piece of another team and not on the edge
            let leftCellXVal = Number(leftCell.attr('id').slice(1));
            if (leftCell.children().eq(0).hasClass('team1') && leftCellXVal !== 0 && leftCellXVal !== 7) {
                //left cell is now on the other side of piece
                leftCell = board.children().eq(y - 2).children().eq(x - 2);
                //if new leftcell is not occupied, a move is available append
                if (leftCell.children().length === 0) {
                    leftCell.append(`<div class="move hop">x${x}y${y}t2k${king}</div>`);
                }
            }
        }
        //else it is open and you can move normally
        else {
            if(x - 1 >= 0) {
                leftCell.append(`<div class="move nohop">x${x}y${y}t2k${king}</div>`);
            }
        }

        //front right - same deal, x and y modified
        let rightCell = frontRow.children().eq(x + 1);
        if (rightCell.children().length > 0) {
            let rightCellXVal = Number(rightCell.attr('id').slice(1));
            if (rightCell.children().eq(0).hasClass('team1') && rightCellXVal !== 0 && rightCellXVal !== 7) {
                rightCell = board.children().eq(y - 2).children().eq(x + 2);
                if (rightCell.children().length === 0) {
                    rightCell.append(`<div class="move hop">x${x}y${y}t2k${king}</div>`);
                }
            }
        }
        else {
            if(x + 1 <= 7) {
                rightCell.append(`<div class="move nohop">x${x}y${y}t2k${king}</div>`);
            }
        }

        //backward movement
        //check if king
        if (king === 1) {
            let backRow = board.children().eq(y + 1);

            //back left
            let backLeftCell = backRow.children().eq(x - 1);

            if (backLeftCell.children().length > 0) {
                let backLeftCellXVal = Number(backLeftCell.attr('id').slice(1));

                if (backLeftCell.children().eq(0).hasClass('team1') && backLeftCellXVal !== 0 && backLeftCellXVal !== 7) {
                    backLeftCell = board.children().eq(y + 2).children().eq(x - 2);

                    if (backLeftCell.children().length === 0) {
                        backLeftCell.append(`<div class="move hop">x${x}y${y}t2k${king}</div>`);
                    }
                }
            }
            else {
                if(x - 1 >= 0) {
                    backLeftCell.append(`<div class="move nohop">x${x}y${y}t2k${king}</div>`);
                }
            }

            //back right
            let backRightCell = backRow.children().eq(x + 1);
            if (backRightCell.children().length > 0) {
                let backRightCellXVal = Number(backRightCell.attr('id').slice(1));

                if (backRightCell.children().eq(0).hasClass('team1') && backRightCellXVal !== 0 && backRightCellXVal !== 7) {
                    backRightCell = board.children().eq(y + 2).children().eq(x + 2);
                    console.log('t')
                    console.log(backRightCell);

                    if (backRightCell.children().length === 0) {
                        backRightCell.append(`<div class="move hop">x${x}y${y}t2k${king}</div>`);
                    }
                }
            }
            else {
                if(x + 1 <= 7) {
                    backRightCell.append(`<div class="move nohop">x${x}y${y}t2k${king}</div>`);
                }
            }
        }
    }



}