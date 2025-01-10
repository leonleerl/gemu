'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchExampleData } from '../store/slices/exampleSlice';
import { fetchStudents } from '../store/slices/studentSlice';

import { RootState, AppDispatch } from '../store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const students = useSelector((state: RootState) => state.students.students);
  const status = useSelector((state: RootState) => state.students.status);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h1>Student Information</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Failed to fetch students.</p>}
      {status === 'succeeded' && (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <strong>{student.name}</strong> (Age: {student.age}) - Major: {student.major}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}
