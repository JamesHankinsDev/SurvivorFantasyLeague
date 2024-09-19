import axios from 'axios';
import { useEffect, useState } from 'react';

const Scoring = () => {
  const [reFetch, setRefetch] = useState(true);
  const [scoringRecords, setScoringRecords] = useState([]);
  const [newScoringRecord, setNewScoringRecord] = useState({
    castawayId: '',
    scoringEvent: '',
    week: '',
  });
  const [castaways, setCastaways] = useState([]);
  useEffect(() => {
    const fetchCastaways = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/admin/castaways',
          {
            headers: { Authorization: localStorage.getItem('token') },
          }
        );
        setCastaways(response.data);
      } catch (err) {
        console.error('AAAAAHHHHHH: ', err);
      }
    };
    fetchCastaways();
  }, []);

  useEffect(() => {
    const fetchScoringRecords = async () => {
      const response = await axios.get('http://localhost:5000/api/scoring', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log('response.data: ', response.data);
      setScoringRecords(response.data);
    };
    fetchScoringRecords();
    setRefetch(false);
  }, []);

  useEffect(() => {
    if (reFetch === true) {
      const fetchScoringRecords = async () => {
        const response = await axios.get('http://localhost:5000/api/scoring', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log('response.data: ', response.data);
        setScoringRecords(response.data);
      };
      fetchScoringRecords();
      setRefetch(false);
    }
  }, [reFetch]);

  useEffect(() => {
    console.log({ scoringRecords });
  }, [scoringRecords]);

  const addScoringRecord = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/scoring',
        newScoringRecord,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      //   setScoringRecords([...scoringRecords, response.data]);
      setNewScoringRecord({ castawayId: '', scoringEvent: '', week: '' });
      setRefetch(true);
    } catch (error) {
      alert('Error adding castaway: ', error);
    }
  };

  const deleteScoringRecord = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/scoring/${id}`,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      //   setScoringRecords([...scoringRecords, response.data]);
      //   setNewScoringRecord({ castawayId: '', scoringEvent: '', week: '' });
      setRefetch(true);
    } catch (error) {
      console.error({ deleting: error });
      alert('Error deleting castaway: ', error);
    }
  };

  return (
    <>
      <h1>Scoring</h1>
      {castaways.map((c) => {
        return (
          <h1 key={c._id}>
            {c.name} | {c._id}
          </h1>
        );
      })}
      <h1>Add Scoring Record</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addScoringRecord();
        }}
      >
        <input
          type="text"
          placeholder="Castaway ID"
          value={newScoringRecord.castawayId}
          onChange={(e) =>
            setNewScoringRecord({
              ...newScoringRecord,
              castawayId: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="scoring event"
          value={newScoringRecord.scoringEvent}
          onChange={(e) =>
            setNewScoringRecord({
              ...newScoringRecord,
              scoringEvent: e.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="week"
          value={newScoringRecord.week}
          onChange={(e) =>
            setNewScoringRecord({
              ...newScoringRecord,
              week: e.target.value,
            })
          }
        />
        <button type="submit">Add Scoring Record</button>
      </form>
      <button onClick={() => console.log({ seeScoring: scoringRecords })}>
        See Scoring
      </button>
      {scoringRecords.map((sc) => {
        const name = castaways.find((el) => el._id === sc.castawayId).name;

        return (
          <>
            <p>
              {name}, {sc.scoringEvent}, {sc.points}
            </p>
            <button onClick={() => deleteScoringRecord(sc._id)}>Delete</button>
          </>
        );
      })}
    </>
  );
};

export default Scoring;
