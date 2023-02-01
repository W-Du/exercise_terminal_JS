const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(arr){
        this.arr = arr;
        this.curX = 0;
        this.curY = 0;
    }
    
    print() {
        let map = '';
        for(let i = 0; i < this.arr.length; i++) {
            map += this.arr[i].join(' ') + '\n\n';
        }
        console.log(map);
    } 
    
    checkPosition() {
        let position = this.arr[this.curY][this.curX];
        if( position === 'O') {
            return 'fail';
        } else if (position === '^') {
            return 'win';
        } else {
            return 'continue';
        }
    }
    
    updatePosition(input) {
        let move = input.toLowerCase();
        switch(move){
            case 'd':
            this.curY += 1;
            break;
            case 'r':
            this.curX += 1;
            break;
            case 'l':
            this.curX -= 1;
            break;
            case 'u':
            this.curY -= 1;
            break;
            default:
            return false;
            break;
        }
    }
    
    updateMap() {
        //find old position * 
        let positionY = 0;
        while(!this.arr[positionY].includes("*")){
            positionY ++;
        }
        let positionX = this.arr[positionY].indexOf("*");
        
        this.arr[positionY][positionX] = '░';
        this.arr[this.curY][this.curX] = "*";
    }
    
    
    static generateField(height, width, percentage) {
        let mapArray = [];

        //all path
        for(let i = 0; i < height; i++) {
            let line = [];
            for(let j = 0; j < width; j++) {
                line.push(fieldCharacter);
            }
            mapArray.push(line);
        }
        
        //put holes
        let countHole = Math.floor(percentage * height * width);
        let x;
        let y;
        for (countHole; countHole > 0; countHole--) {
            do{
                x = Math.floor(Math.random() * width);
                y = Math.floor(Math.random() * height);
            } while (mapArray[y][x] === 'O')
            mapArray[y][x] = hole;
        }

        //put hat
        do{
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
        } while (x === 0 && y ===0)
        mapArray[y][x] = hat;

        //current position
        mapArray[0][0] = pathCharacter;
        return mapArray;
    }
}

const map = Field.generateField(10, 10, 0.15);
const myField = new Field(map);

playGame(myField);


// funcitons
function playGame(field) {
    let result;
    
    //loop through the game
    do {
        field.updateMap();
        field.print();

        //get input
        let move = getUserInput();

        //check 
        field.updatePosition(move);
        result = field.checkPosition();
    } while (result === 'continue')

    //display result
    if(field.checkPosition() === 'win') {
        console.log('You won!') 
    } else if (field.checkPosition() === 'fail') {
        console.log('fell into a pit')
    } else {
        console.log('something weird happened')
    }
}

function getUserInput() {
    let move = prompt('Make your next move: d = down; u = up; l = left; r = right: ');
    
    while(move !== 'd' && move !== 'u' && move !== 'r' && move !== 'l') {
        move = prompt('try again | d = down; u = up; l = left; r = right: ');
    }
    return move;
}












