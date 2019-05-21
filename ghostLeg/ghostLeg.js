/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const line = [];
for (let i = 0; i < H; i++) {
    line[i] = readline();
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

// console.log('answer');
for (let i = 0; i < W; i++) {
    if(line[0][i] ===' ') {
        continue;    
    } else {
        let x = i, y = 1;
        if(y === (H - 1)) {
            console.error('Debug messages...');
            console.log(line[0][i],line[y][x])
        } else {
            if(!haveLeg(x, y)) {
                y++;    
            } else if(haveLeftLeg(x, y)) {
                x-=2;
                y++;
            } else {
                x+=2;
                y++;
            }
        }
    }
}

function haveLeg(x, y) {
    if(x===0) {
        return line[y][x+1] === '-';   
    } else if(x=== (W-1)) {
        return line[y][x-1] === '-';   
    } else {
        return line[y][x-1] === '-' || line[y][x+1] === '-';
    }
}

function haveLeftLeg(x, y) {
    if(x===0){
        return line[y][x+1] === '-';
    } else {
        return line[y][x-1] === '-';
    }
}