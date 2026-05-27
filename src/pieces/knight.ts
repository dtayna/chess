import { Piece } from "./piece";
import { Board } from "../board";

export class Knight extends Piece {

    constructor( color : string, position : { row: number, col: number} ){
        super( color, position );
    }

    canMove( newPosition : { row: number, col: number } , board : Board ) : boolean {
        if ( !this.canMoveGeneral(newPosition, board) ) return false;

        return this.isBigColMove(newPosition) || this.isShortColMove(newPosition);
    }

    show() : string {
        return this.color === 'white' ? '♘' : '♞';
    }

    private isBigColMove( newPosition : { row: number, col: number } ) : boolean {
        return (newPosition.col === this.position.col + 2 
            || newPosition.col === this.position.col - 2) 
            && (newPosition.row === this.position.row + 1
            || newPosition.row === this.position.row - 1);
    }

    private isShortColMove( newPosition : { row: number, col: number } ) : boolean {
        return (newPosition.col === this.position.col + 1 
            || newPosition.col === this.position.col - 1) 
            && (newPosition.row === this.position.row + 2
            || newPosition.row === this.position.row - 2);
    }
}