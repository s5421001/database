// public/app.js

document.addEventListener('DOMContentLoaded', () => {
  loadChampions();
});

function loadChampions() {
  fetch('/champions')
    .then(response => response.json())
    .then(champions => {
      const championTable = document.getElementById('championTable');
      championTable.innerHTML = '';

      // 表のヘッダーを作成
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>ID</th>
        <th>Me</th>
        <th>Enemy</th>
        <th>Com</th>
        <th>Push</th>
        <th>Wave</th>
      `;
      championTable.appendChild(headerRow);

      // チャンピオンデータを表に追加
      champions.forEach(champion => {
        const championRow = document.createElement('tr');
        championRow.innerHTML = `
          <td>${champion.id}</td>
          <td>${champion.Me}</td>
          <td>${champion.Enemy}</td>
          <td>${champion.Com}</td>
          <td>${champion.Push === '〇' ? '〇' : '×'}</td>
          <td>${champion.Wave === '〇' ? '〇' : '×'}</td>
        `;
        championTable.appendChild(championRow);
      });
    })
    .catch(error => console.error('Error loading champions:', error));
}

function addChampion() {
  const championForm = document.getElementById('championForm');
  const formData = new FormData(championForm);

  fetch('/add-champion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Champion added successfully with ID:', data.id);
    loadChampions(); // データ追加後に一覧を再読込
  })
  .catch(error => console.error('Error adding champion:', error));
}
function searchChampion() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  fetch('/champions')
    .then(response => response.json())
    .then(champions => {
      const filteredChampions = champions.filter(champion => {
        return champion.Enemy.toLowerCase().includes(searchInput);
      });
      displayChampions(filteredChampions);
    })
    .catch(error => console.error('Error searching champions:', error));
}

function displayChampions(champions) {
  const championTable = document.getElementById('championTable');
  championTable.innerHTML = '';

  // 表のヘッダーを作成
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>ID</th>
    <th>Me</th>
    <th>Enemy</th>
    <th>Com</th>
    <th>Push</th>
    <th>Wave</th>
  `;
  championTable.appendChild(headerRow);

  // チャンピオンデータを表に追加
  champions.forEach(champion => {
    const championRow = document.createElement('tr');
    championRow.innerHTML = `
      <td>${champion.id}</td>
      <td>${champion.Me}</td>
      <td>${champion.Enemy}</td>
      <td>${champion.Com}</td>
      <td>${champion.Push === '〇' ? '〇' : '×'}</td>
      <td>${champion.Wave === '〇' ? '〇' : '×'}</td>
    `;
    championTable.appendChild(championRow);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadChampions();
  setupAutoKanaConversion();
});

// カタカナ変換のための関数
function convertToKatakana(input) {
  return input.replace(/[\u3041-\u3096]/g, match => String.fromCharCode(match.charCodeAt(0) + 0x60));
}

// 自動カタカナ変換のセットアップ
function setupAutoKanaConversion() {
  const meInput = document.getElementById('Me');
  const enemyInput = document.getElementById('Enemy');
  

  meInput.addEventListener('input', () => {
    meInput.value = convertToKatakana(meInput.value);
  });

  enemyInput.addEventListener('input', () => {
    enemyInput.value = convertToKatakana(enemyInput.value);
  });

}