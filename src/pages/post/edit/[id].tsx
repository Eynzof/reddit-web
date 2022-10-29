import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '../../../utils/createUrqlClient';

const EditPost = () => {
  return <div>hello</div>;
};

export default withUrqlClient(createUrqlClient)(EditPost);
