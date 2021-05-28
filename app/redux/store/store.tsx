import {configureStore} from '@reduxjs/toolkit';
import auth from '../../components/auth/init';

export default configureStore({
  reducer: {
    auth: auth,
  },
});
