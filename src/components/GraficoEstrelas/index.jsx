import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



const agrupamentoDados = (dados, agrupamento) => {
  let data = [];
  const estrelas = dados.reduce((acc, dado) => {
    if (agrupamento === 'dia') {
      data = dado.starred_at.toLocaleDateString();
    } else if (agrupamento === 'mes') {
      data = dado.starred_at.toLocaleDateString('pt-BR', { month: 'numeric', year: 'numeric' });
    } else if (agrupamento === 'ano') {
      data = dado.starred_at.toLocaleDateString('pt-BR', { year: 'numeric' });
    }
    // agrupar por ano-semana
    else if (agrupamento === 'semana') {
      const ano = dado.starred_at.getFullYear();
      const dia = dado.starred_at.getDate();
      const mes = dado.starred_at.getMonth();
      data = new Date(ano, mes, dia);
      const diaSemana = data.getDay();
      const primeiroDiaSemana = data.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
      const dataInicioSemana = new Date(data.setDate(primeiroDiaSemana));
      const dataFimSemana = new Date(dataInicioSemana);
      dataFimSemana.setDate(dataFimSemana.getDate() + 6);
      data = `${dataInicioSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}-${dataFimSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
    }

    if (acc[data]) {
      acc[data] += 1;
    } else {
      acc[data] = 1;
    }
    return acc;
  }, {});

  data = Object.keys(estrelas).map((key) => ({
    x: key,
    y: estrelas[key]
  }));

  return [
    {
      data
    }
  ];
}

export function GraficoEstrelas(props) {
  let dadosAgrupados = agrupamentoDados(props.estrelas, props.agrupamento);

  return  <LineChart width={1600} height={600} data={dadosAgrupados[0].data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  <Line type="monotone" dataKey="y" stroke="#8884d8" />
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  <XAxis dataKey="x" />
  <YAxis />
  <Tooltip />
</LineChart>

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
