const formatValue = (value) => {
  if (!value) return 0;
  if (Number(value) >= 1000 && Number(value) < 1000000)
    return (Number(value) / 1000) % 1 === 0
      ? `${(Number(value) / 1000)}K`
      : `${(Number(value) / 1000).toFixed(1)}K`;
  if (Number(value) >= 1000000)
    return (Number(value) / 1000000) % 1 === 0
      ? `${(Number(value) / 1000000)}M`
      : `${(Number(value) / 1000000).toFixed(1)}M`;
  return value;
};

export default formatValue