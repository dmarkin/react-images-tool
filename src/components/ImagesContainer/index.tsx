import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ImagesView from 'components/ImagesView';
import { AppState } from 'reducers/rootReducer';
import { ImageAction } from './actions';
import { ImageItem } from 'interfaces/image';

export interface ImagesContainerProps {
  list: ImageItem[],
  isLoading: boolean,
  actions: {
    getList: typeof ImageAction.getList,
    createRecord: typeof ImageAction.createRecord,
    saveRecord: typeof ImageAction.saveRecord,
    removeRecord: typeof ImageAction.removeRecord,
  }
}

class ImagesContainer extends React.PureComponent<ImagesContainerProps> {
  componentDidMount(): void {
    this.props.actions.getList();
  }

  render() {
    const { list, isLoading, actions } = this.props;
    const { createRecord, saveRecord, removeRecord } = actions;

    return (<ImagesView list={list}
                        isLoading={isLoading}
                        createRecord={createRecord}
                        saveRecord={saveRecord}
                        removeRecord={removeRecord}/>);
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    list: state.images.images,
    isLoading: state.images.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { getList, createRecord, saveRecord, removeRecord } = ImageAction;

  return {
    actions: bindActionCreators({
      getList, createRecord, saveRecord, removeRecord,
    }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagesContainer);
