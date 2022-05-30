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
        if(turn === 1){
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
    $('.cell').on('click', function () {
        //check if piece is present
        //console.log($(this).attr('id'));
        //console.log($(this).attr('id').slice(1));
        //console.log(board);
        if ($(this).children().length > 0) {
            //check what team the piece is on and assign team for later comparison
            let piece = $(this).children().eq(0);
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
                let x = Number($(this).attr('id').slice(1));
                let y = Number($(this).parent().attr('id'));

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
        }
    })

    $('#game-container').on('click', 'div.move', function () {
        console.log('movin');
        if(!$(this).hasClass('hop')){
            $(this).trigger('changeTurn');
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
        //resetBoard();
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
                currentRow.children().eq(i).append(`<piece class="team1"></piece>`);

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
                currentRow.children().eq(i).append(`<piece class="team2"></piece>`);
            }
        }

    }

    //resets the board
    function resetBoard() {
        //instead of checking for pieces and removing them, this just empties the entire board of elements and appends back the default
        //REDO, this removes events
        board.empty();
        board.append(`
        <div class="row">
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
            </div>
            <div class="row">
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
            </div>
            <div class="row">
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
            </div>
            <div class="row">
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
            </div>
            <div class="row">
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
            </div>
            <div class="row">
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
            </div>
            <div class="row">
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
            </div>
            <div class="row">
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
                <div class="cell c2"></div>
                <div class="cell c1"></div>
            </div>
        `)
    }

    function determineFirstTurn() {
        //return either 1 or 2, which will determine who goes first
        turn = 1 //Math.ceil(Math.random() * 2);
        if (turn === 1) {
            turnText.text('Team 1');
            turnText.css('color', 'rgb(130, 58, 58)');
        }
        else {
            turnText.text('Team 2');
            turnText.css('color', 'rgb(34, 34, 116)');
        }
    }

    function checkAvailableMoves(x, y, team) {
        //since y axis is inverted, team 1 (top) navigate to y + 1
        //team 2 (bottom) will navigate to y - 1
        //kings wont be restricted
        //team 1 pieces can turn into kings at a y of 7
        //team 2 pieces can turn into kings at a y of 0


        // if(team === 1){
        //     let row = board.children().eq(y + 1);
        //     //let cellLeft = row.children().eq(x - 1);
        //     //let cellRight = row.children().eq(x + 1);
        //     for(let ix = -1; ix < 0; ix += 2){
        //         let targetCell = row.children().eq(x + ix);
        //         if(targetCell.children().length > 0){
        //             if(targetCell.children().eq(0).hasClass('team2')){
        //                 if(target){

        //                 }
        //             }
        //         }
        //         else {
        //             targetCell.append(`<div class="move"></div>`);
        //         }
        //     }
        // }
        // else {
        //     let row = board.children().eq(y - 1);
        //     console.log('test');
        //     console.log(row.children().eq(x - 1).has('piece'));
        //     if(row.children().eq(x - 1).length === 1) {
        //         row.children().eq(x - 1).append(`<div class="move"></div>`)
        //     }
        // }
    }

    //since y axis is inverted, team 1 (top) navigate to y + 1
    //team 2 (bottom) will navigate to y - 1
    //kings wont be restricted
    //team 1 pieces can turn into kings at a y of 7
    //team 2 pieces can turn into kings at a y of 0
    //repeat clicks on a piece will not re-append because
    //the conditionals are checking for child elements
    //for readability i create a lot of variables because dear god it's already bad enough

    function team1Moves(x, y, piece) {
        //repeat clicks on a piece will not re-append because
        //the conditionals are checking for child elements

        //forward cells
        let frontRow = board.children().eq(y + 1);

        //front left
        //if piece is present in leftward cell
        let leftCell = frontRow.children().eq(x - 1);
        if(leftCell.children().length > 0){
            //if it is a piece of another team and not on the edge
            let leftCellXVal = Number(leftCell.attr('id').slice(1));
            if(leftCell.children().eq(0).hasClass('team2') && leftCellXVal !== 0 && leftCellXVal !== 7){
                //left cell is now the 
                leftCell = board.children().eq(y + 2).children().eq(x - 2);
                //if new leftcell is not occupied, a move is available append
                if(leftCell.children().length === 0){
                    leftCell.append(`<div class="move hop"></div>`);
                }
            }
        }
        //else it is open and you can move normally
        else {
            leftCell.append(`<div class="move"></div>`);
        }

        //front right - same deal, x and y modified
        let rightCell = frontRow.children().eq(x + 1);
        if(rightCell.children().length > 0){
            let rightCellXVal = Number(rightCell.attr('id').slice(1));
            if(rightCell.children().eq(0).hasClass('team2') && rightCellXVal !== 0 && rightCellXVal !== 7){
                rightCell = board.children().eq(y + 2).children().eq(x + 2);
                if(rightCell.children().length === 0){
                    rightCell.append(`<div class="move hop"></div>`);
                }
            }
        }
        else {
            rightCell.append(`<div class="move"></div>`);
        }

        //backward movement
        //check if king
        let king = piece.hasClass('king');
        if(king){
            let backRow = board.children().eq(y - 1);
        }
    }

    function team2Moves(x, y, piece) {
    }



}