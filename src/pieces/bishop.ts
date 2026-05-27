import { Piece } from './piece';
import { Board } from '../board';

export class Bishop extends Piece {

    constructor( color : string, position : { row: number, col: number} ){
        super( color, position );
    }

    canMove( newPosition : { row: number, col: number } , board : Board ) : boolean {
        if ( !this.canMoveGeneral(newPosition, board) ) return false;

        if (this.isDiagonalMove(newPosition)) {

            let row = newPosition.row > this.position.row 
                ? this.position.row + 1
                : this.position.row - 1;
            let col = newPosition.row > this.position.col
                ? this.position.col + 1
                : this.position.col - 1;

            while( newPosition.row !== row && newPosition.col !== col ) {
                if( board.grid[row]?.[col] !== null ) {
                    return false;
                }
                row += newPosition.row > row ? 1 : -1;
                col += newPosition.col > col ? 1 : -1;
            }
            return true;
        }
        return false;
    }

    show() : string {
        return this.color === 'white' ? '♗' : '♝';
    }

    private isDiagonalMove( newPosition : { row: number, col: number } ) {
        return Math.abs(newPosition.row - this.position.row) 
            === Math.abs(newPosition.col - this.position.col);
    }

}
