import React, { Fragment } from 'react';
import cool_gif from './cool_gif.gif';

export default () => (
    <Fragment>
        <img
            src={cool_gif}
            style={{ width: '200px', margin: 'auto', display: 'block', borderRadius: '25%' }}
            alt='Loading...'
        />
    </Fragment>
);

