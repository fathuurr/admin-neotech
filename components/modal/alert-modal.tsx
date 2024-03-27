import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown time

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1); // Decrease countdown every second
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer); // Clear the interval when component unmounts or modal closes
    };
  }, [isOpen, countdown]);

  useEffect(() => {
    // Reset countdown when modal opens
    if (isOpen && countdown === 0) {
      setCountdown(5);
    }
  }, [isOpen, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      onClose(); // Close the modal when countdown reaches 0
    }
  }, [countdown, onClose]);

  const handleCancel = () => {
    onClose(); // Close the modal when cancel button is clicked
    setCountdown(5); // Reset countdown to initial value when cancel button is clicked
  };

  const cancelButtonText = countdown > 0 ? `Cancel (${countdown}s)` : 'Cancel';

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} variant='outline' onClick={handleCancel}>
          {cancelButtonText}
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
