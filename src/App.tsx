import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <div>
      <h1>Case Management System</h1>
      <div className="card">
        <p>
          You're signed in! Let's manage some cases.
        </p>
      </div>
    </div>
  );
}

export default withAuthenticator(App);