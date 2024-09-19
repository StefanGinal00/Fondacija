// App.js
import React, { useState, useEffect } from 'react';
import Track from './staza';
import './App.css';

// Array of track images
const trackImages = [
  '/assets/staza1.png',
  '/assets/staza2.png',
  '/assets/staza3.png',
  '/assets/staza4.png'
];

const trackTexts = [
  'AUTIZMUS ALAPITVANY',
  'LAMPAS 92 ALAPITVANY',
  'NOE ALLATOTTHON ALAPITVANY',
  'SZENT ISTVAN KIRALY ZENEI ALAPITVANY'
];

const title = [
  'AUTIZMUS ALAPITVANY',
  'LAMPAS 92 ALAPITVANY',
  'NOE ALLATOTTHON ALAPITVANY',
  'SZENT ISTVAN KIRALY ZENEI ALAPITVANY'
]

const description = [
  'Az Autizmus Alapítvány 1995-ben alakult, azóta folyamatosan segíti az autizmussal élőket és családjaikat. Az alapítvány célja, hogy az autizmussal élők minél teljesebb életet élhessenek, és a társadalom minél elfogadóbb legyen irántuk.Az Autizmus Alapítvány 1995-ben alakult, azóta folyamatosan segíti az autizmussal élőket és családjaikat. Az alapítvány célja, hogy az autizmussal élők minél teljesebb életet élhessenek, és a társadalom minél elfogadóbb legyen irántuk',
  'A Lampás 92 Alapítvány 1992-ben alakult, és azóta is folyamatosan segíti a rászorulókat. Az alapítvány célja, hogy a hajléktalanoknak és a szegényeknek segítséget nyújtson, és az őket ért szociális problémákra megoldást találjon.',
  'A Noé Állatotthon Alapítvány 1992-ben alakult, és azóta is folyamatosan segíti az állatokat. Az alapítvány célja, hogy az állatoknak megfelelő életkörülményeket biztosítson, és az állatkínzás ellen küzdjön.',
  'A Szent István Király Zenei Alapítvány 1995-ben alakult, és azóta is folyamatosan segíti a tehetséges zenészeket. Az alapítvány célja, hogy a tehetséges zenészeknek segítséget nyújtson, és a zenei kultúrát népszerűsítse.'
]

const App = () => {
  const [sleighs, setSleighs] = useState([
    { position: 0 },
    { position: 0 },
    { position: 0 },
    { position: 0 }
  ]);

  const [ipAddress, setIpAddress] = useState('');

  const resetSleighs = () => {
    const resetSleighsState = sleighs.map(() => ({ position: 0 }));
    setSleighs(resetSleighsState);
  };

  const handleSleighDrag = (index, newPosition) => {
    const totalValue = sleighs.reduce((acc, sleigh) => acc + sleigh.position * 250000, 0);
  
    const remainingValue = 3000000 - totalValue + sleighs[index].position * 250000;
  
    const maxAllowedPosition = Math.min(newPosition, Math.floor(remainingValue / 250000));
  
    const updatedSleighs = sleighs.map((sleigh, i) =>
      i === index ? { ...sleigh, position: maxAllowedPosition } : sleigh
    );
  
    setSleighs(updatedSleighs);
  };
  
  const totalSleighValue = sleighs.reduce((acc, sleigh) => acc + sleigh.position * 250000, 0);

  const isSubmitDisabled = totalSleighValue < 3000000; 

  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    };

    fetchIp();
  }, []);

  const handleSubmit = async () => {
    const timestamp = new Date(); // Trenutno vreme
    const tenMinutesInMilliseconds = 10 * 60 * 1000;

    const lastSubmission = JSON.parse(localStorage.getItem('lastSubmission')) || {};
    const lastSubmissionTime = new Date(lastSubmission.time);
    const ipStored = lastSubmission.ip;

    const donations = sleighs.map((sleigh, index) => ({
      organization: title[index],
      amount: sleigh.position * 250000,
    }));

    if (ipStored === ipAddress && timestamp - lastSubmissionTime < tenMinutesInMilliseconds) {
      alert('Sa ove IP adrese su podaci već poslati pre manje od 10 minuta.');
      return; 
    }

    

    const data = {
      "AUTIZMUS ALAPITVANY": sleighs[0].position * 250000,
      "LAMPAS 92 ALAPITVANY": sleighs[1].position * 250000,
      "NOE ALLATOTTHON ALAPITVANY": sleighs[2].position * 250000,
      "SZENT ISTVAN KIRALY ZENEI ALAPITVANY": sleighs[3].position * 250000, 
      ip: ipAddress,
      time: timestamp,
    };

    // Slanje podataka na SheetDB
    try {
      const response = await fetch('https://sheetdb.io/api/v1/gb7oag60l3qbh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Podaci su uspešno poslati!');
        localStorage.setItem('lastSubmission', JSON.stringify({
          ip: ipAddress,
          time: timestamp.toISOString()
        }));
      } else {
        alert('Došlo je do greške pri slanju podataka.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Došlo je do greške pri slanju podataka.');
    }
  };

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <span className='header-tekst'>AZ AJÁNDÉK KÖZÖS</span>
          <img src='/assets/slika.png' alt='logo' className='App-logo' />
          <div className="text-overlay">
            <p>
              A szánkópályán minden beosztás 250 ezer forintot jelent. Húzza a szánkókat aszerint, ahogyan Ön osztaná el az adományt az alapítványok között. A kiválasztott arányokat végül egyesítjük, s ennek megfelelően osztjuk szét a felajánlott összeget a négy szervezet között. Miután végzett, az „Elküldöm” gombra kattintva véglegesítse döntését.
            </p>
          </div>
        </header>
      </div>
      {sleighs.map((sleigh, index) => (
        <Track
          key={index}
          trackImage={trackImages[index]}
          sleigh={sleigh}
          onSleighDrag={(newPosition) => handleSleighDrag(index, newPosition)}
          trackText={trackTexts[index]}
          title={title[index]}
          description={description[index]}
        />        
      ))}
      <div className="buttons-container">
        <button className="reset-button" onClick={resetSleighs}>VISSZAÁLLÍTÁS</button>
        <button className="submit-button" onClick={handleSubmit} disabled={isSubmitDisabled}>
          ELKÜLDÖM
        </button>
      </div>
    </div>
    
  );
};

export default App;