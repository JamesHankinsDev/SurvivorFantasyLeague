import axios from 'axios';
import { useEffect, useState } from 'react';

export const CastawayCard = ({
  castaway,
  handleClick,
  setCastaways,
  castaways,
  scoringRecords,
}) => {
  // const [editCastaway, setEditCastaway] = useState(null);
  // const isEliminated = castaway.status === 'eliminated';
  // const [castawayScoring, setCastawayScoring] = useState([]);

  // useEffect(() => {
  //   console.log('pre scoring: ', scoringRecords);
  //   console.log(
  //     'filtered scoring',
  //     scoringRecords.filter((el) => el.castawayId === castaway._id)
  //   );
  //   setCastawayScoring(
  //     scoringRecords.filter((el) => el.castawayId === castaway._id)
  //   );
  // }, []);

  // // console.log({ scoringRecords });

  // const isAdmin = localStorage.getItem('role') === 'admin';

  // const updateCastaway = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/admin/castaway/${editCastaway._id}`,
  //       editCastaway,
  //       {
  //         headers: { Authorization: localStorage.getItem('token') },
  //       }
  //     );
  //     setCastaways(
  //       castaways.map((c) => (c._id === response.data._id ? response.data : c))
  //     );
  //     setEditCastaway(null);
  //   } catch (err) {
  //     console.error('error');
  //     alert('Error updating castaway');
  //   }
  // };
  // const deleteCastaway = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/admin/castaway/${id}`, {
  //       headers: { Authorization: localStorage.getItem('token') },
  //     });
  //     setCastaways(castaways.filter((c) => c._id !== id));
  //   } catch (err) {
  //     alert('Error deleting castaway');
  //   }
  // };

  // return (
  //   <div
  //     className={`rounded ${
  //       isEliminated ? 'bg-red-800' : 'bg-slate-300'
  //     } w-max text-slate-900 text-center flex flex-row p-5 m-5`}
  //   >
  //     <div className="flex flex-col justify-center items-center">
  //       {editCastaway && editCastaway._id === castaway._id ? (
  //         <div>
  //           <div className={'form bg-slate-900 rounded'}>
  //             <input
  //               className="input"
  //               type="text"
  //               value={editCastaway?.name}
  //               onChange={(e) =>
  //                 setEditCastaway({ ...editCastaway, name: e.target.value })
  //               }
  //             />
  //             <span className={'input-border'}></span>
  //           </div>
  //           <div className={'form bg-slate-900 rounded'}>
  //             <input
  //               className="input"
  //               type="text"
  //               value={editCastaway?.tribe}
  //               onChange={(e) =>
  //                 setEditCastaway({ ...editCastaway, tribe: e.target.value })
  //               }
  //             />
  //             <span className={'input-border'}></span>
  //           </div>
  //           <div className={'form bg-slate-900 rounded'}>
  //             <input
  //               className="input"
  //               type="number"
  //               value={editCastaway?.season}
  //               onChange={(e) =>
  //                 setEditCastaway({ ...editCastaway, season: e.target.value })
  //               }
  //             />
  //             <span className={'input-border'}></span>
  //           </div>
  //           <div className={'form bg-slate-900 rounded'}>
  //             <input
  //               className="input"
  //               type="text"
  //               placeholder="status"
  //               value={editCastaway?.status}
  //               onChange={(e) =>
  //                 setEditCastaway({ ...editCastaway, status: e.target.value })
  //               }
  //             />
  //             <span className={'input-border'}></span>
  //           </div>
  //           <button className="boton-elegante m-5" onClick={updateCastaway}>
  //             Save
  //           </button>
  //           <button
  //             className="boton-elegante m-5"
  //             onClick={() => setEditCastaway(null)}
  //           >
  //             Cancel
  //           </button>
  //         </div>
  //       ) : (
  //         <>
  //           <div className={`text-lg bg-slate-900 rounded text-slate-300 px-5`}>
  //             {castaway.name}
  //           </div>
  //           <div
  //             className={`rounded p-1 mt-1 text-sm ${
  //               isEliminated
  //                 ? 'bg-slate-300'
  //                 : castaway.tribe === 'Lavo'
  //                 ? 'bg-red-500'
  //                 : castaway.tribe === 'Gata'
  //                 ? 'bg-amber-400'
  //                 : 'bg-blue-700'
  //             } italic`}
  //           >
  //             {isEliminated ? 'ELIMINATED' : castaway.tribe}
  //           </div>
  //           <div className={'text-start grid grid-cols-3 gap-2'}>
  //             <h1 className={'text-sm'}>
  //               Pts: {castawayScoring.reduce((pts, sc) => pts + sc.points, 0)}
  //             </h1>
  //             <h1 className={'text-sm'}>
  //               VA:
  //               {
  //                 castawayScoring.filter((sc) => sc.scoringEvent === 'VA')
  //                   .length
  //               }
  //             </h1>
  //             <h1 className={'text-sm'}>
  //               VF:{' '}
  //               {
  //                 castawayScoring.filter((sc) => sc.scoringEvent === 'VF')
  //                   .length
  //               }
  //             </h1>
  //             <h1 className={'text-sm'}>
  //               CW:{' '}
  //               {
  //                 castawayScoring.filter((sc) => sc.scoringEvent === 'CW')
  //                   .length
  //               }
  //             </h1>
  //             <h1 className={'text-sm'}>
  //               IW:{' '}
  //               {
  //                 castawayScoring.filter((sc) => sc.scoringEvent === 'IW')
  //                   .length
  //               }
  //             </h1>
  //             <h1 className={'text-sm'}>
  //               IF:{' '}
  //               {
  //                 castawayScoring.filter((sc) => sc.scoringEvent === 'IF')
  //                   .length
  //               }
  //             </h1>
  //           </div>
  //           <div className="flex flex-row">
  //             {!isEliminated && (
  //               <button
  //                 className="boton-elegante my-5"
  //                 onClick={() => handleClick(castaway._id)}
  //               >
  //                 Add
  //               </button>
  //             )}
  //             {isAdmin && (
  //               <button
  //                 className="boton-elegante my-5"
  //                 onClick={() => setEditCastaway(castaway)}
  //               >
  //                 Edit
  //               </button>
  //             )}
  //             {isAdmin && (
  //               <button
  //                 className="boton-elegante my-5"
  //                 onClick={() => deleteCastaway(castaway._id)}
  //               >
  //                 Delete
  //               </button>
  //             )}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //     <img
  //       className={`rounded pl-5 ${isEliminated && 'eliminated'}`}
  //       src={castaway.imageUrl}
  //       alt={castaway.name}
  //       style={{ width: '150px', height: 'auto' }}
  //     />
  //   </div>
  // );
  const isEliminated = castaway.status === 'eliminated';

  scoringRecords = scoringRecords.filter(
    (el) => el.castawayId === castaway._id
  );
  const totalPoints = scoringRecords.reduce((pts, sc) => pts + sc.points, 0);

  return (
    <div className={'rounded border-slate-300 border-2 w-full h-max my-2'}>
      <div className={`text-xs bg-green-900 px-5 font-bold`}>
        Points: {totalPoints}
      </div>
      <img
        className={`w-full ${isEliminated && 'eliminated'}`}
        src={castaway.imageUrl}
        alt={castaway.name}
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="text-sm bg-slate-300 font-bold text-slate-900 px-5">
        {castaway.name}
      </div>
      <div
        className={`px-5 text-xs font-bold ${
          castaway.tribe === 'Lavo'
            ? 'bg-red-500'
            : castaway.tribe === 'Gata'
            ? 'bg-amber-400 text-slate-900'
            : 'bg-blue-700'
        } italic`}
      >
        {castaway.tribe}
      </div>
      {isEliminated ? (
        <div className="bg-red-600 px-5 text-slate-900 text-center font-bold">
          Eliminated
        </div>
      ) : (
        <button
          className="w-full bg-slate-500 hover:bg-slate-600"
          onClick={() => handleClick(castaway._id)}
        >
          Add
        </button>
      )}
    </div>
  );
};
