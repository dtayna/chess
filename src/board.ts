import { Piece } from "./pieces/piece";

export class Board {
    grid : (Piece | null)[][] = [];
    constructor() {
        this.grid = Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => null));
    }

    showBoard() : void {
        let board = '';
        for ( let i = 0; i < 8; i++) {
            let row = '';
            for ( let j = 0; j < 8; j++) {
                if ( this.grid[i]![j] == null) {
                    row += '[ ]'
                } else {
                    row += `[${this.grid[i]![j]!.show()}]`
                }
            }
            board += row + '\n';
        }
        console.log(board);
    }
}