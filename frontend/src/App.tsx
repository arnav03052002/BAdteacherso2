// import React, { useState } from 'react';

// const App: React.FC = () => {
//   const [text, setText] = useState('');
//   const [language, setLanguage] = useState('');
//   const [translatedText, setTranslatedText] = useState('');

  
//   const handleTranslate = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/chain/batch', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           inputs: [
//             {
//               language: language,
//               question: text,
//             },
//           ],
//           config: {},
//           kwargs: {},
//         }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Request failed with status ${response.status}: ${errorData.detail}`);
//       }
  
//       const data = await response.json();
//       setTranslatedText(data.output);  // Assuming 'output' is the relevant field to display
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   return (
//     <div>
//       <h1>Translate Text</h1>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter text"
//       />
//       <input
//         type="text"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         placeholder="Enter language"
//       />
//       <button onClick={handleTranslate}>Translate</button>
//       <h2>Translated Text:</h2>
//       <p>{translatedText}</p>
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/chain/batch', {
        inputs: [
          {
            language: language,
            question: text,
          },
        ],
        config: {},
        kwargs: {},
      });

      setTranslatedText(response.data.output);  // Assuming 'output' is the relevant field to display
    } catch (error: unknown) {
      console.error('Error:', error);
      if (axios.isAxiosError(error)) {
        // Handling axios-specific errors
        console.error('Axios error:', error.response?.data);
      } else if (error instanceof Error) {
        // Handling general errors (error.message is now accessible)
        console.error('General error:', error.message);
      } else {
        console.error('Unknown error');
      }
    }
  };

  return (
    <div>
      <h1>Translate Text</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Enter language"
      />
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default App;
