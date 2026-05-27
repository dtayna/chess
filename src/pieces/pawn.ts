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
        const target = board.grid[newPosition.row]?.[newPosition.col];

        if (this.isDiagonalMove(newPosition)) {
            const isAPieceInTheWay = target !== null && target!.color !== this.color;
            return isAPieceInTheWay;

        } else if (this.isFirstBigMove(newPosition) || this.isNormalMove(newPosition)) {
            return target?.color === this.color || target === null;

        }
        return false;
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
