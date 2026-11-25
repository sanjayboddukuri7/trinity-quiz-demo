import { MotionConfig } from 'motion/react';
import { StudentApp } from './student/StudentApp';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StudentApp />
    </MotionConfig>
  );
}
