fetch('data.json')
  .then(response => response.json())
  .then(data => {

    const dias = data.map(item => item.day);
    const valores = data.map(item => item.amount);

    const ctx = document.getElementById('grafico');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dias,
        
        datasets: [{
          label: 'My balance',
          backgroundColor: 'hsl(10, 79%, 65%, 0.5)',
          data: valores,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': R$' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callbacks: function(value, index, values) {
                return 'R$' + value.toFixed(2);
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          afterDraw: function(chart) {
            const total = valores.reduce((acc, curr) => acc + curr,0);
            const totalElement = document.getElementById('totalDespesas');
            totalElement.innerText = 'Total: R$' + total.toFixed(2);
            
          }
        }
      }
    });
  })
.catch(error => {
  console.error('Erro ao carregar o arquivo json:', error);
});






