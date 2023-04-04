import { Container, LinearProgress } from '@mui/material';

export function AppLoading() {
  return (
    <Container
      style={{
        flex: 1,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        Waiting until server is up and running...
        <LinearProgress style={{ marginTop: 12 }} />
      </div>
    </Container>
  );
}
