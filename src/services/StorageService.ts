import { ImageItem, Positions } from 'interfaces/image';
import { initialList } from 'images/list';
import { DEFAULT_COLOR, DEFAULT_POSITION, UPLOAD_API_KEY } from 'constants/defaults';
import * as filestack from 'filestack-js';

const client = filestack.init(UPLOAD_API_KEY);

class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;

    const storageList = this.storage.getItem('list');
    if (!storageList || !Array.isArray(JSON.parse(storageList))) {
      this.storage.setItem('list', JSON.stringify(initialList));
    }
  }

  private getStorageList() {
    const listStr = this.storage.getItem('list');
    return listStr ? JSON.parse(listStr) : [];
  }

  getRecords(): ImageItem[] {
    return this.getStorageList();
  }

  updateStorage(list: ImageItem[]): void {
    this.storage.setItem('list', JSON.stringify(list));
  }

  async createRecord(file: File) {
    const list: ImageItem[] = this.getStorageList();
    const nextId: number = list[list.length - 1].id + 1;
    let src: string = '';

    await client.upload(file).then(data => {
      src = data.url;
    }, error =>
      console.log('It needs to handle error: ', error));

    const newItem = {
      id: nextId,
      src: src,
      name: file.name,
      altText: file.name,
      tooltip: {
        text: file.name,
        color: DEFAULT_COLOR,
        position: DEFAULT_POSITION as Positions,
      },
    };

    list.push(newItem);
    this.updateStorage(list);

    return newItem;
  }

  saveRecord(item: ImageItem): ImageItem | undefined {
    const list = this.getStorageList();
    let currentIndex = -1;
    let currentItem = list.find((record: ImageItem, index: number) => {
      if (record.id === item.id) {
        currentIndex = index;
      }
      return record.id === item.id;
    });

    if (currentItem) {
      list[currentIndex] = { ...item };
    }

    this.updateStorage(list);

    return item;
  }

  removeRecord(item: ImageItem): ImageItem {
    const list = this.getStorageList();
    let newList = list.filter((record: ImageItem) => {
      return record.id !== item.id;
    });

    this.updateStorage(newList);

    return item;
  }
}

const storage = new StorageService();

export default storage;
