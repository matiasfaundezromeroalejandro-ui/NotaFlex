export function calculateGrade(score, maxScore, scale) {
  if (!scale || maxScore <= 0 || score === undefined || score === null) return null;

  const threshold = maxScore * (scale.passingPercentage / 100);

  let grade;
  if (score >= threshold) {
    grade =
      scale.passingGrade +
      ((score - threshold) / (maxScore - threshold)) *
        (scale.maxGrade - scale.passingGrade);
  } else {
    grade =
      (score / threshold) *
        (scale.passingGrade - scale.minGrade) +
      scale.minGrade;
  }

  const rounded = Math.round(grade / scale.increment) * scale.increment;
  return Math.min(Math.max(rounded, scale.minGrade), scale.maxGrade);
}

export function calculateSubjectAverage(subject, scale) {
  const grades = subject.grades || [];
  if (grades.length === 0) return null;

  const totalWeight = grades.reduce((sum, g) => sum + (g.weight || 0), 0);
  if (totalWeight === 0) return null;

  const weightedSum = grades.reduce((sum, g) => {
    return sum + ((g.calculatedGrade || 0) * (g.weight || 0));
  }, 0);

  return weightedSum / totalWeight;
}

export function calculateOverallAverage(subjects, scale) {
  const averages = subjects
    .map((s) => calculateSubjectAverage(s, scale))
    .filter((a) => a !== null);

  if (averages.length === 0) return null;
  return averages.reduce((sum, a) => sum + a, 0) / averages.length;
}
