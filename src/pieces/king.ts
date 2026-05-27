import { Piece } from './piece';
import { Board } from '../board';

export class King extends Piece {
    constructor( color : string, position : { row: number, col: number} ){
        super( color, position );
    }

    canMove( newPosition : { row: number, col: number } , board : Board ) : boolean {
        if (!board) return false;
        if (board.grid[newPosition.row]?.[newPosition.col]?.color === this.color) return false;

        const rowDiff = Math.abs(newPosition.row - this.position.row);
        const colDiff = Math.abs(newPosition.col - this.position.col);

        return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);

    }
    
    show() : string {   
        return this.color === 'white' ? '♔' : '♚';
    }
}