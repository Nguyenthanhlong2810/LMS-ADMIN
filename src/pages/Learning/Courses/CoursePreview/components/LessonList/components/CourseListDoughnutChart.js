export const data = {
  datasets: [
    {
      data: [50, 50],
      backgroundColor: ['#55C763', '#EDEDED'],
      borderWidth: 0
    }
  ]
};
export const options = {
  responsive: true,
  cutout: '75%',
  tooltip: false
};

export const getPlugins = (textInput) => {
  let plugin = [
    {
      beforeDraw: function (chart) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        ctx.font = '700 0.75rem';
        ctx.fillStyle = '#201B40';
        ctx.fontStretch = 'bold';
        ctx.textBaseline = 'top';
        let text = textInput,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }
  ];
  return plugin;
};
