import React, { Fragment } from 'react';
import cool_gif from './cool_gif3.gif';

export default () => (
    <Fragment>
        <img
            src={cool_gif}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
);

