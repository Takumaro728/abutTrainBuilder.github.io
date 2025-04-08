const orderedNames = [
  "糀谷",
  "京急蒲田",
  "海森丘",
  "網代",
  "叢森西口",
  "緑木川",
  "TwinTowersHill",
  "五位鷺町",
  "潮入",
  "阪急淡路",
  "水瀬市",
  "東橙の浦",
  "宮木ヶ丘",
  "羽沢横浜",
  "東阿波口",
  "研究センター"
];

window.onload = function () {
  fetch('data/stations.json')
    .then(response => response.json())
    .then(data => {
      const sorted = orderedNames.map(name => data.find(st => st.name === name));
      createStationButtons(sorted);
    })
    .catch(error => console.error('JSON読み込みエラー:', error));
};

function drawCircleLine(radius, centerX, centerY) {
  const canvas = document.getElementById('circle-line');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#27ae60';
  ctx.lineWidth = 10;
  ctx.stroke();
}

function createStationButtons(stations) {
  const stationList = document.getElementById('station-list');
  const centerX = 350, centerY = 350, radius = 250;
  drawCircleLine(radius, centerX, centerY);

  stations.forEach((station, i) => {
    const angle = (2 * Math.PI * i) / stations.length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const button = document.createElement('button');
    button.textContent = station.name;
    button.classList.add('station-button');
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.onclick = () => showModal(station);
    stationList.appendChild(button);
  });
}

function showModal(station) {
  document.getElementById('station-name').textContent = station.name;
  document.getElementById('station-image').src = `images/${station.image}`;
  document.getElementById('station-info').textContent = station.description;
  document.getElementById('station-transfer').textContent = station.transfer || "情報なし";
  document.getElementById('station-reference').textContent = station.reference || "情報なし";
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
