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

export const getTranslatedPoints = (scoring, week) => {
  if (week === null) {
    return scoring.map((sc) => pointsMap[sc.scoringEvent]);
  }

  return scoring.filter((sc) => {
    return sc.week === week;
  });
};

export const getMyTeamStats = (scoring) => {
  const res = {
    totalPoints: 0,
    pointsBreakdown: {
      PTS: { count: 0 },
      VF: { count: 0 },
      VA: { count: 0 },
      CW: { count: 0 },
      IW: { count: 0 },
      IF: { count: 0 },
      EL: { count: 0 },
      TC: { count: 0 },
    },
  };
  res.pointsBreakdown.PTS.count = scoring
    .map((sc) =>
      sc.castaways
        .map((cst) =>
          cst.scoringEventIds
            .filter((wsc) => wsc.week === sc.week)
            .reduce((pts, wkpts) => {
              res.pointsBreakdown[wkpts.scoringEvent].count += 1;
              return (pts += pointsMap[wkpts.scoringEvent].pointValue);
            }, 0)
        )
        .reduce((p, c) => (p += c), 0)
    )
    .reduce((p, c) => (p += c), 0);

  return Object.keys(res.pointsBreakdown).map((key) => [
    key,
    res.pointsBreakdown[key],
  ]);
};
