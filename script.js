//Aqui o código está realizando uma requisição HTTP para o arquivo "data.json" e, em seguida, processando a resposta em formato JSON.
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const dias = data.map((item) => item.day);

    // Carregar dados do Armazenamento Local ou usa valores padrão
    let valores = JSON.parse(localStorage.getItem("valores")) || [
      { day: "Segunda-feira", amount: 0 },
      { day: "Terça-feira", amount: 0 },
      { day: "Quarta-feira", amount: 0 },
      { day: "Quinta-feira", amount: 0 },
      { day: "Sexta-feira", amount: 0 },
      { day: "Sábado", amount: 0 },
      { day: "Domingo", amount: 0 },
    ];

    const ctx = document.getElementById("grafico");

    //Aqui temos a estrutura do objeto passado para a configuração do gráfico
    const chart = new Chart(ctx, {
      
      data: {
        datasets: [{
            type: "bar",
            label: "Gráfico Barra",
            labels: dias,
            backgroundColor: "hsl(10, 79%, 65%)",
            hoverBackgroundColor: "hsl(209, 68%, 66%, 0.5)",
            data: valores.map((item) => item.amount),
            borderWidth: 1,
          },{type: 'line',
            label: 'Gráfico Linha',
            backgroundColor: "hsl(209, 68%, 66%)",
            hoverBackgroundColor: "hsl(10, 79%, 65%, 0.5)",
            data: valores.map((item) => item.amount),
            borderWidth: 4,
          }],
        labels: dias
      },
    });

    const form = document.getElementById("form");
    const valorInput = document.getElementById("valor");
    const diaSelect = document.getElementById("dia");
    const atualizarBtn = document.getElementById("atualizar");

    atualizarBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const valor = parseFloat(valorInput.value);
      const dia = diaSelect.value;

      // Encontrar o índice do dia da semana selecionado
      const diaIndex = valores.findIndex((item) => item.day === dia);

      if (diaIndex !== -1) {
        // Atualizar o valor no array de valores
        valores[diaIndex].amount = valor;

        // Salvar os dados no Armazenamento Local
        localStorage.setItem("valores", JSON.stringify(valores));

        // Atualizar o gráfico com os novos dados do gráfico de barra
        chart.data.datasets[0].data = valores.map((item) => item.amount);
        // Atualizar o gráfico com os novos dados do gráfico de linha
        chart.data.datasets[1].data = valores.map((item) => item.amount);
        
        // Atualizar os gráficos
        chart.update(); 
        
        // Resetar os campos de inputs
        form.reset();
      }
    });
  });