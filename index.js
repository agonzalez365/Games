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
    })

    //board event listeners
    //this is ugly but it seemed like the simplest solution
    //this event is how the player interacts with the board, when you click on a cell,
    //it will evaluate what moves (if any) can be done
    $('.cell').on('click', function () {
        //check if piece is present
        //console.log($(this).attr('id'));
        console.log($(this).attr('id').slice(1));
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


                //check if king before checking if a movement is available
                if (piece.hasClass('king')) {

                }
                else {

                }
            }
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
        team1Pieces = 16;
        team2Pieces = 16;

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
        turn = Math.ceil(Math.random() * 2);
        if (turn === 1) {
            turnText.text('Team 1');
        }
        else {
            turnText.text('Team 2');
        }
    }



}