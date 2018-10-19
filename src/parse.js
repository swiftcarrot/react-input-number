module.exports = (value, step, max, min) => {
  if (value === '') return '';
  if (value) {
    value = parseFloat(value);
    if (isNaN(value)) return '';
  }

  if (typeof max === 'number' && value > max) return max;
  if (typeof min === 'number' && value < min) return min;

  if (step) {
    const p = (step.toString().split('.')[1] || []).length;
    if (p) return parseFloat(value.toFixed(p));
  }

  return value;
};