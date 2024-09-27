import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import Layout from './Layout/Layout'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ConfigProvider theme={{ cssVar: true }}>
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
      </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
