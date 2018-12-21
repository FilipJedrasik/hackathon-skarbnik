export default {
  type: 'line',
  data: {
    labels: ['Wrzesień 2018', 'Październik 2018', 'Listopad 2018', 'Grudzień 2018', 'Styczeń 2019'],
    datasets: [
      { // one line graph
        label: 'Wpłacona kwota',
        data: [120, 342, 1411, 1424, 1600],
        backgroundColor: [
          'rgba(44,73,255,.5)'
        ],
        borderColor: [
          'rgba(120,120,255,.9)'
        ],
        borderWidth: 3
      },
      { // another line graph
        label: 'Cel',
        data: [1000, 1240, 1411, 1724, 2500],
        backgroundColor: [
          'rgba(71, 183,132,.5)', // Green
        ],
        borderColor: [
          '#47b784'
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 25,
        }
      }]
    }
  }
};