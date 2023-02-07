import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button className="nes-btn" onClick={() => router.back()}>
      {'< Back'}
    </Button>
  );
};
