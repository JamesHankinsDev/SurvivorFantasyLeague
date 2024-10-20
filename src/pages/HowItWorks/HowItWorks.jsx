const h1ClassName = 'text-lg font-bold';
const scoringBadgeClassName =
  'md:mx-5 mx-1 md:ml-10 p-2 bg-yellow-400 rounded-full';
const liClassName = 'py-4 text-sm italic';
const subHeadClass = 'text-md pl-5';
const detailsClassName = 'text-sm pb-5 pl-5';

const HowItWorks = () => {
  return (
    <>
      <h1 className={h1ClassName}>Picking your team</h1>
      <p className={detailsClassName}>
        At the beginning of the Survivor Season, the first episode is for you to
        scout your favorite Castaways. Before the beginning of the second
        episode, you will need to select 5 castaways to make up your Fantasy
        Tribe. These are your Survivor champions that can score you points in
        the second week of the season.
      </p>
      <h1 className={h1ClassName}>Scoring Points</h1>
      <p className={detailsClassName}>
        Your Castaways will score your Fantasy Tribe points based on their
        performance each week. The scoring for this season is:
      </p>

      <p className={subHeadClass}>Weekly Scoring Events:</p>
      <ol>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+5</span>Attend (and survive)
          a tribal council.
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+2</span>Voted for the
          eliminated Castaway.
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+10</span>Castaway
          participates in and wins a non-Immunity based challenge.
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+15</span>Castaway has won
          Individual Immunity (This can only happen after the tribes merge and
          does not apply to team immunity).
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+20</span>Find a Hidden
          Immunity Idol! (This must be a fully realized Idol for at least 1
          tribal council)
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName + ' bg-red-400'}>-10</span>
          Voted out of Survivor (Note, this player will also not receive points
          for having survived a Tribal Council).
        </li>
      </ol>

      <p className={subHeadClass}>Special Scoring Events:</p>
      <ol>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+20</span>Awarded to the
          Castaway who wins the Fire-Making Challenge
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+25</span>Awarded to the
          Castaway who receives the fewest votes to win Survivor
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+35</span>Awarded to the
          Castaway who receives the second most votes to win Survivor
        </li>
        <li className={liClassName}>
          <span className={scoringBadgeClassName}>+50</span>Awarded to the
          Castaway who wins Survivor!
        </li>
      </ol>

      <h1 className={h1ClassName}>Updating your team</h1>
      <p className={detailsClassName}>
        Each week, you will have an opportunity to update your Fantasy Tribe. To
        do this, you may{' '}
        <span className={'italic underline'}>
          drop one castaway to be replaced by another
        </span>
        . This can be done for any Castaway on your team, whether they've been
        eliminated or not.
        <br />
        After <span className={'italic'}>The Merge</span>, your tribe will be
        locked and you wil no longer be able to make changes to your Fantasy
        Tribe. This will be your team for the remainder of the season!
      </p>
    </>
  );
};

export default HowItWorks;
