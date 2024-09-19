/* From Uiverse.io by andrew-demchenk0 */

export const CastawayCard = (castaway) => {
  console.log('Castaway: ', castaway);
  console.log('Castaway: ', castaway.castaway);
  console.log('Castaway: ', castaway.castaway.imageUrl);

  return (
    <div className="card">
      <img
        src={castaway.castaway.imageUrl}
        alt={castaway.castaway.name}
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="card__title">{castaway.castaway.name}</div>
      <div className="card__subtitle">Web Development</div>
      <div className="card__wrapper">
        <button className="card__btn">Button</button>
        <button className="card__btn card__btn-solid">Button</button>
      </div>
    </div>
  );
};
