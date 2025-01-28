import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCourses } from '../service/api';
import styles from './prof-dashboard.module.css';

export default function ProfDashboardPage() {
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Get email from query parameters
    const { email: queryEmail } = router.query;
    if (queryEmail) {
      setEmail(queryEmail);
      // Store email in localStorage for future use
      localStorage.setItem('email', queryEmail);
    } else {
      // Fallback to email stored in localStorage
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [router.query]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (email) {
        try {
          const coursesData = await getCourses(email);
          setCourses(coursesData.courses); // Ensure coursesData is correctly accessed
        } catch (error) {
          console.error('Failed to fetch courses:', error);
        }
      }
    };

    fetchCourses();
  }, [email]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.email}>{email}</div>
        <div className={styles.addCourse}>Add Course</div>
      </div>
      <h1 className={styles.title}>Professor Dashboard</h1>
      <h2>Courses</h2>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li key={course._id} className={styles.courseItem}>
            <h3>{course.courseName}</h3>
            <p><strong>Department:</strong> {course.department}</p>
            <p><strong>Description:</strong> {course.courseDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}