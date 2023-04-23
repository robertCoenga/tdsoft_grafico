import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const agrupamentoDados = (dados,agrupamento) => {
  let agroupData =[];

  const result = dados.reduce((acc,dado)=>{
    if(agrupamento=="dia")
    {
      agroupData = dado.starred_at.toLocaleDateString();
    }else if(agrupamento=="semana")
    {
      const ano = dado.starred_at.getFullYear();
      const dia = dado.starred_at.getDate();
      const mes = dado.starred_at.getMonth();
      agroupData = new Date(ano, mes, dia);
      const diaSemana = agroupData.getDay();
      const primeiroDiaSemana = agroupData.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
      const dataInicioSemana = new Date(data.setDate(primeiroDiaSemana));
      const dataFimSemana = new Date(dataInicioSemana);
      dataFimSemana.setDate(dataFimSemana.getDate() + 6);
      agroupData = `${dataInicioSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}-${dataFimSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
   
    }else if(agrupamento=="mês")
    {
      agroupData = dado.starred_at.toLocaleDateString('pt-Br', {month: 'numeric', year: 'numeric'});
    }else if(agrupamento=="ano")
    {
      agroupData = dado.starred_at.toLocaleDateString('pt-Br', { year: 'numeric'});
    }


     if (acc[agroupData]) {
      acc[agroupData] += 1;
    } else {
      acc[agroupData] = 1;
    }
    return acc;
  }, {});

  agroupData = Object.keys(result).map((key) => ({
    x: key,
    y: result[key]
  }));

  return [
    {
      id: 'Quantidade de estrelas',
      data
    }
  ];

}

export function GraficoEstrelas(props) {
  const label =["Segunda","Terça","Quarta"];
  const data={
    labels:label,
    datasets: [{
        label: 'Dataset 1',
        data: [1, 5 , 7 , 8 , 11],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'}]
  }
  return <div><Line options={options} data={data}/></div>

}



// Definição dos tipos das propriedades recebidas.
GraficoEstrelas.propTypes = {
  estrelas: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      starred_at: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  agrupamento: PropTypes.oneOf(['dia', 'semana', 'mes', 'ano']),
  escala: PropTypes.oneOf(['linear', 'log']),
};

// Definição dos valores padrão das propriedades.
GraficoEstrelas.defaultProps = {
  agrupamento: 'dia',
  escala: 'linear',
};
