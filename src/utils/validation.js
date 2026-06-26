export function validateGradeForm({ name, score, maxScore, weight, scale }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'El nombre es requerido';
  if (score === '' || score === null || isNaN(Number(score))) {
    errors.score = 'Ingrese un puntaje válido';
  } else {
    const s = Number(score);
    if (s < 0) errors.score = 'El puntaje no puede ser negativo';
    if (s > Number(maxScore)) errors.score = `El puntaje no puede exceder ${maxScore}`;
  }
  if (!maxScore || isNaN(Number(maxScore)) || Number(maxScore) <= 0) {
    errors.maxScore = 'Ingrese un puntaje máximo válido';
  }
  if (weight === '' || weight === null || isNaN(Number(weight))) {
    errors.weight = 'Ingrese una ponderación válida';
  } else {
    const w = Number(weight);
    if (w < 0) errors.weight = 'La ponderación no puede ser negativa';
    if (w > 100) errors.weight = 'La ponderación no puede exceder 100%';
  }
  return errors;
}

export function validateSubjectForm({ name }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'El nombre de la asignatura es requerido';
  return errors;
}

export function validateScaleForm(scale) {
  const errors = {};
  if (!scale.name || !scale.name.trim()) errors.name = 'El nombre es requerido';
  if (scale.maxScore <= 0) errors.maxScore = 'Debe ser mayor a 0';
  if (scale.passingPercentage <= 0 || scale.passingPercentage > 100) errors.passingPercentage = 'Debe estar entre 1 y 100';
  if (scale.minGrade >= scale.maxGrade) errors.maxGrade = 'Debe ser mayor que la nota mínima';
  if (scale.passingGrade < scale.minGrade || scale.passingGrade > scale.maxGrade) errors.passingGrade = 'Debe estar entre mín y máx';
  if (scale.increment <= 0) errors.increment = 'Debe ser mayor a 0';
  return errors;
}
