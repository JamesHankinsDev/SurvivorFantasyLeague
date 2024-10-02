import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePostWithToast } from '../../../hooks/usePostWithToast';
import { API_URL } from '../../../utils/constants';
import { useCastaways } from '../../../context/CastawayContext';

export const AddCastaway = () => {
  const { refetch } = useCastaways();
  const { accessToken } = useAuth();
  const { postData: postNewCastaway } = usePostWithToast(API_URL.CASTAWAY);
  const [newCastaway, setNewCastaway] = useState({
    name: '',
    tribe: '',
    season: '',
    imageUrl: '',
  });

  const handleAddCastaway = async (e) => {
    e.preventDefault();
    await postNewCastaway('CASTAWAY_ADD', newCastaway, {
      headers: { Authorization: accessToken },
    })
      .finally(refetch)
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <>
      <form
        onSubmit={handleAddCastaway}
        className={'flex flex-row justify-center items-center'}
      >
        <input
          className="w-1/6 mx-2 p-2"
          type="text"
          placeholder="Name"
          value={newCastaway.name}
          onChange={(e) =>
            setNewCastaway({ ...newCastaway, name: e.target.value })
          }
        />
        <input
          className="w-1/6 mx-2 p-2"
          type="text"
          placeholder="Tribe"
          value={newCastaway.tribe}
          onChange={(e) =>
            setNewCastaway({
              ...newCastaway,
              tribe: e.target.value,
            })
          }
        />
        <input
          className="w-1/6 mx-2 p-2"
          type="number"
          placeholder="Season"
          value={newCastaway.season}
          onChange={(e) =>
            setNewCastaway({ ...newCastaway, season: e.target.value })
          }
        />
        <input
          className="w-1/6 mx-2 p-2"
          type="text"
          placeholder="Image URL"
          value={newCastaway.imageUrl}
          onChange={(e) =>
            setNewCastaway({ ...newCastaway, imageUrl: e.target.value })
          }
        />

        <button type="submit" className="m-5 boton-elegante">
          Add Castaway
        </button>
      </form>
    </>
  );
};
