import { combineReducers } from 'redux';
import { imagesReducer } from 'components/ImagesContainer/reducer';

export const rootReducer = combineReducers({
  images: imagesReducer,
});

export type AppState = ReturnType<typeof rootReducer>
