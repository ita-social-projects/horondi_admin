class FileReaderMock {
  DONE = FileReader.DONE;

  EMPTY = FileReader.EMPTY;

  LOADING = FileReader.LOADING;

  readyState = 0;

  error = null;

  result = null;

  abort = jest.fn();

  addEventListener = jest.fn().mockImplementation((_, fn) => fn());

  dispatchEvent = jest.fn();

  onabort = jest.fn();

  onerror = jest.fn();

  onload = jest.fn().mockImplementation((_, fn) => fn());

  onloadend = jest.fn();

  onloadprogress = jest.fn();

  onloadstart = jest.fn();

  onprogress = jest.fn();

  readAsArrayBuffer = jest.fn();

  readAsBinaryString = jest.fn();

  readAsDataURL = jest.fn();

  readAsText = jest.fn();

  removeEventListener = jest.fn();
}

export default FileReaderMock;
