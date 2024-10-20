export const getCastawayTotalPoints = (castaway, week = null) => {
  console.log({
    week,
    castaway: castaway.name,
    scoringRecords: castaway.scoringEventIds.filter((sc) =>
      week ? sc.week === week : true
    ),
  });
  return castaway.scoringEventIds
    .filter((sc) => {
      if (week == null) {
        return true;
      }
      return sc.week === week;
    })
    .reduce((pts, sc) => (pts += sc.points), 0);
};
