function GameTable() {
    this.lastSign = 'o'
    this.table = this.createTable(3,3);
    document.body.appendChild(this.table);
}
GameTable.prototype.results = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b2', 'c3'],
    ['c1', 'b2', 'a3'],
];

GameTable.prototype.createTd = function(id, className) {
    const td = document.createElement('td');
    td.id = id;
    td.addEventListener('click', this.tdClickHandler.bind(this));
    td.className = className;
    return td;
};
GameTable.prototype.createTr = function (index, count) {
  const tr = document.createElement('tr');
  for(let i = 1; i <= count; i++) {
      const id = String.fromCharCode(97 + index) +i;
      const td = this.createTd(id, 'cell');
      tr.appendChild(td);
  }
  return tr;
};
GameTable.prototype.createTable = function (rows, cols) {
    const table = document.createElement('table');
    for (let i = 0; i< rows; i++) {
        const tr = this.createTr(i, cols);
        table.appendChild(tr);
    }
    return table;
};
GameTable.prototype.tdClickHandler = function(event) {
    const target = event.target;
    if(target.dataset.sign) {
        return;
    }
    if(this.lastSign === 'x') {
        target.dataset.sign = 'o';
        target.innerHTML = '&cir;';
    } else {
        target.dataset.sign = 'x';
        event.target.innerHTML = '&times;'
    }  
    this.lastSign =target.dataset.sign;
    this.detect();  
};
GameTable.prototype.detect = function() {
    let win 
    const lnt = this.results.length;
    for(let row = 0; row < lnt; row++) {
        const resultsRow = this.results[row]
            .map(function(id) {
                return document.querySelector('#' + id).dataset.sign;
            })
            .filter(function(res) {
                return res !== undefined;
            });
        const result = resultsRow.length === 0 ? '' : resultsRow.reduce(function(a, b) {return a +b});

        if(result === "xxx" || result === 'ooo'); {
            win = result;
            break;
        }
    }
}
const gameTable = new GameTable();