let rooms = `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~,--------,~~~~~~~~~~~~~~~~~~
~~~| K      '--------------,~~~
~~~|               (       |~~~
~~~|        ,------,       |~~~
~~~|    O   |~~~~~~|       |~~~
~~~|        |~~~~~~|       |~~~
~~~'--------'~~~~~~'-------'~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;
const rooms_array = rooms.split("\n");
for (let row in rooms_array) {
    rooms_array[row] = rooms_array[row].split('');
}
const orig_rooms = rooms_array;
const rownum = rooms_array.length;
const colnum = rooms_array[0].length;
const place = [0,0];
const items = {};

const text = document.getElementById('text');

// mechanic variables
var unlock = false;

for (let row = 0; row < rownum; row++) {
    for (let col = 0; col < colnum; col++) {
        if (rooms_array[row][col] == 'O') {
            place[0] = col;
            place[1] = row;
        }
    }
}

function replace(tile,x,y) {
    if (rooms_array[place[1]+y][place[0]+x] == tile) {
        rooms_array[place[1]][place[0]] = ' ';
        if (rooms_array[place[1]] != rooms_array[place[1]+y]) {
            document.getElementById(place[1]).innerHTML = rooms_array[place[1]].join('');
        }
        rooms_array[place[1]+=y][place[0]+=x] = 'O';
        document.getElementById(place[1]).innerHTML = rooms_array[place[1]].join('');
    }
}

function newline(line, prnt_id, when) {
    var newText = document.createElement("p");
    var textNode = document.createTextNode(line);
    let parent = document.getElementById(prnt_id);
    newText.appendChild(textNode);
    if (when == 'after') {
        parent.appendChild(newText, parent);
    } else if (when == 'before') {
        parent.insertBefore(newText, parent.firstChild);
    }
}

function editline(original, prnt_id, changed) {
    let parent = document.getElementById(prnt_id)
    for (let i = 0; i<parent.childElementCount; i++) {
        if (parent.children[i].innerHTML == original) {
            parent.children[i].innerHTML = changed;
        }
    }
}

function alert(x,y,msg) {
    let final_msg = '['+(place[0]+x)+','+(place[1]+y)+'] '+msg;
    if (text.firstChild.innerHTML != final_msg) {
        newline(final_msg, 'text', 'before');
    }
}

function tile_test(tile,x,y) {
    if (rooms_array[place[1]+y][place[0]+x] == tile) {
        return true;
    } else {
        return false;
    }
}

function add(item) {
    if (typeof(items[item]) === 'number') {
        items[item] += 1;
        editline(item+': '+(items[item]-1), 'inventory', item+': '+items[item])
    } else {
        items[item] = 1;
        newline(item+': '+items[item], 'inventory', 'after');
    }
}

function sub(item) {
    if (typeof(items[item]) === 'number') {
        items[item] -= 1;
        editline(item+': '+(items[item]+1), 'inventory', item+': '+items[item])
    } else {
        console.log('Item type is not number');
    }
}

function get(item) {
    if (typeof(items[item]) != 'number') {
        items[item] = 1;
        newline(item+': '+items[item], 'inventory', 'after');
    }
}

//main events function
function next(x,y) {
    replace(' ',x,y);
    if (tile_test('K',x,y)) {
        if (items['key'] != 1) {
            console.log(items['key'])
            alert(x,y,"You found a key!");
            get('key');
        } else {
            alert(x,y,"You already have this key!")
        }
    } else if (tile_test('(',x,y)) {
        if (unlock) {
            replace('(',x,y)
        } else {
            alert(x,y,"A door blocks your path, it's locked.");
            if (items['key'] >= 1) {
                alert(x,y,"You unlock the door with the key!");
                unlock = true;
            }
        }
    }
    document.getElementById('place').innerHTML = place;
}

for (let row in rooms_array) {
    for (let col = 0; col < colnum; col++) {
        document.getElementById(row).innerHTML += rooms_array[row][col];
    }
    document.getElementById(row).innerHTML += "<br>";
}
document.getElementById('place').innerHTML = place;

document.onkeydown = function arrows(e) {
    switch (e.key) {
        case 'ArrowLeft':
            next(-1,0);
            break;
        case 'ArrowUp':
            next(0,-1);
            break;
        case "ArrowRight":
            next(1,0);
            break;
        case "ArrowDown":
            next(0,1);
            break;
        default:
            str = e.key;
    }
}