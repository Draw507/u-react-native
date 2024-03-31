import axios from 'axios';

export const blobStorageApi = axios.create({
  baseURL: 'https://nassadigitalfilesdev2.blob.core.windows.net',
});
