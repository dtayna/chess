import { Board } from "../board";

export abstract class Piece {
    color : string;
    position : { row: number, col: number};

    constructor( color : string, position : { row: number, col: number} ){
        this.color = color;
        this.position = position;
    }

    abstract canMove( newPosition : { row: number, col: number} , board : Board) : boolean ;
    abstract show() : string;

    canMoveGeneral( newPosition : { row: number, col: number} , board : Board) : boolean {
        if ( !board ) return false;
        if ( board.grid[newPosition.row]?.[newPosition.col]?.color === this.color ) return false;
        return true;
    }

    move( newPosition : { row: number, col: number} , board : Board) : void {
        if ( !board ) return;
        board.grid[this.position.row]![this.position.col] = null;
        board.grid[newPosition.row]![newPosition.col] = this;
        this.position = newPosition;
    }

}