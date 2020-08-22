import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DocumentPassword from './DocumentPassword';
import Main from './Main';
import PageLoading from 'components/Layout/PageLoading';
import { getDocumentByRevcode } from 'actions/documentActions';
import ErrorMessage from '../Layout/ErrorMessage';

const Scan = ({ match, getDocumentByRevcode }) => {
  const [stage, setStage] = useState(0);
  const [password, setPassword] = useState('');
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');
  const revCode = match.params.revcode;

  useEffect(() => {
    async function asyncGetByRev() {
      const res = await getDocumentByRevcode({ revCode });

      if (res?.passwordProtected) {
        setStage(1);
      } else {
        setPayload(res);
        setStage(2);
      }
    }
    asyncGetByRev();
  }, [revCode, getDocumentByRevcode]);

  const submitPassword = async () => {
    const res = await getDocumentByRevcode({ revCode, password });

    if (res.errorMessage) {
      setError(res.errorMessage);
      return;
    }
    setPayload(res);
    setStage(2);
    console.log(res);
  };

  // check if document settings require password
  if (stage === 1) {
    return (
      <div>
        <DocumentPassword
          payload={payload}
          submitPassword={submitPassword}
          setPassword={setPassword}
        />
        {error && (
          <ErrorMessage message={error} clearError={() => setError('')} />
        )}
      </div>
    );
  }

  // else return scan page

  if (stage === 2) {
    return <Main payload={payload} />;
  }

  return <PageLoading />;
};

export default connect(null, {
  getDocumentByRevcode,
})(Scan);
