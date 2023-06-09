fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const dias = data.map((item) => item.day);
    
    // Carregar dados do Armazenamento Local ou usar valores padrão
    let valores = JSON.parse(localStorage.getItem('valores')) || [
      { "day": "Segunda-feira", "amount": 0 },
      { "day": "Terça-feira", "amount": 0 },
      { "day": "Quarta-feira", "amount": 0 },
      { "day": "Quinta-feira", "amount": 0 },
      { "day": "Sexta-feira", "amount": 0 },
      { "day": "Sábado", "amount": 0 },
      { "day": "Domingo", "amount": 0 }
    ];

    const ctx = document.getElementById("grafico");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dias,

        datasets: [
          {
            label: "My balance",
            backgroundColor: "hsl(10, 79%, 65%, 0.5)",
            hoverBackgroundColor: "hsl(209, 68%, 66%, 0.3)",
            data: valores.map(item => item.amount),
            borderWidth: 1,
          },
        ],
      },
    });
    const atualizarBtn = document.getElementById('atualizar');
    atualizarBtn.addEventListener('click', () => {
      const valorInput = document.getElementById('valor').value;
      const diaSelect = document.getElementById('dia').value;

      // Encontrar o índice do dia da semana selecionado
      const diaIndex = valores.findIndex(item => item.day === diaSelect);

      if(diaIndex !== -1) {
        //Atualizar o valor no array de valores
        valores[diaIndex].amount = parseFloat(valorInput);

        // Salvar os dados no Armazenamento Local
        localStorage.setItem('valores', JSON.stringify(valores));

        //Atualizza o gráfico
        chart.data.datasets[0].data = valores.map(item => item.amount);
        chart.update();
        
      }
    });
  })
  .catch((erro) => {
    console.error("Erro ao carregar o arquivo json:", erro);
  });
