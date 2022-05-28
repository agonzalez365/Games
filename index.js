window.onload = function () {
    //declare state
    let turn;
    let team1Pieces;
    let team2Pieces;
    //the elements will function as board state

    //buttons/elements
    const startBtn = $('#start');
    const board = $('#game-container');
    const turnText = $('#currentTurn');

    //custom event listeners
    $(document).on('changeTurn', function() {
        console.log('turn changed');
    })

    //board event listeners
    $('.cell').on('click', function() {
        console.log($(this));
    })

    $('.cell').on('mouseenter', function() {
        console.log('hover')
    })

    $('.cell').on('mouseleave', function() {
        
    })

    //button functionality
    startBtn.on('click', function () {
        startGame();
        
    });

    //function to begin a game
    function startGame() {
        //populate the board
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
        for(row; row <= 2; row++){
            //select the current row
            let currentRow = board.children().eq(row);

            //determine the startPoint for cell population to begin from - basically determines whether to indent the row
            let startPoint;
            if(row === 1){
                startPoint = 0;
            }
            else {
                startPoint = 1;
            }

            //populates every other cell from starting point in current row
            for(let i = startPoint; i < 8; i += 2){
                currentRow.children().eq(i).append(`<div class="piece team1"></div>`);
                
            }
        }

        //populate team2 side - same as team1 population, iterating over different rows
        row = 5;
        for(row; row <= 7; row++){
            let currentRow = board.children().eq(row);
            
            let startPoint;
            if(row === 6){
                startPoint = 1;
            }
            else {
                startPoint = 0;
            }

            for(let i = startPoint; i < 8; i += 2){
                currentRow.children().eq(i).append(`<div class="piece team2"></div>`);
            }
        }
        
    }

    function determineFirstTurn(){
        //return either 1 or 2, which will determine who goes first
        turn = Math.ceil(Math.random() * 2);
        console.log(turn);
        console.log(turnText.text());
        if(turn === 1){
            turnText.text('Team 1');
        }
        else {
            turnText.text('Team 2');
        }
    }

    function determineTurnState(pieceTaken){

    }

}