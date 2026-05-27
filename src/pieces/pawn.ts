import { Piece } from "./piece";
import { Board } from "../board";

export class Pawn extends Piece {

    firstMove : boolean;

    constructor( color : string, position : { row: number, col: number} ){
        super( color, position );
            this.firstMove = true;
    }

    canMove( newPosition : { row: number, col: number } , board : Board ) : boolean {
        if ( !board ) return false;
        const isAPieceInTheWay = board.grid[newPosition.row]?.[newPosition.col] !== null;
        return this.isNormalMove(newPosition)
            || ( this.isDiagonalMove(newPosition) && isAPieceInTheWay )
            || this.isFirstBigMove(newPosition)
    }

    show() : string {
        return this.color === 'white' ? '♙' : '♟';
    }

    private isFirstBigMove( newPosition : { row: number, col: number } ){
        const sig = this.color === 'white' ? 1 : -1;
        return ( newPosition.row === this.position.row + (sig * 2) 
            && newPosition.col === this.position.col 
            && this.firstMove );
    }

    private isNormalMove( newPosition : { row: number, col: number } ){
        const sig = this.color === 'white' ? 1 : -1;
        return ( newPosition.row === this.position.row + (sig * 1)
            && newPosition.col === this.position.col );
    }

    private isDiagonalMove( newPosition : { row: number, col: number } ){
        const sig = this.color === 'white' ? 1 : -1;
        return ( newPosition.row === this.position.row + (sig * 1) 
            && ( newPosition.col === this.position.col - (sig * 1) 
            || newPosition.col === this.position.col + (sig * 1) ) );
    }

}
