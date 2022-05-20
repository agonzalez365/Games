window.onload = function () {
    //declare state
    let turn;
    let team1Pieces;
    let team2Pieces;

    //buttons/elements
    const startBtn = $('#start');
    const board = $('#game-container');

    //button functionality
    startBtn.on('click', function () {
        startGame();
        
    });

    //function to begin a game
    function startGame() {
        //populate the board
        populateBoard();

        //initialize state
        turn = determineFirstTurn();
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
        return Math.ceil(Math.random() * 2);
    }

    function determineTurnState(pieceTaken){

    }

}