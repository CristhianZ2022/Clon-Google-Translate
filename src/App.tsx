import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css'

import { useStore } from './hooks/useStore';
import { useDebounce } from './hooks/useDebounce';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constans';

import { ArrowsIcon, ClipboardIcon, VolumeUpIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';


function App() {
  const { fromLanguage, toLanguage, fromText, result, loading, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useStore();

  const debouncedFromText = useDebounce(fromText, 350);

  useEffect(() => {
    if (debouncedFromText === '') return;

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if(result == null) return;
        setResult(result);
      })
      .catch(() => setResult('Error: Something went wrong'));
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  }

  const handleVolume = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  }

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} 
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              loading={loading}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto' >
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} 
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                value={result}
                loading={loading}
                onChange={setResult}
              />
              <Button 
                variant='link' 
                style={{ position: 'absolute', left: '0', bottom: '0' }} 
                onClick={handleClipboard} >
                <ClipboardIcon />
              </Button>
              <Button 
                variant='link' 
                style={{ position: 'absolute', left: '50px', bottom: '0' }}
                onClick={handleVolume} >
                <VolumeUpIcon />
              </Button>
            </div>
          </Stack> 
        </Col>
      </Row>
    </Container>
  )
}

export default App
