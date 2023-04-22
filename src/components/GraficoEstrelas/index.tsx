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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export function GraficoEstrelas(props) {
  const label =["Segunda","Terça","Quarta"];
  const data={
    labels:label,
    datasets: [{
        label: 'Dataset 1',
        data: props.estrelas.starred_at,
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
