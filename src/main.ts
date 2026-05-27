import { Board } from "./board";
import { Pawn } from "./pieces/pawn";
import { Knight } from "./pieces/knight";
import { Rook } from "./pieces/rook";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import * as readline from "readline/promises";
import { Piece } from "./pieces/piece";
import { stdin as input, stdout as output } from "process";

const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
const rl = readline.createInterface({ input, output });

const board = new Board();


function setUpBoard() : void {
    if ( !board ) return;
    for ( let i = 0; i < 8 ; i++){
        board.grid[1]![i] = new Pawn( "white", { row: 1, col: i } );
        board.grid[6]![i] = new Pawn( "black", { row: 6, col: i } );
    }
    board.grid[0]![0] = new Rook( "white", { row: 0, col: 0 } );
    board.grid[0]![7] = new Rook( "white", { row: 0, col: 7 } );
    board.grid[7]![0] = new Rook( "black", { row: 7, col: 0 } );
    board.grid[7]![7] = new Rook( "black", { row: 7, col: 7 } );

    board.grid[0]![1] = new Knight( "white", { row: 0, col: 1 } );
    board.grid[0]![6] = new Knight( "white", { row: 0, col: 6 } );
    board.grid[7]![1] = new Knight( "black", { row: 7, col: 1 } );
    board.grid[7]![6] = new Knight( "black", { row: 7, col: 6 } );

    board.grid[0]![2] = new Bishop( "white", { row: 0, col: 2 } );
    board.grid[0]![5] = new Bishop( "white", { row: 0, col: 5 } );
    board.grid[7]![2] = new Bishop( "black", { row: 7, col: 2 } );
    board.grid[7]![5] = new Bishop( "black", { row: 7, col: 5 } );

    board.grid[0]![4] = new King( "white", { row: 0, col: 4 } );
    board.grid[7]![4] = new King( "black", { row: 7, col: 4 } );
}

async function play() : Promise<void> {
    let piece = null;

    while (!piece) {
        const answer = await rl.question("Source? ");
        const [r, c] = answer.split("");
        if (r === undefined || c === undefined) return
        const [row, col] = [Number(r), cols.indexOf(c)];

        if (!Number.isNaN(row) && !Number.isNaN(col)) {
          piece = board.grid[row]?.[col] ?? null;
        }
      }
      
      let target: { row: number; col: number } | null = null;
      let moveOk = false;
      
      while (!moveOk) {
        const answer = await rl.question("Target? ");
        const [r, c] = answer.split("");
        if (r === undefined || c === undefined) return
        const [row, col] = [Number(r), cols.indexOf(c)];
      
        if (!Number.isNaN(row) && !Number.isNaN(col)) {
          moveOk = piece.canMove({ row, col }, board);
      
          if (moveOk) {
            target = { row, col };
          }
        }
      }

    piece?.move( target!, board );
    board.showBoard();
}

async function init() {
    setUpBoard();
    board.showBoard();
    while (true) {
        await play();
    }
    
}

init();