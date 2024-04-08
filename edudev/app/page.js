import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <Container>
      <div className='grid grid-cols-2 items-center h-screen'>
        <div className='mx-auto'> 1 </div>
        <div className='mx-auto'> 2 </div>
      </div> 
    </Container> 
  );
}
