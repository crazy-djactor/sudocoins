import React from "react";
import { Authenticator } from "aws-amplify-react";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AuthWrapper from "./Components/AuthWrapper";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
          <AuthWrapper />
        </Authenticator>
      </header>
    </div>
  );
}

export default App;