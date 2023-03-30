import { Box, Button, CircularProgress, Container } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { getDocumentInformation } from './api/api';
import { DocumentPreview } from './components/DocumentPreview';
import { Block } from './types/Block';

function App() {
  const [file, setFile] = useState<any>();
  const [response, setResponse] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt: any) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    const res = await getDocumentInformation(formData);
    setLoading(false);
    if (res.status === 'OK') {
      setResponse(res.result);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target', e.target.files);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
        minHeight: '100vh',
      }}
    >
      <nav style={{ padding: 20 }}>
        <div>John Snow Labs</div>
      </nav>
      <Container
        style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}
      >
        <Box
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <div>
            <Button variant="outlined" component="label">
              Choose file
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <div>{file ? `${file.name} - ${file.type}` : 'No file chosen'}</div>
          </div>
          <div>
            <Button
              variant="contained"
              style={{ width: 120 }}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress
                  size={20}
                  style={{ marginRight: 12, color: 'white' }}
                />
              ) : (
                'Process'
              )}
            </Button>
            <Button color="error" onClick={() => setResponse([])}>
              Clear
            </Button>
          </div>
        </Box>
        <Box
          className="result"
          style={{ backgroundColor: '#fafbfc', flexGrow: 1, display: 'flex' }}
        >
          <DocumentPreview response={response} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
