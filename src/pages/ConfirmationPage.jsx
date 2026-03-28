import { useEffect } from 'react';
import ConfirmationView from '../components/confirmation/ConfirmationView';

export default function ConfirmationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ConfirmationView />
    </>
  );
}
