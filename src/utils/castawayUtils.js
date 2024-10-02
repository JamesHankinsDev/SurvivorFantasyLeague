export const getCastawayTotalPoints = (castaway, week = null) => {
  return castaway.scoringEventIds
    .filter((sc) => {
      if (week == null) {
        return true;
      }
      return sc.week === week;
    })
    .reduce((pts, sc) => (pts += sc.points), 0);
};
