const pointsMap = {
  VF: { title: 'Vote For', pointValue: 2 },
  VA: { title: 'Vote Against', pointValue: 0 },
  CW: { title: 'Challenge Won', pointValue: 10 },
  IW: { title: 'Immunity Won', pointValue: 15 },
  IF: { title: 'Idol Found', pointValue: 20 },
  EL: { title: 'Eliminated', pointValue: -10 },
  TC: { title: 'Tribal Council', pointValue: 5 },
  FM: { title: 'Fire Maker', pointValue: 20 },
  Thrd: { title: 'Third', pointValue: 25 },
  Scnd: { title: 'Second', pointValue: 35 },
  Frst: { title: 'First', pointValue: 50 },
};

export const getTranslatedPoints = (scoring) => {
  return scoring.map((sc) => pointsMap[sc.scoringEvent]);
};
