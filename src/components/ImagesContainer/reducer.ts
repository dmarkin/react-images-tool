import { ImagesState, ImagesActionTypes, ImageItem } from 'interfaces/image';
import { ImagesActions as ACTIONS } from 'interfaces/actions';

const initialState: ImagesState = {
  isLoading: false,
  images: [],
  errors: {},
};

export function imagesReducer(state = initialState, action: ImagesActionTypes): ImagesState {
  switch (action.type) {
    case ACTIONS.GET_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    }
    case ACTIONS.GET_LIST_SUCCESS: {
      return {
        ...state,
        images: [...action.payload],
        isLoading: false,
      };
    }
    case ACTIONS.GET_LIST_FAIL: {
      return {
        ...state,
        errors: { ...action.payload },
        isLoading: false,
      };
    }
    case ACTIONS.CREATE_RECORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    }
    case ACTIONS.CREATE_RECORD_SUCCESS: {
      state.images.push(action.payload);

      return {
        ...state,
        isLoading: false,
      };
    }
    case ACTIONS.CREATE_RECORD_FAIL: {
      return {
        ...state,
        errors: { ...action.payload },
        isLoading: false,
      };
    }
    case ACTIONS.UPDATE_RECORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    }
    case ACTIONS.UPDATE_RECORD_SUCCESS: {
      let currentIndex = -1;
      let currentItem = state.images.find((record: ImageItem, index: number) => {
        if (record.id === action.payload.id) {
          currentIndex = index;
        }
        return record.id === action.payload.id;
      });

      if (currentItem) {
        state.images[currentIndex] = { ...action.payload };
      }

      return {
        ...state,
        isLoading: false,
      };
    }
    case ACTIONS.UPDATE_RECORD_FAIL: {
      return {
        ...state,
        errors: { ...action.payload },
        isLoading: false,
      };
    }
    case ACTIONS.REMOVE_RECORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    }
    case ACTIONS.REMOVE_RECORD_SUCCESS: {
      const images = state.images.filter((record: ImageItem) => {
        return record.id !== action.payload.id;
      });

      return {
        ...state,
        images,
        isLoading: false,
      };
    }
    case ACTIONS.REMOVE_RECORD_FAIL: {
      return {
        ...state,
        errors: { ...action.payload },
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
