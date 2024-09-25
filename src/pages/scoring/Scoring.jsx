import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAPIURI } from '../../utils/API';

const Scoring = () => {
  const [reFetch, setRefetch] = useState(true);
  const [scoringRecords, setScoringRecords] = useState([]);
  const [newScoringRecord, setNewScoringRecord] = useState({
    castawayId: '',
    scoringEvent: 'VF',
    week: '',
  });
  const [castaways, setCastaways] = useState([]);

  const scoringMap = [
    { code: 'VF', title: 'Vote For Eliminated Castaway' },
    { code: 'VA', title: 'Vote Against' },
    { code: 'CW', title: 'Challenge Win' },
    { code: 'IW', title: 'Immunity Win' },
    { code: 'IF', title: 'Idol Found' },
    { code: 'EL', title: 'Eliminated' },
    { code: 'TC', title: 'Tribal Council' },
    { code: 'FM', title: 'Fire Mad' },
    { code: 'Thrd', title: 'Third Place' },
    { code: 'Scnd', title: 'Second Place' },
    { code: 'Frst', title: 'First Place' },
  ];

  useEffect(() => {
    const fetchCastaways = async () => {
      try {
        const BASE_URI = getAPIURI();
        const response = await axios.get(`${BASE_URI}/api/admin/castaways`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setCastaways(response.data);
        setNewScoringRecord({
          ...newScoringRecord,
          castawayId: response.data[0]._id,
        });
      } catch (err) {
        console.error('AAAAAHHHHHH: ', err);
      }
    };
    fetchCastaways();
  }, []);

  useEffect(() => {
    const BASE_URI = getAPIURI();
    const fetchScoringRecords = async () => {
      const response = await axios.get(`${BASE_URI}/api/scoring`, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      setScoringRecords(response.data);
    };
    fetchScoringRecords();
    setRefetch(false);
  }, []);

  useEffect(() => {
    if (reFetch === true) {
      const BASE_URI = getAPIURI();
      const fetchScoringRecords = async () => {
        const response = await axios.get(`${BASE_URI}/api/scoring`, {
          headers: { Authorization: localStorage.getItem('token') },
        });

        setScoringRecords(response.data);
      };
      fetchScoringRecords();
      setRefetch(false);
    }
  }, [reFetch]);

  const addScoringRecord = async () => {
    try {
      const BASE_URI = getAPIURI();
      const response = await axios.post(
        `${BASE_URI}/api/scoring`,
        newScoringRecord,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      setNewScoringRecord({ castawayId: '', scoringEvent: 'VF', week: '' });
      setRefetch(true);
    } catch (error) {
      alert('Error adding castaway: ', error);
    }
  };

  const deleteScoringRecord = async (id) => {
    try {
      const BASE_URI = getAPIURI();
      const response = await axios.delete(`${BASE_URI}/api/scoring/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setScoringRecords([...scoringRecords, response.data]);
      setNewScoringRecord({ castawayId: '', scoringEvent: '', week: '' });
      setRefetch(true);
    } catch (error) {
      console.error({ deleting: error });
      alert('Error deleting castaway: ', error);
    }
  };

  return (
    <>
      <h1>Add Scoring Record</h1>
      <form
        className={'flex flex-col'}
        onSubmit={(e) => {
          e.preventDefault();
          addScoringRecord();
        }}
      >
        <select
          name="castaway"
          id="castaway-select"
          onChange={(e) => {
            setNewScoringRecord({
              ...newScoringRecord,
              castawayId: e.target.value,
            });
          }}
        >
          {castaways.map((c) => {
            return (
              <option key={`castaway_options__${c._id}`} value={c._id}>
                {c.name} | {c.tribe}
              </option>
            );
          })}
        </select>

        <select
          name="scoring_event"
          id="scoring_event-select"
          onChange={(e) => {
            setNewScoringRecord({
              ...newScoringRecord,
              scoringEvent: e.target.value,
            });
          }}
        >
          {scoringMap.map((c, i) => {
            return (
              <option key={`scoring_event_options__${i}`} value={c.code}>
                {c.title}
              </option>
            );
          })}
        </select>

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
        <button className={'boton-elegante'} type="submit">
          Add Scoring Record
        </button>
      </form>
      <button onClick={() => console.log({ seeScoring: scoringRecords })}>
        See Scoring
      </button>
      {scoringRecords.map((sc) => {
        const { name } = sc.castawayId ?? '';

        return (
          <div key={`scoring_record__${sc._id}`}>
            <p>
              {name},{' '}
              {scoringMap.find((el) => el.code === sc.scoringEvent).title}, Week{' '}
              {sc.week} | {sc.points}
            </p>
            <button onClick={() => deleteScoringRecord(sc._id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Scoring;
