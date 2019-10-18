module.exports = function solveSudoku(matrix) {
  debugger
  function copyMatrix(matrix) {
    return matrix.map((row) => row.map((item) => item));
  }

  function getCandidates(matrix, row, column) {
    debugger

    let rule = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //проверка ряда
    for (let checkColumn = 0; checkColumn < 9; checkColumn++) {
      if (checkColumn === column) { continue };

      let cell = matrix[row][checkColumn];
      let index = rule.indexOf(cell);
      if (index !== -1) {
        rule.splice(index, 1);
      }
    }
    debugger
    //проверка колонки
    for (let checkRow = 0; checkRow < 9; checkRow++) {
      if (checkRow === row) { continue };

      let cell = matrix[checkRow][column];
      let index = rule.indexOf(cell);
      if (index !== -1) {
        rule.splice(index, 1);
      }
    }
    debugger
    //проверка блока
    let rowStart;

    if (row < 9) {
      rowStart = 6;
      if (row < 6) {
        rowStart = 3;
        if (row < 3) {
          rowStart = 0;
        }
      }
    }

    let rowEnd = rowStart + 3;

    let columnStart;

    if (column < 9) {
      columnStart = 6;
      if (column < 6) {
        columnStart = 3;
        if (column < 3) {
          columnStart = 0;
        }
      }
    }

    let columnEnd = columnStart + 3;
    debugger
    for (let checkRow = rowStart; checkRow < rowEnd; checkRow++) {
      for (let checkColumn = columnStart; checkColumn < columnEnd; checkColumn++) {
        if (checkRow === row && checkColumn === column) { continue };

        let cell = matrix[checkRow][checkColumn];
        let index = rule.indexOf(cell);
        if (index !== -1) {
          rule.splice(index, 1);
        }
      }
    }
    debugger
    return rule;
  }

  function fillMatrix(sud) {
    debugger
    const matrix = copyMatrix(sud);
    let firstEmpty;

    //перебор рядов
    for (let row = 0; row < 9; row++) {
      //перебор колонок
      for (let column = 0; column < 9; column++) {
        const cell = matrix[row][column];
        if (cell === 0 || Array.isArray(cell)) {
          debugger
          //получение возможных вариантов для ячейки
          let candiadte = getCandidates(matrix, row, column);

          //подстановка однозначного результата
          if (candiadte.length === 1) {
            matrix[row][column] = candiadte[0];
            return fillMatrix(matrix)
          }

          //возврат ошибки при пустом кандидате
          if (candiadte.length === 0) { return false }

          //записть первой пустого кандидата
          if (!firstEmpty) { firstEmpty = [candiadte, row, column] }
        }
      }
    }

    //перебор возможных вариантов первого пустого кандидата        
    if (firstEmpty) {
      let candiadte = firstEmpty[0];
      let row = firstEmpty[1];
      let column = firstEmpty[2];
      for (let candidateIndex = 0, len = candiadte.length; candidateIndex < len; candidateIndex++) {
        let item = candiadte[candidateIndex];
        matrix[row][column] = item;

        let result = fillMatrix(matrix);
        if (result) { return result }
      }
      return false
    }

    return matrix;
  }


  return fillMatrix(matrix);
}
