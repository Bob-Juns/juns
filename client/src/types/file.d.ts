type Image = {
  filePath: string;
  fileName: string;
};

interface _File {
  cover: Image;
  banner: Image;
}

interface UploadImage extends Action {
  payload: Promise<Image>;
}

type FileAction = UploadImage | Action;
