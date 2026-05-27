import { Piece } from "./piece";
import { Board } from "../board";

export class Rook extends Piece {

    constructor( color : string, position : { row: number, col: number} ){
        super( color, position );
    }

    canMove( newPosition : { row: number, col: number } , board : Board ) : boolean {
        if ( !board ) return false;
        if ( board.grid[newPosition.row]?.[newPosition.col]?.color === this.color ) return false;

        if ( this.isVerticalMove(newPosition) ) {
            const step = newPosition.row > this.position.row ? 1 : -1;
            for ( let i = this.position.row + step; i !== newPosition.row; i += step) {
                if ( board.grid[i]?.[newPosition.col] !== null ) {
                    return false;
                }
            } 
            return true;
        } else if ( this.isHorizontalMove(newPosition) ) {
            const step = newPosition.col > this.position.col ? 1 : -1;
            for ( let j = this.position.col + step; j !== newPosition.col; j += step) {
                if ( board.grid[newPosition.row]?.[j] !== null ) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    show() : string {
        return this.color === 'white' ? '♖' : '♜';
    }

    private isVerticalMove( newPosition : { row: number, col: number } ) {
        return ( newPosition.col === this.position.col 
            && newPosition.row !== this.position.row);
    }

    private isHorizontalMove( newPosition : { row: number, col: number } ) {
        return ( newPosition.col !== this.position.col 
            && newPosition.row === this.position.row);
    }

}
