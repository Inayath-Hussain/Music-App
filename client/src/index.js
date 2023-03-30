import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CodeContextProvider from './context/accessToken';
import NavContextProvider from './context/navigationHook';
import { RpContextProvider, NrContextProvider, LGContextProvider, LSContextProvider, UPContextProvider, UAConextProvider, UARContextProvider, UIContextProvider } from './context/playlists';
import { PlayContextProvider } from './context/play';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CodeContextProvider>
      <RpContextProvider>
        <NrContextProvider>
          <LGContextProvider>
            <LSContextProvider>
              <UPContextProvider>
                <UAConextProvider>
                  <UARContextProvider>
                    <UIContextProvider>
                      <PlayContextProvider>
                        <NavContextProvider>
                          <App />
                        </NavContextProvider>
                      </PlayContextProvider>
                    </UIContextProvider>
                  </UARContextProvider>
                </UAConextProvider>
              </UPContextProvider>
            </LSContextProvider>
          </LGContextProvider>
        </NrContextProvider>
      </RpContextProvider>
    </CodeContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
