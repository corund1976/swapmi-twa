import { TailSpin } from 'react-loader-spinner';

import s from './loaderSpinner.module.css';

function LoaderSpinner() {
  return (
    <div className={s.container}>
      <TailSpin color="#62ea99" height={100} width={100} ariaLabel="loading" />
    </div>
  );
}

export default LoaderSpinner;
