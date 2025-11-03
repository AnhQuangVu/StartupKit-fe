import React, { useEffect, useState, useCallback } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import steps from '../../config/onboardingSteps';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingTour() {
  const { user, updateUser } = useAuth();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [joySteps, setJoySteps] = useState([]);

  useEffect(() => {
    // map our config to react-joyride steps
    const mapped = steps.map(s => ({
      target: s.target,
      content: (
        <div className="p-2">
          <div className="font-semibold text-gray-900">{s.title}</div>
          <div className="text-sm text-gray-700 mt-1">{s.content}</div>
        </div>
      ),
      placement: s.placement || 'right'
    }));
    setJoySteps(mapped);
  }, []);

  useEffect(() => {
    // Auto-start when user first login and hasn't seen onboarding
    try {
      const seen = localStorage.getItem('onboarding_seen');
      if (user && user.is_first_login && !seen) {
        setTimeout(() => setRun(true), 600); // slight delay to ensure DOM ready
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    const handler = () => setRun(true);
    window.addEventListener('start-onboarding', handler);
    return () => window.removeEventListener('start-onboarding', handler);
  }, []);

  const handleJoyrideCallback = useCallback((data) => {
    const { status, index, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // mark seen
      localStorage.setItem('onboarding_seen', 'true');
      if (updateUser) {
        updateUser({ onboarding_seen: true });
      }
      setRun(false);
      setStepIndex(0);
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
    }
  }, [updateUser]);

  return (
    <Joyride
      steps={joySteps}
      run={run}
      stepIndex={stepIndex}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#FFCE23',
          textColor: '#111827',
          width: 320,
          borderRadius: 12
        },
        tooltipContent: {
          padding: '12px'
        },
        buttonNext: {
          backgroundColor: '#FFCE23',
          color: '#111827'
        },
        buttonBack: {
          color: '#111827'
        }
      }}
      locale={{
        back: 'Quay lại',
        close: 'Đóng',
        last: 'Kết thúc',
        next: 'Tiếp theo',
        skip: 'Bỏ qua'
      }}
      callback={handleJoyrideCallback}
    />
  );
}
