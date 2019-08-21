import { Dispatch } from 'redux';
import storage from '../../services/StorageService';
import {
  ImageItem,
} from '../../interfaces/image';
import { ImagesActions as ACTIONS } from '../../interfaces/actions';
import { AppState } from '../../reducers/rootReducer';

export class ImageAction {
  static getList = () => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: ACTIONS.GET_LIST_REQUEST,
        payload: { errors: {} },
      });

      try {
        const response = await storage.getRecords();
        dispatch({
          type: ACTIONS.GET_LIST_SUCCESS,
          payload: response,
        });
      } catch (errors) {
        dispatch({
          type: ACTIONS.GET_LIST_FAIL,
          payload: errors,
        });
      }
    };
  };

  static createRecord = (file: File) => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: ACTIONS.CREATE_RECORD_REQUEST,
        payload: { errors: {} },
      });

      try {
        const response = await storage.createRecord(file);

        dispatch({
          type: ACTIONS.CREATE_RECORD_SUCCESS,
          payload: response,
        });
      } catch (errors) {
        dispatch({
          type: ACTIONS.CREATE_RECORD_FAIL,
          payload: errors,
        });
      }
    };
  };

  static saveRecord = (item: ImageItem) => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: ACTIONS.UPDATE_RECORD_REQUEST,
        payload: { errors: {} },
      });

      try {
        const response = await storage.saveRecord(item);
        dispatch({
          type: ACTIONS.UPDATE_RECORD_SUCCESS,
          payload: response,
        });
      } catch (errors) {
        dispatch({
          type: ACTIONS.UPDATE_RECORD_FAIL,
          payload: errors,
        });
      }
    };
  };

  static removeRecord = (item: ImageItem) => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: ACTIONS.REMOVE_RECORD_REQUEST,
        payload: { errors: {} },
      });

      try {
        const response = await storage.removeRecord(item);
        dispatch({
          type: ACTIONS.REMOVE_RECORD_SUCCESS,
          payload: response,
        });
      } catch (errors) {
        dispatch({
          type: ACTIONS.REMOVE_RECORD_FAIL,
          payload: errors,
        });
      }
    };
  };
}
