type Cover = {
  filePath: string;
  fileName: string;
};

interface _File {
  cover: Cover;
}

interface UploadCover extends Action {
  payload: Promise<Cover>;
}

type FileAction = UploadCover | Action;
